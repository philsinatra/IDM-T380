const fs = require('fs');
const UglifyJS = require('uglify-js');

const src = 'src/main.js';
const fn = 'main.min.js';
const code = fs.readFileSync(src, 'utf8');
const result = UglifyJS.minify(code);

if (result.error) {
	console.log(result.error);
} else {
	console.log('');
	console.log('Result Code:');
	console.log(result.code);
	console.log('');
	console.log('Generating file...');
	const build = './build';
	if (!fs.existsSync(build)) {
		fs.mkdirSync(build);
	}

	fs.writeFile(`${build}/${fn}`, result.code, 'utf8', err => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`Minified file ${build}/${fn} [built]`);
		console.log('');
	});
}