# Webpack Advanced Configuration

## More than one HTML page

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

### HTML Webpack Plugin

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

## CleanWebPackPlugin

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

## Development Build

Before our configuration gets much bigger, lets consider splitting it up. Often times we will use different options, configurations and tools depending on if we're in development or if we're producing a production build. You've no doubt noticed teh warning message we get every time we run our build task:

> WARNING in configuration. The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

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

## Production Build

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

### JS Conversion

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

```bash
npm i -D terser-webpack-plugin
```

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

## Webpack Dev Server

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
