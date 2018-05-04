import grapesjs from 'grapesjs';

export default grapesjs.plugins.add('grapesjs-indexeddb', (editor, opts = {}) => {
  const options = { ...{
    dbName: 'gjs',

    objectStoreName: 'templates',
    // default options
  },  ...opts };

  const sm = editor.StorageManager;
  const id = 'tgjs';
  const storageName = 'indexeddb';
  const objsName = options.objectStoreName;

  // Init indexedDB
  let db;
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  const request = indexedDB.open(options.dbName, 1);
  request.onerror = () => sm.onError(storageName, request.errorCode);
  request.onsuccess = () => {
    db = request.result;
    db.onerror = () => sm.onError(storageName, request.errorCode);
  };
  request.onupgradeneeded = e => {
    e.currentTarget.result.createObjectStore(objsName, { keyPath: 'id' });
  };

  const getDb = () => db;
  const getObjectStore = () => {
    return db.transaction([objsName], 'readwrite').objectStore(objsName);
  }

  sm.add(storageName, {
    getDb,

    getObjectStore,

    load(keys, clb, clbErr) {
      const request = getObjectStore().get(id);
      request.onerror = clbErr;
      request.onsuccess = () => {
        const { id, ...data } = request.result || {};
        clb(data);
      };
    },

    store(data, clb, clbErr) {
      const request = getObjectStore().put({ id, ...data });
      request.onerror = clbErr;
      request.onsuccess = clb;
    },
  });
});
