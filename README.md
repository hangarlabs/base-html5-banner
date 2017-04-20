# BASE HTML5 FOR BANNERS.

## Initial set up
To prepare this project to run, you'll need to have nodejs `v5.1.0` or `up` installed in your computer.
I suggest to use [NVM](https://github.com/creationix/nvm)  in order to install node and manage diference version easily.

Install [editorconfig](http://editorconfig.org/) to keep end lines consistent between editor.

You will also need gulp to run the application, needs to be installed globally. run `npm i -g gulp`. Depending on your local configuration, you might need run this command with `sudo`.

Once you have everything installed, run `npm install` inside the project folder. This is just for the first time, and what it does is download all the packages it needs to run.

## Running the project

To run the project simple navigate to the project folder, and run `gulp`. It will compile all the assets and start a new web server in the [9000](http://localhost:9000/) port.

## Project structure
All the necessary code is inside the `_src_` folder, but for a better understanding, here's a description of each one:

```
root/
├── src/                      * Source folder
├──── 
│   ├── banner_list              * Global folder for banners
│   │  ├── 300x250/              * Folder for this specific size
│   │      ├── pug/              * The pug folder will be compiled into html
│   │      │   └── index.pug     * The index file will be our banner file, this uses a common template
│   │      │
│   │      ├── js/               * The custom javascript folder
│   │      │   └── main.js       * This file should contain all the custom logic for this specific size
│   │      │
│   │      ├── img/              * Images will be copy to the root of the specific size folder
│   │      │
│   │      └── scss/             * The custom scss folder, will be compiled into css
│   │         └── main.scss     * This file should contain all the custom styles for this specific size
│   │
│   ├── fonts/                * THe global fonts folder
│   │
│   ├── pug/                  * The global pug folder
│   │   └── layout.pug        * This file contains the layout to be used for all the banners
│   │
│   ├── styles/               * This is the global styles folder
│   │   ├── base/             * Base styles
│   │   ├── tools/            * Resets and other utils
│   │   ├── _main.scss        * This is the main global file to be imported into all the sizes
│   │   └── _variables.scss   * The variables file, with sizes, colors, etc
│   │
│   └── scripts/              * The global script folder
│   └── static/               * Backup image, there are required by vendors 
│   └── index.html            * Frontpage of banners for review or to show clients
│
├── gulp.js                   * This is the gulp configuration file, with all the paths and jobs declared
├── generate-index            * Generate list of banner and include in src/index.html
└── package.json              * What npm uses to manage it's dependencies
```

# How to include more sizes
- Stop gulp
- Copy and paste one of the existing banner that are inside of the _bannerlist_ folder.
- Change only the size from the folder name to keep name convetion

## 1-What if you need jQuery
This Boilerplate for the banners already have included a Tiny JavaScript DOM query library
called JQlite for more info visit the follow link [JQlite](https://code.google.com/archive/p/jqlite/wikis/UsingJQLite.wiki)
its included in the plugin.js file.

```
│   │   ├── js/            
│   │   │   └── main.js
│   │   │   └── plugin.js * Line 2 to line 433 

```

Note: If you want to use jquery library you must comment out those lines, will reduce the main.min.js file size an approximate to 6k.

Adding Jquery library to project:

Go to [CDN](https://cdnjs.com/libraries/jquery) and grab the link of the jquery version of you needs.
Then add it to the follow file:

```
│   ├── pug/         
│   │   └── layout.pug

```

## What if you need another library
Please find a cdn for it and include in the `_src/pug/layout.pug_` file.

## Build
`gulp distribute`

## Authors

* **Marco Solano** - *Initial work* - GitHub: [Marcotss](https://github.com/Marcotss) - Email: [marcos@thehangar.cr]

For any questions regarding this repository please contact above authors.