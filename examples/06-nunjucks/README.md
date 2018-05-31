# Using Nunjucks with Gulp

Nunjucks will fit into our Gulp based build system easily. We can use a plugin called [gulp-nunjucks-render](https://github.com/carlosl/gulp-nunjucks-render).

Start by installing `gulp-nunjucks-render`.

```bash
npm i gulp gulp-nunjucks-render --save-dev
```

In our primary `gulpfile.js`, we need to also add this plugin.

```javascript
const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
```

Next, we'll setup our project structure.

```txt
project/
	|- build/
	|- src/
		|- pages/
		|- templates/
			|- partials/
```

The _templates_ folder is used for storing all Nunjucks partials and other Nunjcks files that will be added to files in the _pages_ folder.

The _pages_ folder is used for storing files that will be compiled into HTML. Once they are compiled, they will be created in the _build_ folder.

## Layout Boilerplate

First of all, one good thing about Nunjucks (that other template engines might not have) is that it allows you to create a template that contains boilerplate HTMl code which can be inherited by other pages. Let’s call this boilerplate HTML `layout.njk`.

Create a file called layout.nunjucks and place it in your templates folder. It should contain some boilerplate code like `<html>`, `<head>` and `<body>` tags. It can also contain things that are similar across all your pages, like links to CSS and JavaScript files.

- `src/templates/layout.njk`

```html
<!-- layout.nunjucks -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <!-- <link rel="stylesheet" href="css/styles.css"> -->
</head>
<body>

  <!-- You write code for this content block in another file -->
  {% block content %} {% endblock %}

  <!-- <script src="js/main.js"></script> -->
</body>
</html>
```

## Index Page

Next, let's create an `index.njk` file in the _pages_ directory. This file will eventually be converting into `index.html` and placed in the _build_ folder. It should extend `layout.njk` so it contains the boilerplate code we defined in `layout.njk`.

- `src/pages/index.njk`

```html
<!-- index.nunjucks -->
{% extends "layout.nunjucks" %}

{% block content %}
<h1>This is the index page</h1>
{% endblock %}
```

## Setup Gulp File

Next, let's create a Nunjucks task that does the convertion to static files.

- ./gulpfile.js

```javascript
gulp.task('nunjucks', () => {
	//
});
```

The `nunjucks-render` plugin allows us to specify a path to the templates with the `path` option.

```javascript
gulp.task('nunjucks', () => {
	// get .html|.njk files in 'pages'
	return gulp.src('pages/**/*.+(html|njk)')
		// render template with nunjucks
		.pipe(nunjucksRender({
			path: ['templates']
		}))
		// output files to build folder
		.pipe(gulp.dest('build'))
});
```

Now we should be able to run `gulp nunjucks` from the command line and Gulp will create `index.html` and place it in the _build_ folder.

```bash
gulp nunjucks
```

- [original source](https://zellwk.com/blog/nunjucks-with-gulp/)