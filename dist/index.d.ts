import grapesjs from 'grapesjs';

export declare type StorageOptions = {
	/**
	 * Local project key
	 * @default 'gjsProject'
	 */
	key?: string;
	/**
	 * Database name
	 * @default 'gjs'
	 */
	dbName?: string;
	/**
	 * Collection name
	 * @default 'projects'
	 */
	objectStoreName?: string;
};
export declare type PluginOptions = {
	/**
	 * Type id used to register the new storage.
	 * You can use this option in case you want to replace the already available storages (eg. `local`).
	 * @default 'indexeddb'
	 */
	type?: string;
	/**
	 * Default storage options
	 */
	options?: StorageOptions;
};
declare const plugin: grapesjs.Plugin<PluginOptions>;

export {
	plugin as default,
};

export {};
