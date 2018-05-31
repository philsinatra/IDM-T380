{
  const UglifyJS = require('uglify-js');
  const fs = require('fs');
  const src = 'src/main.js';
  const code = fs.readFileSync(src, 'utf8');

  const result = UglifyJS.minify(code);
  if (result.error) console.log(result.error);
  console.log(result.code);

  const buildDir = './build';
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  fs.writeFile(`${buildDir}/main.min.js`, result.code, 'utf8', err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File created and updated');
  });
}
