# Gulp.js

## Setup project

```bash
npm init -y
npm i -D gulp
```

## Create `gulpfile.js`

```javascript
function defaultTask(cb) {
  cb()
}

exports.default = defaultTask
```

## Test it

```bash
gulp
```

A gulpfile is a file in your project directory titled gulpfile.js (or capitalized as Gulpfile.js, like Makefile), that automatically loads when you run the gulp command. Within this file, you'll often see gulp APIs, like src(), dest(), series(), or parallel() but any vanilla JavaScript or Node modules can be used. Any exported functions will be registered into gulp's task system.

Many users start by adding all logic to a gulpfile. If it ever grows too big, it can be refactored into separate files.

Each task can be split into its own file, then imported into your gulpfile for composition. Not only does this keep things organized, but it allows you to test each task independently or vary composition based on conditions.

Node's module resolution allows you to replace your gulpfile.js file with a directory named gulpfile.js that contains an index.js file which is treated as a gulpfile.js. This directory could then contain your individual modules for tasks. If you are using a transpiler, name the folder and file accordingly.

## Composing tasks

When a composed operation is run, each task will be executed every time it was referenced. For example, a clean task referenced before two different tasks would be run twice and lead to undesired results. Instead, refactor the clean task to be specified in the final composition.

```javascript
const { series, parallel } = require('gulp')

function clean(cb) {
  console.log('clean task')
  cb()
}

function css(cb) {
  console.log('css task')
  cb()
}

function javascript(cb) {
  console.log('javascript task')
  cb()
}

exports.build = series(clean, parallel(css, javascript))
```

```bash
gulp build
```

## Setup JavaScript task

```bash
mv gulpfile.js index.js
mkdir gulpfile.js
mv index.js gulpfile.js/
cd gulpfile.js
mkdir tasks
touch tasks/javascripts.js
```

- `gulpfile.js/tasks/javascripts.js`

```javascript
function scriptsTask(cb) {
  console.log('scripts task')
  cb()
}

module.exports = scriptsTask
```

- `gulpfile.js/index.js`

```javascript
const scriptsTask = require('./tasks/javascripts')

exports.scripts = scriptsTask
```

```bash
gulp --tasks
gulp scripts
```

## Expand javascripts task

Let's figure out what we want to do to our JavaScript files.

- gulp-eslint
- gulp-sourcemaps
- concat
- babel
- gulp-if
- gulp-strip-debug-arbitrary
- gulp-uglify
- yargs

```bash
npm i -D gulp-eslint gulp-sourcemaps gulp-concat gulp-babel gulp-if gulp-strip-debug-arbitrary gulp-uglify yargs @babel/core @babel/preset-env
```

```javascript
const path = require('path')
const { series, src } = require('gulp')
const eslint = require('gulp-eslint')

const dir = path.join(__dirname, '../../src/js')

function lint() {
  console.log('linting task')
  return src(`${dir}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

function scriptsTask(cb) {
  console.log('scripts task')
  cb()
}

module.exports = series(lint, scriptsTask)
```

```bash
gulp scripts
```

## Add sourcemaps, concatination & Babel

```diff
const path = require('path')
- const { series, src } = require('gulp')
+ const { dest, series, src } = require('gulp')
const eslint = require('gulp-eslint')
+ const babel = require('gulp-babel')
+ const concat = require('gulp-concat')
+ const sourcemaps = require('gulp-sourcemaps')

const dir = path.join(__dirname, '../../src/js')

function lint() {
  console.log('linting task')
  return src(`${dir}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

- function scriptsTask(cb) {
+ function scriptsTask() {
- console.log('scripts task')
+ return src(`${dir}/**/*.js`)
+ .pipe(sourcemaps.init())
+ .pipe(concat('main.js'))
+ .pipe(babel({ presets: ['@babel/env'] }))
+ .pipe(sourcemaps.write('.'))
+ .pipe(dest(path.join(__dirname, '../../build/js')))
- cb()
}

module.exports = series(lint, scriptsTask)
```

## Add production arguments

```javascript
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const stripDebug = require('gulp-strip-debug-arbitrary');
const uglify = require('gulp-uglify');
```

```diff
function scriptsTask() {
  return src([`${dir}/**/*.js`])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
+   .pipe(gulpif(argv.production, uglify()))
+   .pipe(gulpif(argv.production, stripDebug()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.join(__dirname, '../../build/js')))
}
```

## Refactor path

```diff
const dir = path.join(__dirname, '../../src/js')
+ const source = `${dir}/**/*.js`
```

```diff
function lint() {
- return src([`${dir}/**/*.js`])
+ return src(source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

function scriptsTask() {
- return src([`${dir}/**/*.js`])
+ return src(source)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
```

## Setup Styles task

- gulp-autoprefixer
- gulp-sass

```bash
npm i -D gulp-autoprefixer gulp-sass
```

```javascript
const path = require('path')
const { dest, src } = require('gulp')
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const argv = require('yargs').argv
const sourcemaps = require('gulp-sourcemaps')

const dir = path.join(__dirname, '../../src/scss')
const source = `${dir}/**/*.scss`

function styles() {
  const outputStyle = argv.production ? 'compressed' : 'nested'
  return src(source)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        grid: true
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.join(__dirname, '../../build/css')))
}

module.exports = styles
```

- [https://github.com/browserslist/browserslist#full-list](https://github.com/browserslist/browserslist#full-list)

```diff
    "gulp-uglify": "^3.0.2",
    "yargs": "^15.1.0"
  },
+ "browserslist": [
+   "defaults"
+ ]
}
```

## Add Watch task

```javascript
const path = require('path')
const { watch } = require('gulp')
const stylesTask = require('./styles')
const scriptsTask = require('./javascripts')

const dirJS = path.join(__dirname, '../../src/js')
const srcJS = `${dirJS}/**/*.js`

const dirSCSS = path.join(__dirname, '../../src/scss')
const srcSCSS = `${dirSCSS}/**/*.scss`

function watchTask(cb) {
  watch(srcJS, scriptsTask)
  watch(srcSCSS, stylesTask)
  cb()
}

module.exports = watchTask
```

```diff
const stylesTask = require('./tasks/styles')
const scriptsTask = require('./tasks/javascripts')
+ const watchTask = require('./tasks/watch')

exports.styles = stylesTask
exports.scripts = scriptsTask
+ exports.watch = watchTask
```

## Setup default task

```diff
+ const { parallel } = require('gulp')
const stylesTask = require('./tasks/styles')
const scriptsTask = require('./tasks/javascripts')
const watchTask = require('./tasks/watch')

exports.styles = stylesTask
exports.scripts = scriptsTask
exports.watch = watchTask

+ exports.default = parallel(scriptsTask, stylesTask)
```

## More tasks

What else could we do? Maybe a delete function to clear the `build` folder before building new files?

### Delete task

```bash
npm i -D del
```

```diff
const concat = require('gulp-concat')
+ const del = require('del')
const eslint = require('gulp-eslint')
```

```diff
- function scriptsTask() {
+ async function scriptsTask() {
+ await del(path.join(__dirname, '../../build/js/*.js'))
  return src(source)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.join(__dirname, '../../build/js')))
}
```
