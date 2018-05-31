const autoprefixer = require('gulp-autoprefixer');
const argv = require('yargs').argv;
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

const onError = function(err) {
  gutil.beep();
  console.log(err);
};

gulp.task('lint', () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('scripts', ['lint'], () => {
  del(['./build/js/*.+(js|map)']);

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

gulp.task('scss', () => {
  del(['./build/css/*.+(css|map)']);

  let myOutputStyle = 'nested';
  if (argv.production) myOutputStyle = 'compressed';

  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: myOutputStyle
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        grid: true
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ['scripts', 'scss']);

gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
});
