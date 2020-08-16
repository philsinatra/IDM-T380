const path = require('path')
const { src, dest, watch } = require('gulp')
const data = require('gulp-data')
const nunjucksRender = require('gulp-nunjucks-render')

function nunjucks() {
  return src(path.join(__dirname, './src/pages/**/*.+(html|njk)'))
    .pipe(
      data(() => {
        return require(path.join(__dirname, './src/data/data.json'))
      })
    )
    .pipe(
      nunjucksRender({
        path: [path.join(__dirname, './src/templates')]
      })
    )
    .pipe(dest(path.join(__dirname, './build')))
}

function watchTask(cb) {
  watch(path.join(__dirname, './src/**/*.njk'), nunjucks)
  cb()
}

exports.watch = watchTask
exports.default = nunjucks
