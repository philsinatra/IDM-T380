build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# Workflow Optimization Techniques

---

# Node.js & NPM

^ _Node.js_ is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, _npm_, is the largest ecosystem of open source libraries in the world.

---

## English Please

- an open source server framework
- free
- runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
- uses JavaScript on the server

---

## What Can It Do

- generate dynamic page content
- create, open, read, write, delete, and close files on the server
- collect form data
- add, delete, modify data in your database

---

### Example Script

```javascript
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('Hello World');
}).listen(8080);
```

```bash
$ node myfile.js
# localhost:8080
```

^ Node.js allows you to use built in modules, or create your own modules for web based application development. It runs on a server and can be interfaced with through the command line. With this example, we would save the JavaScript file, and tell Node.js to execute it with the `node` command followed by the file name.

---

## Installation

[Node.js Installation](https://nodejs.org/en/)

^ We won't be focused on full scale application development with Node.js. We will however use it to optimize our workflow on the development side. In order to begin working with Node.js, we first have to install it. There are a few different ways to install Node.js, but the best way is to grab the latest stable release from the official nodejs.org website. You want the latest stable, recommended release.

---

### What's Installed

- Node.js
- [NPM package manager](https://www.npmjs.com)

^ You will now have the Node.js runtime and NPM package manager. NPM is a package manager for Javascript, and is currently the largest source of Javascript based packages available. Most of the packages in the system are open source and easy to install and incorporate into your dev process. You can create an account and add your own packages also.

---

## How Does Node Work

^ Easier to see it than explain it. _examples/04-node/01,02,03_

---

## [NPM](https://www.npmjs.com)

^ When you install Node.js, you will also get a copy of NPM, the package manager for JavaScript. The npmjs.com website will let you browser almost seven hundred thousand packages and libraries, most of which are open source and free to use. Packages can be installed globally on your computer, or locally on a per project basis, depending on your needs. These packages and libraries can drastically speed up and improve your development workflow.

---

### Update NPM

```bash
npm install -g npm
```

^ Often, the version of NPM that comes with Node.js is a few minor releases behind the latest version of NPM. If you want to update NPM to the latest stable version, after installing Node.js, you can use NPM to update NPM. More on this in a minute.

---

### What Types of Packages Are There

- front end
- back end
- mobile
- testing
- documentation
- math
- frameworks
- and more...

---

## Global Examples

^ Let's take a look at some examples of packages that can be helpful for workflow at a global scope.

---

### Optimizing Images

- [SVG Optimizer](https://jakearchibald.github.io/svgomg/)
- [`svgo`](https://www.npmjs.com/package/svgo)
- [`jpg`, `png`](https://www.npmjs.com/package/imageoptim-cli)

^ Has anyone seen or used this website before? It's a great tool for optimizing `.svg` files. What's the problem thought?

^ _copy **examples/04-npm\_global/timeline-outlines.svg** to Desktop and run optimizer_

^ With these packages installed globally on your computer, you can optimize images regardless of what/where you are working.

---

## Project Dependencies

- [normalize.css](https://www.npmjs.com/package/normalize.css)
- [babel](https://www.npmjs.com/package/babel-cli)
- [uglify](https://www.npmjs.com/package/uglify)
- [picturefill](https://www.npmjs.com/package/picturefill)

^ Not all packages should be used at a global scope. Each project you work on will require specific tools. You can install packages per project so that you can add the functionality and automation you need, and also have the tools and scripts optimized for the specific project needs. This also allows other contributors to easily use the same workflow and tools, which makes sure you have a consistent outcome.

---

## Setup `package.json`

```bash
npm init
```

^ All of the details of your project, including package dependencies are tracked in a file named `package.json`, which is kept in the root directory of your project. You can build this document by hand, or you can use the built in utility to set the file up.

^ This will ask you a bunch of questions, and then write a package.json for you. It attempts to make reasonable guesses about what you want things to be set to, and then writes a package.json file with the options you've selected. If you already have a package.json file, it'll read that first, and default to the options in there.

---

## `package.json` Example

```json
{
  "name": "iterm2-popping-and-locking",
  "description": "iTerm2 theme based on https://github.com/hedinne/popping-and-locking-vscode",
  "homepage": "https://github.com/psbarrales/hyper-popping-and-locking#readme",
  "version": "1.0.1",
  "author": {
    "email": "code@philsinatra.com",
    "name": "Phil Sinatra",
    "url": "philsinatra.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/psbarrales/hyper-popping-and-locking.git"
  },
  "bugs": {
    "url": "https://github.com/psbarrales/hyper-popping-and-locking/issues"
  },
  "keywords": ["popping-and-locking", "iterm2", "iterm2-theme"],
  "files": ["popping-and-locking.itermcolors"],
  "license": "MIT"
}
```

---

## `package.json` Dependencies Listing

```json
"devDependencies": {
  "babel-cli": "^6.24.1",
  "babel-preset-env": "^1.6.0",
  "fs": "0.0.1-security",
  "gulp": "^3.9.1",
  "gulp-autoprefixer": "^3.1.0",
  "gulp-eslint": "^4.0.0",
  "gulp-sourcemaps": "^2.6.0",
  "gulp-strip-debug": "^1.1.0",
  "gulp-uglify": "^2.1.2",
  "normalize.css": "^7.0.0",
  "yargs": "^7.0.2"
},
"dependencies": {
  "babel-polyfill": "^6.23.0",
  "fontfaceobserver": "^2.0.13",
  "intersection-observer": "^0.4.3",
  "picturefill": "^3.0.2"
}
```

^ The `package.json` file will keep track of each package (and version) that is added to your project. This file is checked into your repository, so any collaborators can install the correct versions of the required packages to run the project.

^ The packages are listed as either _dependencies_ or _devDependecies_. _devDependencies_ are modules which are only required during development, while _dependencies_ are modules which are also required at runtime.

---

## Installing Dependencies

```bash
npm install --save <name>
npm install --save <name>@<version>

npm install --save-dev <name>
npm install --save-dev <name>@<version>
```

^ To install a package as a dependency, use the command `npm install` with a parameter `--save` followed by the package name. If the package is a _devDependency_, use the parameter `--save-dev`.

^ Examples of runtime dependencies: React, Redux, Express.

^ Examples of dev dependencies: Babel, ESLink, Mocha (framework)

---

## Where Do They Go

```bash
$ ls -l
README.md
CHANGELOG.md
build
dist
node_modules
package.json
package-lock.json
src
```

^ All installed dependencies in the local project will be added to a new folder that is created. The _node\_modules_ directory will contain all of the dependency files and required packages needed to run the packages you install in your project.

^ Let's take a look at what's inside a _node\_modules_ directory in one of my projects.

---

## `package-lock.json`

```json
"dependencies": {
"@gulp-sourcemaps/identity-map": {
  "version": "1.0.1",
  "resolved": "https://registry.npmjs.org/@gulp-sourcemaps/identity-map/-/identity-map-1.0.1.tgz",
  "integrity": "sha1-z6I7xYQPkQTOMqZedNt+epdLvuE=",
  "dev": true,
  "requires": {
    "acorn": "5.3.0",
    "css": "2.2.1",
    "normalize-path": "2.1.1",
    "source-map": "0.5.7",
    "through2": "2.0.3"
  }
},
```

^ Another file was also automatically created along with the _node\_modules_ directory. `package-lock.json` is automatically generated for any operations where npm modifies either the node_modules tree, or package.json . It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates. This is what guarantees that collaborators are going to install the required packages and correct versions when they setup our project. This file should also be checked into the repository.

---

## Local Example

^ _examples/04-node/05-npm\_local_

---

## Collaborators Assemble

```bash
npm install
```

^ What if you are a collaborator, cloning a project for the first time? You are not responsible for creating the `package.json` file, but you want to make sure you install all of the correct packages required for the project. Once you clone the project, you can run `npm install` with no arguments. NPM will read the contents of the `package.json` file, and automatically install the dependencies into your local _node\_modules_ folder.

---

## Project Structure

```bash
local_html
  css
  images
  js
  index.html
```

^ Let's take a moment to talk about your project's structure. Basic website project structure often resembles something like this, where CSS, images and scripts are organized into folders. But as our apps get more complicated, so will our project structure. We now have to manage source files, as well as output files that are generated from our Node tasks. There needs to be clear separation between the files we maintain, and those generated by an automated script.

---

## Better Project Structure

```bash
local_html
  build
     css
     js
     index.html
  node_modules
  src
     includes
     js
     pages
     scss
  package.json
  package-lock.json
  README.md
```

^ It is a good practice to totally separate source files, build files and other assets. A common practice is to include a `build` folder in your project. This folder represents all of the processed files in your project. The goal is to have the finished, optimized files built through automated processed be output to this folder. You do not edit the code of the files in this folder. The source code for everything that ends up in `build` is organized and maintained in a separate location, typically a `src` directory.

---

## Git Commit Check

- `package.json` ✅
- `package-lock.json` ✅
- `node_modules/` 🚫
- `build/` 🚫
- `dist/` 🚫

^ Before you commit your repository and all it's packages, let's do a check and confirm what belongs in your repo, and what does not.

^ _node\_modules_ does not - why?

^ Tons of files = bloat. `package.json` is going to handle syncing the correct files for us, so these files don't need to be synced in the repo.