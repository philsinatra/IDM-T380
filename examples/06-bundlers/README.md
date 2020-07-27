# Webpack

## Webpack Basic Setup

First let's create a directory, initialize npm, install webpack locally, and install the webpack-cli (the tool used to run webpack on the command line):

```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

Now we'll create the following directory structure, files and their contents:

```diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

`src/index.js`

```javascript
function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

`index.html`

```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

We also need to adjust our package.json file in order to make sure we mark our package as private, as well as removing the main entry. This is to prevent an accidental publish of your code.

`package.json`

```diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  }
```

In this example, there are implicit dependencies between the `script` tags. Our index.js file depends on lodash being included in the page before it runs. This is because index.js never explicitly declared a need for lodash; it just assumes that the global variable _ exists.

There are problems with managing JavaScript projects this way:

* It is not immediately apparent that the script depends on an external library.
* If a dependency is missing, or included in the wrong order, the application will not function properly.
* If a dependency is included but not used, the browser will be forced to download unnecessary code.

Let's use webpack to manage these scripts instead.

### Creating a Bundle

First we'll tweak our directory structure slightly, separating the "source" code (/src) from our "distribution" code (/dist). The "source" code is the code that we'll write and edit. The "distribution" code is the minimized and optimized output of our build process that will eventually be loaded in the browser. Tweak the directory structure as follows:

```diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

To bundle the lodash dependency with index.js, we'll need to install the library locally:

```bash
npm install --save lodash
```

Now, lets import lodash in our script:

`src/index.js`

```diff
+ import _ from 'lodash';
+
  function component() {
    const element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
+   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

Now, since we'll be bundling our scripts, we have to update our index.html file. Let's remove the lodash `script`, as we now import it, and modify the other `script` tag to load the bundle, instead of the raw /src file:

`dist/index.html`

```diff
  <!doctype html>
  <html>
   <head>
     <title>Getting Started</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
  </html>
```

In this setup, index.js explicitly requires lodash to be present, and binds it as _ (no global scope pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order.

With that said, let's run npx webpack, which will take our script at src/index.js as the entry point, and will generate dist/main.js as the output. The npx command, which ships with Node 8.2/npm 5.2.0 or higher, runs the webpack binary (./node_modules/.bin/webpack) of the webpack package we installed in the beginning:

```bash
npx webpack
```

Open index.html from the dist directory in your browser and, if everything went right, you should see the following text: 'Hello webpack'.

### Modules

The [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) statements have been standardized in ES2015. They are supported in most of the browsers at this moment, however there are some browsers that don't recognize the new syntax. But don't worry, webpack does support them out of the box.

Behind the scenes, webpack actually "transpiles" the code so that older browsers can also run it. If you inspect dist/main.js, you might be able to see how webpack does this, it's quite ingenious! Besides import and export, webpack supports various other module syntaxes as well, see Module API for more information.

Note that webpack will not alter any code other than import and export statements. If you are using other ES2015 features, make sure to use a transpiler such as Babel or Bublé via webpack's loader system.

### Using A Config

As of version 4, webpack doesn't require any configuration, but most projects will need a more complex setup, which is why webpack supports a configuration file. This is much more efficient than having to manually type in a lot of commands in the terminal, so let's create one:

```diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Now, let's run the build again but instead using our new configuration file:

```bash
npx webpack --config webpack.config.js
```

### NPM Scripts

Given it's not particularly fun to run a local copy of webpack from the CLI, we can set up a little shortcut. Let's adjust our package.json by adding an npm script:

`package.json`

```diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "scripts": {
-      "test": "echo \"Error: no test specified\" && exit 1"
+      "test": "echo \"Error: no test specified\" && exit 1",
+      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {
      "lodash": "^4.17.5"
    }
  }
```

Now the npm run build command can be used in place of the npx command we used earlier. Note that within scripts we can reference locally installed npm packages by name the same way we did with npx. This convention is the standard in most npm-based projects because it allows all contributors to use the same set of common scripts (each with flags like --config if necessary).

```bash
npm run build
```

## Asset Management

One of the coolest webpack features is that you can also include any other type of file, besides JavaScript, for which there is a loader. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app. Let's start with CSS, as you may already be familiar with that setup.

### Setup

`dist/index.html`

```diff
  <!doctype html>
  <html>
    <head>
-    <title>Getting Started</title>
+    <title>Asset Management</title>
    </head>
    <body>
-     <script src="main.js"></script>
+     <script src="bundle.js"></script>
    </body>
  </html>
```

`webpack.config.js`

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
-     filename: 'main.js',
+     filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

### Loading CSS

In order to import a CSS file from within a JavaScript module, you need to install and add the style-loader and css-loader to your module configuration:

```bash
npm install --save-dev style-loader css-loader
```

`webpack.config.js`

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader',
+         ],
+       },
+     ],
+   },
  };
```

This enables you to import './style.css' into the file that depends on that styling. Now, when that module is run, a `style` tag with the stringified css will be inserted into the `head` of your html file.

Let's try it out by adding a new style.css file to our project and import it in our index.js:

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

`src/style.css`

```css
.hello {
  color: red;
}
```

`src/index.js`

```diff
  import _ from 'lodash';
+ import './style.css';

  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```

Now run the build command:

```bash
npm run build
```

Open up index.html in your browser again and you should see that Hello webpack is now styled in red. To see what webpack did, inspect the page (don't view the page source, as it won't show you the result, because the `style` tag is dynamically created by JavaScript) and look at the page's head tags. It should contain the style block that we imported in `index.js`.

---

## Webpack Advanced Configuration

### More than one HTML page

By default webpack is configured to create a single bundle that can be used for a single page web application. I found in many cases I wanted to use Webpack to bundle my project assets, but I was building a multi-page application, where each HTML page requires a unique bundle. The default, single bundle setup is insufficient. This is where plugins can help.

By updating the configuration file, you're able to specify multiple entry points for your application. Combine that with a powerful plugin used to generate multiple HTML output files and you have a multipage export solution.

```diff
// webpack.config.js
const path = require('path');

module.exports = {
- entry: './src/index.js',
+ entry: {
+   index: ['./src/index.js'],
+   contact: ['./src/contact.js']
+ },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

```diff
// ./src/contact.js
import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

- element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+ element.innerHTML = _.join(['Hello', 'contact me page'], ' ');

  return element;
}

document.body.appendChild(component());
```

If we run our build task at this point we should expect an error:

> ERROR in chunk index [entry]
> main.js
> Conflict: Multiple chunks emit assets to the same filename main.js (chunks 0 and 1)

We need to adjust our output to allow for multiple files:

```diff
// webpack.config.js

output: {
- filename: 'main.js',
+ filename: 'assets/js/[name].[hash].js',
  path: path.resolve(__dirname, 'dist')
},
```

Now when we run our build task we should get a new directory with two files. Let discuss the _hash_ being added to each.

#### HTML Webpack Plugin

Next, to deal with having multiple HTML pages, we'll use the `HtmlWebpackPlugin`.

```bash
npm i -D html-webpack-plugin
```

```diff
// webpack.config.js
const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin')
```

```diff
// webpack.config.js
module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
+ plugins: [
+   new HtmlWebpackPlugin({
+     chunks: ['contact'], // which entry point to use
+     filename: 'screens/contact.html', // where/what to output
+     template: path.join(__dirname, 'src/screens', 'contact.html') // source file
+   }),
+   new HtmlWebpackPlugin({
+     chunks: ['index'],
+     filename: 'screens/index.html',
+     template: path.join(__dirname, 'src/screens', 'index.html')
+   })
+ ]
```

```bash
mv dist/index.html src/screens/
```

```diff
<!-- src/screens/index.html -->
- <script src="main.js"></script>
```

Let's run our build task.

### CleanWebPackPlugin

As we're building I'm noticiing a build up of previous versions of our bundled files. Since each build produces a new file with a new hash, we no longer need the older versions of our bundles. Let's add a plugin to our configuration to help with cleaning up.

```bash
npm i -D clean-webpack-plugin
```

```diff
// webpack.config.js
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin')
...
plugins: [
+ new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
```

Now when we run the build task, the old/unused files are removed from our `dist` directory. Also note how now our source files are separate from those that will be distributed.

### Development Build

Before our configuration gets much bigger, lets consider splitting it up. Often times we will use different options, configurations and tools depending on if we're in development or if we're producing a production build. You've no doubt noticed teh warning message we get every time we run our build task:

> WARNING in configuration. The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior. Learn more: [https://webpack.js.org/configuration/mode/](https://webpack.js.org/configuration/mode/)

I like to separate my configurations for development and production into unique files, so it's clear which plugins and tasks are executing for each case.

```bash
touch webpack-dev.js webpack-prod.js
```

The goal is to take our basic configuration that applies in both a dev and production environment, and merge that with specific dev/production configs that can run independently of each other. To do this we'll use a plugin `webpack-merge`.

```bash
npm i -D webpack-merge
```

```javascript
// webpack-dev.js
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.config')

module.exports = merge(common, {
  // development configuration
});
```

Let's keep it simple. When we're in development mode, we want source maps to be generated with our JavaScript files to make debugging easier.

```javascript
module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
```

In order to use this configuration, we need to run the webpack utility with this configuration file noted. The easiest way is to update our `package.json` file to include a new script that notes our dev configuration. Then we can make another VSCode task if we choose to.

```diff
# package.json
"scripts": {
  "build": "webpack",
+ "dev": "webpack --config webpack-dev.js --mode development"
},
```

### Production Build

What about our production build? Let's start with the same basic configuration.

```javascript
// webpack-prod.js
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
```

#### JS Conversion

One common task is to convert modern JavaScript into a format that older browsers can understand. Many of the newer ES6 and ES7 modules and syntax options don't work on older browsers. We can use one of many tools to ocnvert our modern code into the older syntax that older browsers can use. This lets us build using modern syntax and still support older browsers.

```diff
// index.js
- import _ from 'lodash';
import './style.css';

- function component() {
- const element = document.createElement('div');
- element.innerHTML = _.join(['Hello', 'webpack'], ' ');
- return element;
- }

- document.body.appendChild(component());

+ const myArray = ['one', 'two', 'three'];
+ const dupArray = [...myArray];
+ console.log('dupArray:', dupArray);
```

Install the terser plugin

```bash
npm i -D terser-webpack-plugin
```

`/webpack-prod.js`

```diff
+ const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
+ optimization: {
+   minimize: true,
+   minimizer: [
+     new TerserPlugin({
+       extractComments: false,
+       test: /\.js(\?.*)?$/i,
+       terserOptions: {
+         compress: {
+           drop_console: true
+         },
+         safari10: true,
+         ie11: true
+       }
+     })
+   ]
+ },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
```

```diff
# package.json
"scripts": {
  "build": "webpack",
  "dev": "webpack --config webpack-dev.js --mode development",
+ "prod": "webpack --config webpack-prod.js --mode production"
},
```

### Webpack Dev Server

It is useful to run your development build from a dev server on your local network so you can test your build on various devices, as well as load content asynchonously and perfom additional tasks that require a web server.

```bash
npm i -D webpack-dev-server
```

```diff
// webpack.config.js
module.exports = {
+ devServer: {
+   contentBase: path.join(__dirname, 'dist'),
+   hot: true,
+   open: 'Safari Technology Preview'
+ },
  entry: {
    index: ['./src/index.js'],
    contact: ['./src/contact.js']
  },
```

```diff
# package.json
"scripts": {
  "build": "webpack",
  "dev": "webpack --config webpack-dev.js --mode development",
  "prod": "webpack --config webpack-prod.js --mode production",
+ "start": "webpack-dev-server --host 0.0.0.0 --config webpack-dev.js --mode development"
},
```
