# 05 Build Systems

## Initialize NPM Project

```javascript
$ npm init

package name: (05-build_systems)
version: (1.0.0) 0.0.1
description: Gulp based build systems example
entry point: (index.js) gulpfile.js
test command:
git repository:
keywords:
author: Phil Sinatra
license: (ISC)
```

## General Dev Dependencies

```bash
npm install --save-dev gulp
npm install --save-dev del
```

## JavaScript Tasks

- check for syntax errors
- concatenate multiple files into one single file
- Babel ES6
- minify the single file
- remove comments, alerts, logs etc.

```bash
npm install --save-dev gulp-eslint
```

### JavaScript Lint

There are many linting options available. We'll be using ESLint, which requires a configuration file that tells the linter what rules to follow.

```javascript
const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
```

### JavaScript Concatenation

```bash
npm install --save-dev gulp-concat
```

```javascript
const concat = require('gulp-concat');

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js/'));
});
```

Files will be concatenated in the order they are specified in the `gulp.src` function.

```javascript
gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js/'));
});
```

### Babel ES6

```bash
npm install --save-dev gulp-babel
npm install --save-dev babel-core
npm install --save-dev babel-preset-env
```

```javascript
const babel = require('gulp-babel');

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(gulp.dest('./build/js/'));
});
```

### JavaScript Uglify

```bash
npm install --save-dev gulp-uglify
```

```javascript
var uglify = require('gulp-uglify');

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});
```

### JavaScript Strip Debug Commands

```bash
npm install --save-dev gulp-strip-debug
```

```javascript
const stripDebug = require('gulp-strip-debug');

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(gulp.dest('./build/js/'));
});
```

#### Strip Debug Problem

Looks like there's some type of bug or issue that needs to be worked out with using this package in conjunction with ESLint.

We have two options - debug the issue or find a different package.

```bash
npm install --save-dev berstend/gulp-strip-debug-arbitrary
npm uninstall gulp-strip-debug
```

```javascript
const stripDebug = require('gulp-strip-debug-arbitrary');
```

## Gulp If

We don't always want to minify the code, or remove all of the logs and alerts. What if we could specify different types of output, let's say for development vs production?

```bash
npm install --save-dev gulp-if
```

```javascript
const gulpif = require('gulp-if');

let production = false;

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(gulpif(production, uglify()))
    .pipe(gulpif(production, stripDebug()))
    .pipe(gulp.dest('./build/js/'));
});
```

That's great, but we don't have to want to change the `production` flag in our `gulpfile` each time we want a different build.

```bash
npm install --save-dev yargs
```

```javascript
const argv = require('yargs').argv;

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(gulp.dest('./build/js/'));
});
```

```bash
gulp scripts
gulp scripts --production
```

### Sourcemaps

Let's look at our code in a browser.

```bash
npm install --save-dev gulp-sourcemaps
```

```javascript
const sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js/'));
});
```

## Handling Errors

```bash
npm install --save-dev gutil
npm install --save-dev gulp-plumber
```

```javascript
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');

const onError = function(err) {
  gutil.beep();
  console.log(err);
};

gulp.task('scripts', ['lint'], () => {
  return gulp
    .src(['./src/js/lib.js', './src/js/storage.js', './src/js/main.js'])
    .pipe(
      plumber({
        errorHandler: onError
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js/'));
});
```

## Cleaning Files

```bash
npm install --save-dev del
```

```javascript
const del = require('del');

del(['./build/js/*.js']);

del(['./build/js/*.+(js|map)']);
```

## Default Task

```javascript
gulp.task('default', ['scripts']);
```

```bash
gulp
```

## Watch Task

```javascript
gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.js', ['scripts']);
});
```

```bash
gulp watch
gulp watch --production
```

## Styles

Let's look at our CSS now, which we're writing using SCSS.

### Compile SCSS

```bash
npm install --save-dev gulp-sass
```

```javascript
const sass = require('gulp-sass');

gulp.task('scss', () => {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});
```

### Vendor Prefix CSS

```bash
npm install --save-dev gulp-autoprefixer
```

```javascript
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', () => {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        grid: true
      })
    .pipe(gulp.dest('./build/css'));
});

```

### Minify CSS

```javascript
gulp.task('scss', () => {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./build/css'));
});
```

### Minify CSS - Production Build Only

```javascript
gulp.task('scss', () => {
  let myOutputStyle = 'nested';
  if (argv.production) myOutputStyle = 'compressed';

  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: myOutputStyle
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./build/css'));
});
```

### Clean CSS Files

```javascript
del(['./build/css/*.+(css|map)']);
```

## Update Default Task

```javascript
gulp.task('default', ['scripts', 'scss']);
```

## Update Watch Task

```javascript
gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
});
```