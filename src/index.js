import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-indexeddb', (editor, opts = {}) => {
  const options = { ...{
    // Database name
    dbName: 'gjs',

    // Collection name
    objectStoreName: 'templates',

  },  ...opts };

  let db;
  const sm = editor.StorageManager;
  const storageName = 'indexeddb';
  const objsName = options.objectStoreName;

  const getId = () => sm.getConfig().id || 'gjs';

  // Functions for DB retrieving
  const getDb = () => db;
  const getAsyncDb = (clb) => {
    if (db)  {
      clb(db);
    } else {
      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      const request = indexedDB.open(options.dbName, 1);
      request.onerror = () => sm.onError(storageName, request.errorCode);
      request.onsuccess = () => {
        db = request.result;
        db.onerror = () => sm.onError(storageName, request.errorCode);
        clb(db);
      };
      request.onupgradeneeded = e => {
        e.currentTarget.result.createObjectStore(objsName, { keyPath: 'id' });
      };
    }
  };

  // Functions for object store retrieving
  const getObjectStore = () => {
    return db.transaction([objsName], 'readwrite').objectStore(objsName);
  };
  const getAsyncObjectStore = clb => {
    if (db) {
      clb(getObjectStore());
    } else {
      getAsyncDb(db => clb(getObjectStore()))
    }
  };

  // Add custom storage to the editor
  sm.add(storageName, {
    getDb,

    getObjectStore,

    load(keys, clb, clbErr) {
      getAsyncObjectStore(objs => {
        const request = objs.get(getId());
        request.onerror = clbErr;
        request.onsuccess = () => {
          const { id, ...data } = request.result || {};
          clb(data);
        };
      });
    },

    store(data, clb, clbErr) {
      getAsyncObjectStore(objs => {
        const request = objs.put({ id: getId(), ...data });
        request.onerror = clbErr;
        request.onsuccess = clb;
      });
    },
  });
});
