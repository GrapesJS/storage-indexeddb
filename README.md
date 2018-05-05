# GrapesJS IndexedDB

IndexedDB storage wrapper for GrapesJS

### Usage
1. Update README
1. When you're ready update the production file `npm run build`
1. Publish




## Summary

* Plugin name: `grapesjs-indexeddb`
* Storage
  * `indexeddb`





## Options

|Option|Description|Default|
|-|-|-
| `dbName` | DB name | `gjs` |
| `objectStoreName` | Collection name | `templates` |





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
      storageManager: {
        type: 'indexeddb',
        // In case of multiple editors on the same page indicate an id to
        // prevent collisions
        id: 'some-id',
      },
      plugins: ['grapesjs-indexeddb'],
      pluginsOpts: {
        'grapesjs-indexeddb': {
          // options
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

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
