const data = require('gulp-data');
const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', () => {
	// get .html|.njk files in 'pages'
	return gulp.src('./src/pages/**/*.+(html|njk)')
		// add data from JSON
		.pipe(data(() => {
			return require('./src/data/data.json');
		}))
		// render template with nunjucks
		.pipe(nunjucksRender({
			path: ['./src/templates']
		}))
		// output files to build folder
		.pipe(gulp.dest('build'));
});