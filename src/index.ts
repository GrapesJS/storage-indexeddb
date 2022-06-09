import type grapesjs from 'grapesjs';

export type StorageOptions = {
  /**
   * Local project key
   * @default 'gjsProject'
   */
  key?: string,

  /**
   * Database name
   * @default 'gjs'
   */
  dbName?: string,

  /**
   * Collection name
   * @default 'projects'
   */
  objectStoreName?: string,
};

export type PluginOptions = {
  /**
   * Type id used to register the new storage.
   * You can use this option in case you want to replace the already available storages (eg. `local`).
   * @default 'indexeddb'
   */
  type?: string,

  /**
   * Default storage options
   */
  options?: StorageOptions,
};

type ProjectData = grapesjs.ProjectData;

const plugin: grapesjs.Plugin<PluginOptions> = (editor, opts = {}) => {
  const storageOptions: StorageOptions = {
    key: 'gjsProject',
    dbName: 'gjs',
    objectStoreName: 'projects',
    ...opts.options,
  };

  const options: PluginOptions = {
    type: 'indexeddb',
    ...opts,
    options: storageOptions,
  };

  let db: IDBDatabase;
  const sm = editor.Storage;
  const storageName = options.type!;
  sm.getConfig().options![storageName] = storageOptions;

  /**
   * Get the IDBDatabase instance
   */
  const getAsyncDb = (opts: StorageOptions) => new Promise<IDBDatabase>((resolve, reject) => {
    if (db) {
      resolve(db);
    } else {
      const request = window.indexedDB.open(opts.dbName!, 1);
      request.onerror = reject;
      request.onsuccess = () => {
        db = request.result;
        db.onerror = reject;
        resolve(db);
      };
      request.onupgradeneeded = e => {
        request.result.createObjectStore(opts.objectStoreName!);
      };
    }
  });

  /**
   * Get the IDBObjectStore instance
   */
  const getObjectStore = (storeName: string): IDBObjectStore => {
    return db.transaction([storeName], 'readwrite').objectStore(storeName);
  };

  const getAsyncObjectStore = async (opts: StorageOptions) => {
    const name = opts.objectStoreName!;
    if (db) {
      return getObjectStore(name);
    } else {
      await getAsyncDb(opts);
      return getObjectStore(name);
    }
  };

  /**
   * Load the ProjectData
   */
  const getData = (objs: IDBObjectStore, opts: StorageOptions) => {
    return new Promise<ProjectData>((resolve, reject) => {
      const request = objs.get(opts.key!);
      request.onerror = reject;
      request.onsuccess = () => {
        resolve(request.result || {});
      };
    });
  }

  /**
   * Store the ProjectData
   */
  const putData = (objs: IDBObjectStore, data: ProjectData, opts: StorageOptions) => {
    return new Promise<ProjectData>((resolve, reject) => {
      const request = objs.put(data, opts.key!);
      request.onerror = reject;
      request.onsuccess = () => resolve(data);
    });
  }

  sm.add<StorageOptions>(storageName, {
    async load(opts) {
      const objs = await getAsyncObjectStore(opts);
      return await getData(objs, opts);
    },

    async store(data, opts) {
      const objs = await getAsyncObjectStore(opts);
      return await putData(objs, data, opts);
    },
  });
};

export default plugin;
