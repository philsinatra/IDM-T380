# NPM Local Project Example

## Create JavaScript File

```javascript
// src/main.js
function add(first, second) {
  return first + second;
}

var myNumber = add(2, 3);
console.log(myNumber);

var myImage = document.querySelector('img');

myImage.onclick = function() {
  var mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/firefox-icon.png') {
    myImage.setAttribute('src', 'images/firefox2.png');
  } else {
    myImage.setAttribute('src', 'images/firefox-icon.png');
  }
};

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.innerHTML = 'Mozilla is cool, ' + myName;
}

if (!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Mozilla is cool, ' + storedName;
}

myButton.onclick = function() {
  setUserName();
};
```

## NPM Initialize

```bash
05-npm_local $ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (05-npm_local)
version: (1.0.0)
description: Testing NPM Local Project
entry point: (index.js)
test command:
git repository:
keywords:
author: Phil Sinatra
license: (ISC)
About to write to ./05-npm_local/package.json:

{
  "name": "05-npm_local",
  "version": "1.0.0",
  "description": "Testing NPM Local Project",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Phil Sinatra",
  "license": "ISC"
}

Is this OK? (yes)
```

## Install Uglify Package

```bash
05-npm_local $ npm install --save-dev uglify-js
```

## Build `index.js`

```javascript
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
```

## Run and Compare

```bash
node index.js

fs src/
fs build/
```