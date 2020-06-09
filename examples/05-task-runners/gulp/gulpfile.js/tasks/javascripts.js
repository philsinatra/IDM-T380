const path = require('path')
const argv = require('yargs').argv
const { dest, series, src } = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const del = require('del')
const eslint = require('gulp-eslint')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const stripDebug = require('gulp-strip-debug-arbitrary')
const uglify = require('gulp-uglify')

const dir = path.join(__dirname, '../../src/js')
const source = `${dir}/**/*.js`

function lint() {
  return src(source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

async function scriptsTask() {
  await del(path.join(__dirname, '../../build/js/*.js'))
  return src(source)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.join(__dirname, '../../build/js')))
}

module.exports = series(lint, scriptsTask)
