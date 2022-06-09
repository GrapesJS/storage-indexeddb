# GrapesJS IndexedDB

IndexedDB storage wrapper for GrapesJS

> Requires GrapesJS v0.19.* or higher



## Summary

* Plugin name: `grapesjs-indexeddb`
* Storage
  * `indexeddb`





## Options

|Option|Description|Default|
|-|-|-
| `type` | Type id used to register the new storage. You can use this option in case you want to replace the already available storages (eg. `local`). | `indexeddb` |
| `options` | Default storage options. | `{ key: 'gjsProject', dbName: 'gjs', objectStoreName: 'projects' }` |





## Download

* CDN
  * `https://unpkg.com/grapesjs-indexeddb`
* NPM
  * `npm i grapesjs-indexeddb`
* GIT
  * `git clone https://github.com/artf/grapesjs-indexeddb.git`





## Usage

```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-indexeddb.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      storageManager: { type: 'indexeddb' },
      plugins: ['grapesjs-indexeddb'],
      pluginsOpts: {
        'grapesjs-indexeddb': {
          options: {
            // In case of multiple projects on the same page indicate an id to
            // prevent collisions
            key: 'user-project-id',
            // Update IndexedDB name for the DB and the table containing project data
            dbName: 'editorLocalData',
            objectStoreName: 'projects',
          }
        }
      }
  });
</script>
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-indexeddb.git
$ cd grapesjs-indexeddb
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
