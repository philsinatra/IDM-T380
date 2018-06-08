# Using Nunjucks

<!-- TOC -->

- [Using Nunjucks](#using-nunjucks)
	- [Nunjucks + Gulp](#nunjucks--gulp)
		- [Layout Boilerplate](#layout-boilerplate)
		- [Index Page](#index-page)
		- [Setup Gulp File](#setup-gulp-file)
		- [Adding a Partial](#adding-a-partial)
		- [Adding a Macro](#adding-a-macro)
		- [Enhancing The Macro](#enhancing-the-macro)
		- [Using The Macro](#using-the-macro)
		- [Working With Data](#working-with-data)
	- [Nunjucks + Node.js](#nunjucks--nodejs)
		- [Data Source](#data-source)
		- [Dependencies](#dependencies)
		- [Gen Script](#gen-script)
		- [Looping Through The Screens](#looping-through-the-screens)

<!-- /TOC -->

## Nunjucks + Gulp

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

### Layout Boilerplate

First of all, one good thing about Nunjucks (that other template engines might not have) is that it allows you to create a template that contains boilerplate HTMl code which can be inherited by other pages. Let’s call this boilerplate HTML `layout.njk`.

Create a file called layout.nunjucks and place it in your templates folder. It should contain some boilerplate code like `<html>`, `<head>` and `<body>` tags. It can also contain things that are similar across all your pages, like links to CSS and JavaScript files.

- `src/templates/layout.njk`

```html
<!-- layout.njk -->

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

### Index Page

Next, let's create an `index.njk` file in the _pages_ directory. This file will eventually be converting into `index.html` and placed in the _build_ folder. It should extend `layout.njk` so it contains the boilerplate code we defined in `layout.njk`.

- `src/pages/index.njk`

```html
<!-- index.njk -->
{% extends "layout.njk" %}

{% block content %}
<h1>This is the index page</h1>
{% endblock %}
```

### Setup Gulp File

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
  return gulp.src('./src/pages/**/*.+(html|njk)')
    // render template with nunjucks
    .pipe(nunjucksRender({
      path: ['./src/templates']
    }))
    // output files to build folder
    .pipe(gulp.dest('build'));
});
```

Now we should be able to run `gulp nunjucks` from the command line and Gulp will create `index.html` and place it in the _build_ folder.

```bash
gulp nunjucks
```

Notice how everything other than the `<h1>` tag came from the `layouts.njk` file. If we make edits to the template files, all of the subsequent exports will automatically be updated accordingly.

### Adding a Partial

Let's work on our navigation next. We'll create a new file `_nav.njk` and place it in a _partials_ folder witin the _templates_ folder.

- `./src/templates/partials/_nav.njk`

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

Next we'll add this partial to our `index.njk` file. To add partials, you can use Nunjuck's _include_ statement.

- `./src/pages/index.njk`

```html
{% block content %}
<h1>This is the index page.</h1>
{% include "partials/_nav.njk" %}
{% endblock %}
```

Now we can run our Gulp task again and the _index.html_ file should include the navigation code.

Next, let's consider a common situation where we want to add a class to one of the links when we're on a specific page. In this case our class will be called _active_.

We can do this with another Nunjucks feature, called a _macro_

### Adding a Macro

First, we'll create a new file called _macro-nav.njk_ and store it in a _macros_ folder that is within the _templates_ folder.

```txt
project/
  |- build/
  |- src/
    |- pages/
    |- templates/
        |- macros
      |- partials/
```

All macros begin and end with macro tags.

- `./src/templates/macros/macro-nav.njk`

```html
{% macro active(activePage="home") %}
<nav>
  <ul>
    <li>
      <a href="#" class="{% if activePage == 'home' %} active {% endif %}">Home</a>
    </li>
    <li>
      <a href="#" class="{% if activePage == 'about' %} active {% endif %}">About</a>
    </li>
    <li>
      <a href="#" class="{% if activePage == 'contact' %} active {% endif %}">Contact</a>
    </li>
  </ul>
</nav>
{% endmacro %}
```

### Enhancing The Macro

That will get the job done, but it's a bit unsophisticated. Let's try simplifying things with a loop.

```html
{% macro active(activePage="home") %}
<nav>
  <ul>
    {% set items = ['home', 'about', 'contact'] %}
    {% for item in items %}
      <li {%if activePage == item %} class="active" {% endif %}>
        <a href="#">{{ item }}</a>
      </li>
    {% endfor %}
  </ul>
</nav>
{% endmacro %}
```

### Using The Macro

Once we're done writing the macro we can use it in _index.njk_. To gain access to our macros, we'll use the _import_ function in Nunjucks, not to be confused with the _include_ function when we previously added a partial.

- `./src/pages/index.njk`

```html
{% block content %}

{% import 'macros/macro-nav.njk' as nav %}

{% endblock %}
```

In this case, we've set the variable `nav` to equal the entire _macro-nav.njk_ file. We can then use the `nav` variable to call any macro that is in that macro file.

```html
{% block content %}

{% import 'macros/macro-nav.njk' as nav %}
{{ nav.active('home') }}

{% endblock %}
```

### Working With Data

Next, let's use external data to quickly generate a lot of HTML content. We'll start with a simple JSON file.

- `./src/data/data.json`

```json
{
  "images": [
    {
      "src": "image-one.png",
      "alt": "Image one alt text"
    },
    {
      "src": "image-two.png",
      "alt": "Image two alt text"
    },
    {
      "src": "image-three.png",
      "alt": "Image three alt text"
    }
  ]
}
```

The plan is to read in this data, and use it in our export process. We can do that with another loop.

- `./src/pages/index.njk`

```html
{% block content %}
<div class="gallery">
  {% for image in images %}
    <div class="gallery__item">
      <img src="{{ image.src }}" alt="{{ image.alt }}">
    </div>
  {% endfor %}
</div>
{% endblock %}
```

Finally, we'll adjust our `nunjucks` task to read from our JSON data. We'll need a different plugin called `gulp-data`.

```bash
npm i -D gulp-data
```

- `./gulpfile.js`

```javascript
const data = require('gulp-data');
```

Gulp-data takes in a function that allows you to return a file. We can use Node's _require_ function to get our data file.

```javascript
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
```

## Nunjucks + Node.js

Let's build a separate Node.js script for building a static site from this content, without the use of Gulp.

```txt
project/
  |- build/
  |- data/
  |- scripts/
  |- src/
    |- templates/
```

```bash
mkdir 02
cd 02
mkdir data scripts src
mkdir src/templates
```

### Data Source

- `./data/data.json`

```json
{
  "name": "My Test Data Project",
  "description": "This is the description",
  "screens": [{
      "S_id": "S_1",
      "S_template": "standard",
      "S_Title_t": "Sample screen 01",
      "S_Screen": "<p>This is generated from JSON data.</p>"
    },
    {
      "S_id": "S_2",
      "S_template": "standard",
      "S_Title_t": "Sample screen 02",
      "S_Screen": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et erat orci. Etiam in dolor at arcu scelerisque aliquet. Quisque lorem diam, volutpat in elementum non, facilisis vel ipsum. Fusce ut posuere neque. Vestibulum egestas, odio a gravida rhoncus, dolor mi ullamcorper velit, id lobortis nisl elit imperdiet neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras ac nunc nisi, egestas tincidunt urna. Nullam vel tortor nec lectus porta tincidunt ac eget diam. Praesent vulputate, nunc eget sodales imperdiet, nunc orci ullamcorper justo, in elementum ante felis sit amet dolor. Vivamus mattis blandit blandit. Etiam vitae sapien nulla, interdum feugiat ligula. Cras eu tortor orci. Maecenas sed est tellus. Vestibulum est libero, venenatis a feugiat id, condimentum et erat. Nulla id volutpat nunc. Nam sodales nunc quis metus sagittis vestibulum.</p>"
    }
  ]
}
```

### Dependencies

No Gulp for this example. Instead we'll build the script using Javascript and run it with Node.js. We'll use two packages for this job:

```bash
npm i -D nunjucks mkdirp
```

### Gen Script

- `./scripts/gen.js`

First we'll setup some variables for the packages we'll be leveraging in our script.

```javascript
const fs = require('fs');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const path = require('path');
```

Next, let's resolve the paths for our data, templates and exports. These are relative paths based on the location of our script.

```javascript
const json = '../data/data.json';
const pages = '../build/pages';
const templates = '../src/templates';
```

Next, we'll use the `path` package to resolve these paths so that we can run our script from anywhere within our project structure.

```javascript
const data = path.resolve(__dirname, json);
const pagePath = path.resolve(__dirname, pages);
const templatePath = path.resolve(__dirname, templates);
```

Now we're ready to read the data and write our files. Let's collect all of the data in the JSON file and store it in a variable.

```javascript
const obj = JSON.parse(fs.readFileSync(data, 'utf8'));
```

We also are going to setup a Nunjucks rendering environment, and tell the renderer where our Nunjucks template files are located.

```javascript
const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(templatePath)
);
```

### Looping Through The Screens

Now we want to loop through all of the _screens_data in our JSON file and build a unique HTML file for each entry. Let's wrap that in a function.

```javascript
const Process = () => {
  obj.screens.forEach(element => {
    console.group('Screen Info:');
    console.log(`S_id: ${element.S_id}`);
    console.log(`S_template: ${element.S_template}`);
    console.log(`S_Title_t: ${element.S_Title_t}`);
    console.groupEnd();
  });
};
```

```javascript
const Process = () => {
  obj.screens.forEach(element => {
    console.group('Screen Info:');
    console.log(`S_id: ${element.S_id}`);
    console.log(`S_template: ${element.S_template}`);
    console.log(`S_Title_t: ${element.S_Title_t}`);
    console.groupEnd();

    RenderPage(element);
  });
};

Process();
```

Inside our loop we'll call a function `RenderPage` and pass each _element_ or item from our JSON object. That's the function that will generate our HTML files. Let's write that function next.

```javascript
const RenderPage = (info) => {
  const str = fs.readFileSync(`${templatePath}/${info.S_template}.njk`, 'utf8');
  const res = env.renderString(str, info);
  mkdirp.sync(pagePath);
  fs.writeFileSync(`${pagePath}/${info.S_id}.html`, res, 'utf8');
};
```
