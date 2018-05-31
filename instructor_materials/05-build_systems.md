build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# Workflow Optimization Techniques

^ Last time, we took a look at Node.js and the NPM package manager. We saw how we can use the Node JavaScript runtime environment to write our own scripts in aiding automation of of workflow. And NPM showed us thousands of open source packages available to aid in our automation process. While these tools definitely enhance our workflow, we can go a step further and have the computer do even more of the work for us.

---

# Build Systems

^ Build systems, sometimes referred to as task runners, are software tools designed to automate the process of programming compilation. We're going to write a program or a script that will tell the computer the rules of engagement, and then let the computer do the heavy lifting for us. We explain the jobs and our preferences, and then we can focus on the important part - writing the actual app code. The build system will watch our code and process what we want, where and when we want.

---

![inline](images/05-build_systems/build_systems-001.png)

---

## Types of Tasks

- lint code for errors
- minify code
- concatenate multiple files
- write source maps
- Babel ES6
- compile source files (scss, stylus, typescript)
- build static sites
- clean files/directories
- publish files/directories

^ What are some types of tasks we could automate in our build process?

---

## Popular Node.js Build Systems[^1]

- [Gulp](https://gulpjs.com)
- [NPM](https://www.npmjs.com)
- [Webpack](http://webpack.github.io)
- [Yarn](https://yarnpkg.com/en/)
- [Grunt](https://gruntjs.com)

[^1]:[slant.co](https://www.slant.co/topics/1276/~node-js-build-systems-task-runners)

^ Some of the popular Node.js based build systems currently are:

^ Each of these has pros and cons, and depending on your project needs and experience level, certain systems may be more or less ideal for your project. I'm going to show you Gulp in more detail, because it is extremely flexible, customizable, fast and it's configuration is written in JavaScript which lends itself to less of a learning curve since we're all familiar with JavaScript.

---

## Gulp

> gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something. - gulpjs.com

---

### Gulp Stats

- Over 150,000 installs
- Over 3,600 plugins
- Used by over 1,000 companies

---

## Gulp Setup

```javascript
const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');

gulp.task('css', function(){
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});
```

^ Gulp is a package, that can be installed in your project like any other. You can use NPM or Yarn package managers, or whatever other method you prefer. The task running process is managed by a JavaScript file that is included in your project, named `gulpfile.js`. This is an example of the look of a `gulpfile`.

---

### Anatomy of a `gulpfile.js` File

- `.task()`
- `.src()`
- `.watch()`
- `.dest()`
- `.pipe()`

^ Before we can being writing tasks, we need to understand the anatomy and structure of a `gulpfile`. Gulp started with four main methods: (_click_) `.task()`, (_click_) `.src()`, (_click_) `.watch()`, (_click_) `.dest()`, and (_click_) `.pipe()`.

---

#### Gulp Version 4

- `.series()`
- `.parallel()`

^ The release of version 4 introduced additional methods such as (_click_) `.series()` and (_click_) `.parallel()`.

---

### The `.task()` Method

```javascript
gulp.task('string', function)
```

^ The `.task()` method is the basic wrapper for which we create our tasks. Its syntax is `.task(string, function)`. It takes two arguments—string value representing the name of the task and a function that will contain the code you wish to execute upon running that task.

---

### The `.src()` Method

```javascript
gulp.src('./src/js/main.js');

gulp.src('./src/pages/*.njk');

gulp.src('./src/pages/**/*.+(html|njk)');
```

^ The `.src()` method is our input or how we gain access ot the source files we are planning to modify. It accepts a string pointing to a single file, or directory, and can include some wildcards.

---

### The `.watch()` Method

```javascript
gulp.watch('./src/**/*.njk', ['pattern-nunjucks']);

gulp.watch('./src/js/**/*.js', ['pattern-scripts']);

gulp.watch('./src/stylus/**/*.styl', [
  'pattern-lint-stylus',
  'pattern-stylus'
]);
```

^ The `.watch()` method allows us to specify a source point in our file set, and asks Gulp to monitor the files for changes. If any file within the specified source changes, any number of other tasks can be run automatically.

---

### The `.dest()` Method

```javascript
gulp.dest('./build/css/');

gulp.dest(`${build}/js/`);
```

^ If `.src()` defines our input, `.dest()` defines our output. Once the tasks have been completed, the `.dest()` defines where the output file(s) should be generated.

---

### The `.pipe()` Method

```javascript
.pipe(sourcemaps.init())
.pipe(babel())
.pipe(concat('main.js'))
.pipe(gulpif(argv.production, stripDebug()))
.pipe(gulpif(argv.production, uglify()))
.pipe(sourcemaps.write('.'))
```

^ The `.pipe()` method allows us to chain multiple tasks together.

---

### Including Modules/Plugins

```javascript
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
```

^ When writing a `gulpfile`, you always start by including the modules or plugins you are going to use in your tasks. These can be both Gulp plugins and Node.js modules, based on what your needs are. Gulp plugins are small Node.js applications built for use inside of Gulp to provide a single-purpose action, and can be chained together to create complex operations for your data. Node.js modules serve a broader purpose and can be used with Gulp or independently.

^ In this code, we have included Gulp and two gulp plugins: `gulp-concat` and `gulp-uglify`. As you can now see, including a plugin into your `gulpfile` is quite easy. After we install each module or plugin using npm, you use Node.js' `require()` function and pass it in the name of the module. You then assign it to a new variable so that you can use it throughout your script.

---

### Writing a Task

```javascript
gulp.task(name, function() {
  return gulp.src(path)
    .pipe(plugin)
    .pipe(plugin)
    .pipe(gulp.dest(path));
});
```

^ All tasks in Gulp share a common structure. Regardless of how large each task is, all tasks follow the same pattern. This bare skeleton of a task shows the bone structure of a task.

^ In the first line, we use the new Gulp variable that we created a moment ago and access the `.task()` method. This creates a new task in our `gulpfile`. The task method accepts two arguments: a task name as a string and a callback function that will contain the actions we wish to run when the task is executed.

^ Inside the callback function, we reference the Gulp variable once more and then use the `.pipe()` method to string multiple actions together.

---

### Gulp Task Example

```javascript
const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('styles', () => {
  return gulp.src('css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/'));
});
```

---

### The `watch` Task

```javascript
gulp.task('watch', () => {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
});
```

^ So far, all of the tasks that we have written are actually only capable of running once. Once they complete, their job is considered done. However, this isn't very helpful as we would end up having to go back to our command line to run them again every time we make a change to our files. This is where Gulp's `.watch` method comes into play. The watch method's job is to specifically look for changes to files and then respond by running tasks in relation to those changes.

^ The watch method is built into Gulp as a core feature, so no new plugins are needed to use it. To better organize these watch methods, we will create an additional watch task that will serve as a container and an easy way to reference all of the watch method calls inside of our `gulpfile`.

---

### The `default` Task

```javascript
gulp.task('default', [
  'styles',
  'scripts',
  'images'
]);
```

^ The default task is the entry point for our `gulpfile`. The purpose of this task is to gather and execute any tasks that Gulp needs to run by default.

^ The default task is the smallest and most simple task in our `gulpfile` and will only take up a single line of code.

---

### Task Execution Chains

```javascript
// Default, start scripts and styles
gulp.task('default', ['scripts', 'styles'], () => {...});

// both scripts and styles call clean
gulp.task('scripts', ['clean'], () => {...});
gulp.task('styles', ['clean'], () => {...});

// Clean wipes out the build directory
gulp.task('clean', () => {...});
```

^ Gulp allows defining a dependency to a task. It makes sure that this dependency task gets executed before the original task gets triggered.

^ We want to build scripts and styles, but before we do so, we want to clean the original build directory so we can start with a blank slate.

---

![inline](images/05-build_systems/gulp-dependency_tree.png)

^ When Gulp is started, it creates a dependency tree like this. It realizes that _clean_ is a dependency of the two tasks, and so it makes sure that it is only executed once.

---

![inline](images/05-build_systems/gulp-dependency_tree_concurrency.png)

^ All tasks are executed for maximum concurrency, so the execution order is something like this.

^ First _clean_, then _scripts_ and _styles_ in parallel, and then after that we can execute the _default_ task function.

---

#### Execution Chain Issues

- execution is mandatory
- no sequential execution

^ There are some problems.

^ (_click_) Once you define the dependency chain in that way, the execution of this dependency is mandatory. If we want to have watchers that listen on one type, we have a problem. Imagine triggering _styles_ every time you change a CSS file; it would execute _clean_ first, then _styles_, which could potentially delete some of the work done from _scripts_

^ (_click_) There is also no way of executing tasks sequentially.

---

### Task Execution - Gulp 4

- `gulp.series`: sequential execution
- `gulp.parallel`: parallel execution

^ Gulp 4 drops the dependency parameter completely and replaces them with execution functions that can be used instead. (_click_)

---

### Parallel Execution

```javascript
gulp.task('default', gulp.parallel('scripts', 'styles'));
```

^ If you want to execute _scripts_ and _styles_ in parallel, you can write something like this.

---

![inline](images/05-build_systems/gulp-series_sequence.png)

^ `gulp.parallel` and `gulp.series` are functions, and they accept functions. So you can nest them as much as you want, creating complex execution orders.

^ The execution of the graph above is A, then B, then C and D in parallel, then E.

---

## Running Tasks

```javascript
gulp
```

^ In many cases, gulpfiles are structured to be executed with a single, one word command, `gulp`. Upon running this command, Gulp will run the task with the name default in our `gulpfile`. When we run Gulp like this, without any additional parameters, it is built to always run the default task, which in turn can run any number of tasks we created.

---

### Running A Single Task

```javascript
gulp styles
```

^ Tasks can be run independently and manually as a certain step in the workflow process. If you need to run any of the tasks manually, you can do so by simply separating your Gulp command with a single space and then listing the name of the task you wish to run as a parameter.

---

## Example Time

^ _examples/05-build\_systems/_

---

- https://www.packtpub.com/mapt/book/application_development/9781787283732/3/ch03lvl2sec18/anatomy-of-a-gulpfile
- https://fettblog.eu/gulp-4-parallel-and-series/