const argv = require('yargs').argv
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const gutil = require('gulp-util')
const nunjucksRender = require('gulp-nunjucks-render')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const stripDebug = require('gulp-strip-debug-arbitrary')
const stylus = require('gulp-stylus')
const uglify = require('gulp-uglify')

const onError = function(err) {
  gutil.beep()
  console.log(err)
}

gulp.task('nunjucks', () => {
  return gulp
    .src('./src/pages/**/*.+(html|njk)')
    .pipe(
      nunjucksRender({
        path: ['./src/templates']
      })
    )
    .pipe(gulp.dest('build'))
})

gulp.task('lint', () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('scripts', ['lint'], () => {
  del(['./build/js/*.+(js|map)'])

  return gulp
    .src(['./src/**/*.js'])
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
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('stylus', () => {
  del(['./build/css/*'])

  return gulp
    .src('./src/stylus/screen.styl')
    .pipe(sourcemaps.init())
    .pipe(
      stylus({
        compress: argv.production ? true : false
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('watch', () => {
  gulp.watch(['./src/pages/**/*.njk', './src/templates/**/*.njk'], ['nunjucks'])
  gulp.watch('./src/js/**/*.js', ['scripts'])
  gulp.watch('./src/stylus/**/*.styl', ['stylus'])
})

gulp.task('default', ['nunjucks', 'scripts', 'stylus'])
