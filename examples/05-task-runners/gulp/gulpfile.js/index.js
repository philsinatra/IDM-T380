const { parallel } = require('gulp')
const stylesTask = require('./tasks/styles')
const scriptsTask = require('./tasks/javascripts')
const watchTask = require('./tasks/watch')

exports.styles = stylesTask
exports.scripts = scriptsTask
exports.watch = watchTask

exports.default = parallel(scriptsTask, stylesTask)
