build-lists: true
footer: IDM T380: Workflow Optimization Techniques
slidenumbers: true
autoscale: true
theme: Work, 1

> Bundlers

^ A JavaScript bundler is a tool that puts your code and all its dependencies together in one JavaScript file. Why do we need that? Well, the underlying problem is handling dependencies in frontend code. Historically JavaScript hasn’t had a standard for requiring dependencies from your code. There was no `import` or `require` statements.

---

## JavaScript Imports & Exports

```html
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script>
// `$` global variable available here
</script>
```

^ How do you import and export things in JavaScript? How do you make functions of your code visible to the outer world and how do you import functions from other people’s code? The only way has always been through global variables. For example if you want to use jQuery:

---

### Lots of Files

```html
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="/js/foo.js"></script>
<script src="/js/bar.js"></script>
<script src="/js/foobar.js"></script>
<script>
// Here goes some code
</script>
```

^ And what if you want to split your own code in comprehensive small files? You will end up with something like this.

^ Now in the script tag you can use all those dependencies. But what if foo.js depends on bar.js? You must change the order of the scripts. Hmm this is becoming a mess:

---

### Drawbacks to the Approach

- You are using global variables, which is something we should avoid as much as possible.
- You need to be careful with the order in which you put the script tags.
- This will become harder and harder to maintain with more complex dependencies.

---

```html
<script>
const $ = require('jquery')
const foo = require('./js/foo')
const bar = require('./js/bar')
const foobar = require('./js/foobar')
</script>
```

### Modules Systems

^ How is this problem solved in other environments? Node.js implements its own modules system implementing a `require()` function and an `exports` object among other things based on this Commonjs modules spec. That’s why you will see this mechanism often referred as “commonjs”.

^ What if we could do this in frontend code?

^ This would be great... except, there’s a technical limitation: `require()` is synchronous so if we need to require a file that hasn’t been loaded in some way we need to do an HTTP request, but that is asynchronous. So the solution is putting all the dependencies in one file to have all the code in memory, ready to be used when invoking the `require()` function that the JavaScript bundler will implement some way.

---

### A Bundled File

```javascript
// common code for implementing require()/exports
var dependencies = {} // loaded modules
var modules = {} // code of your dependencies
// require function
var require = function (module) {
 if (!dependencies[module]) {
   // module not loaded, let’s load it
   var exports = {}
   modules[module](exports)
   // now in `exports` we have the things made “public”
   dependencies[module] = exports
 }
 return dependencies[module]
}
// dependendencies
modules['jquery'] = function (exports) {
  // code of jquery
}
modules['foo'] = function (exports) {
  // code of bar.js
  exports.helloWorld = function () {
    console.log('hello world')
  }
}
modules['bar'] = function (exports) {
  // code of bar.js
}
// etc…
// here goes the code of your "entry file".
// Which is the entry point of your code
// For example:
var $ = require('jquery')
var foo = require('foo')
var bar = require('bar')
foo.helloWorld()
```

^ There are a bunch of implementation details not covered here but that’s the main idea.

---

### Interesting Benefits

- can use NPM
- cross platform code
- different transforms (ES6, ES5 etc)
- cleaner files

^ We can use the npm because require()/exports are implemented the same way than in Node.js so they look up in the “node_modules” directory for your dependencies. This way you have a strenght of npm’s versioning features and you can easily install and publish new libraries.

^ You can write cross-platform code since require() behaves the same as in Node.js. So as long as you don’t depend on specific functionality from the browser or the Node.js core modules. If that’s the case you can also detect easily in which platform your code is running and do different things in each case. For example you can use AJAX if typeof window !== ‘undefined’ and use the http core module if you are in Node.js.

^ These tools optionally allow you to use different transforms during the bundling process. So you can transpile your code from ES6 to ES5, etc.

^ Also some bundlers remove unused code so the final file contains only the code your application needs to run.

---

## Popular Node.js Bundlers

- [Webpack](https://webpack.js.org)
- [Browserify](http://browserify.org)
- [Rollup](https://rollupjs.org/guide/en/)
- [Parcel](https://parceljs.org)
- [FuseBox](https://fuse-box.org)

^ There are two extremes when it comes to bundlers.

^ 1. Bundlers that try to do as much as possible within the core (e.g., Parcel, FuseBox)

^ 2. Bundlers that rely on plugins to fill the different phases with live (e.g., Webpack, Rollup)

^ Within the two extremes, there are, of course, more variations. As an example, while FuseBox already comes with all plugins available from the core their dependencies must still be installed when required. As such it tries to find a good way between installing a lot of (potentially unnecessary) packages out of box and providing coherent user experience.

---

![fit](images/06-bundlers/webpack-splash.png)

^ Webpack is a static module bundler for JavaScript applications — it takes all the code from your application and makes it usable in a web browser. ... When Webpack processes your application, it builds a dependency graph which maps out the modules that your project needs and generates one or more bundles.

---

## Webpack

- [Getting Started](https://webpack.js.org/guides/getting-started/)

^ Webpack can work out of the box with no custom configurations. Let's try a basic demo test.

---

### Webpack Configuration

^ Most projects will need a more complex setup, which is why webpack supports a configruation file. This is much more efficient than having to manually type a lot of commands in the terminal.

---

#### VSCode Tasks Configuration

^ Let's take a short detour and configure a VSCode task to run this build script for us.

^ Command Pallette -> Tasks: Configure Tasks

^ `ctrl` + `h`

---

### Asset Management

^ Let's keep going with the documentation and try loading a CSS file into our bundle.

---

## Advanced Configurations

^ The documentation on the Webpack website is great - if you're building their exact example. As soon as you want to build something more custom, you'll find that the documentation is not a helpful as you'd like. The following configuration concepts come from many (many) hours of research and testing.

---

## Notes

- Slides 1-7 , content by Alberto Gimeno [How JavaScript bundlers work](https://tinyurl.com/yxoy8hjx)
- Slide 8, content by Florian Rappl [Choosing the Right JavaScript Bundler in 2020](https://tinyurl.com/y8uqrebc)
