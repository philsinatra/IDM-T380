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
