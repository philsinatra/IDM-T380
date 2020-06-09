const path = require('path')
const argv = require('yargs').argv
const { dest, src } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
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
