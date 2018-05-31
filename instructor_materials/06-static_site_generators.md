build-lists: true
footer: IDM 222: Web Authoring II
slidenumbers: true
autoscale: true
theme: Next, 1

# Workflow Optimization Techniques

^ Last time, we talked about task runners, specifically Gulp, which can help us automate the optimization of many of our development tasks. This week, we're going to look into another concept that can speed up our development process, and help us create modular, reusable code.

---

# Static Site Generators

---

[.background-color: #FFFFFF]

![fit](images/06-static_site_generators/operation_trail-step_09.png)

^ Refresh yourself with how dynamic sites work. We are able to build dynamic interfaces, where content and structure are prepared by the server and then delivered to the user. Remember things like _includes_ and _databases_? When a visitor gets to a website, a server-side script will query one or multiple databases to get the content, pass the results to a templating engine that will format and arrange everything properly and generate an HTML file for the user to consume.

---

## How Static Sites Work

^ The proposition of a static site is to shift the heavy load from the moment visitors request the content to the moment content actually changes. They take the content, typically stored in flat files rather than databases, apply it against layouts or templates and generate a structure of purely static HTML files that are ready to be delivered to the users.

---

### Advantages of Static Sites

- speed/performance
- version control for content
- security
- less server hassle
- traffic surges

^ Speed: there are no database queries to run, no templating and no processing whatsoever on every request.

^ Version Control: data that sits in a database somewhere else, completely separated from the codebase and its version control system is not ideal. In a static site, the content is typically stored in flat files and treated as any other component of the codebase.

^ Security: Platforms like WordPress are used by millions of people around the world, meaning they're common targets for hackers and malicious attacks — no way around it. Static sites keep it simple, since there's not much to mess up when there's only a web server serving plain HTML pages.

---

### Disadvantages of Static Sites

- No real-time content
- No user input
- No admin UI

^ With a static site you lose the ability to have real-time data, such as indication about which stories have been trending for the past hour, or content that dynamically changes for each visitor, like a "recommended articles for you" kind of thing. Static is static and will be the same for everyone.

^ User Input: Adding user generated content to a static site is a bit of a challenge.

---

## How's It Work

^ To use a static site generator, we'll build a series of templates, not unlike the concept we used in scripting when we developed _includes_ to aid with shared structure and content. We'll couple the templates with content, which will be developed using some type of markup language. The content will be funnelled through the generator and applied to the appropriate template files, at which point we'll be left with static HTML files.

---

## Popular Static Site Generators

- Jekyll
- Hugo
- Octopress
- Pelican
- Brunch
- Middleman

^ These are just some of the popular options currently available. Fundamentally they all work the same way. Some have different advantages based on the desired output or the markup language used within. You have to choose the right tool for the job.

---

## Nunjucks

^ One of my favorite static site generators is called Nunjucks. Nunjucks is very popular, well documented and has plugins to use in virtually any build system. It is based on a template system, and includes powerful functions called _macros_ that can significantly improve code modularity. Best of all, it's based on HTML, so it's simple to write and has a small learning curve.

---

## Includes | Imports

```php
<?php include "header.php"; ?>
```

^ We are once again going to want to use imports. Languages like PHP make this simple with things like this? The problem is, static file hosts don’t run PHP (on purpose) and HTML alone is no help. Fortunately, we can preprocess includes with Nunjucks.

---

![fit](images/06-static_site_generators/common_includes.png)

---

## Breaking HTML Into Smaller Files

```html
<body>
  <nav> ... </nav>
  <div class="content"> ... </div>
  <footer> ... </footer>
</body>
```

^ It’s common for a HTML file to contain blocks of code that are repeated across the website. Consider this markup for a second:

^ Much of these code, particularly those within _nav_ and _footer_, are repeated across multiple pages.

^ Since they are repeated, we can pull them out and place them into smaller files called _partials_.

---

### Navigation Partial

```html
<!-- Navigation Partial -->
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
```

^ For example, the navigation partial may contain a simple navigation like this. Then, we can reuse this partial across our HTML files.

---

### HTML With Partials

```html
<body>
  {% include partials "nav" %}
  <div class="content"> ... </div>
  {% include partials "footer" %}
</body>
```

^ Just imagine what you would do if you had to change the navigation now. When you use a partial, all you have to do is change code in the navigation partial and all your pages will be updated. Contrast that with having to change the same code across every file the navigation is used on.

---

## Using Data to Populate Markup

```html
<div class="gallery">
<div class="gallery__item">
  <img src="item-1.png" alt="item-1">
</div>
<div class="gallery__item">
  <img src="item-2.png" alt="item-2">
</div>
<div class="gallery__item">
  <img src="item-3.png" alt="item-3">
</div>
```

^ This benefit is best explained with an example. Let’s say you’re creating a gallery of images. Your markup would be something similar to this.


---

### Can We Loop

```html
<div class="gallery">
  // Some code to loop through the following 5 times:
  <div class="gallery__item">
    <img src="$path-to-image" alt="$alt-text">
  </div>
  // end loop
</div>
```

^ Now, imagine if you had the ability to write HTML with some sort of logic. You’d probably write something similar to this:

---

### We Can Loop

```html
<div class="gallery">
  {% for image in images %}
    <div class="gallery__item">
      <img src="{{src}}" alt="{{alt}}">
    </div>
  {% endfor %}
</div>
```

^ Template engines gives you the ability to use such a loop. Instead of looping exactly five times, it loops through a set of data that you pass to it. The html would become:

---

### Loop Data

```json
images: [{
  src: "item1.png",
  alt: "alt text for item1"
}, {
  src: "item2.png",
  alt: "alt text for item1"
},
  // ... Until the end of your data
]
```

^ The data would be a JSON file that resembles the following.

^ When the data is supplied, the template engine would create a markup such that the number of `.gallery__items` would correspond to the number of items in the images array of the data.

^ The best part is that you only have to change the markup once and all `.gallery__items` would be updated.

^ Here, template engines once again gives you the ability to write lesser code, and helps preserve your sanity when code needs to be changed.

---

## Layouts

```html
<body>
  {% include "./template-parts/_header.njk" %}
  {% include "./template-parts/_nav.njk" %}

  {% block content %}
  {% endblock %}

  {% include "./template-parts/_footer.njk" %}
</body>
```

^ Our goal is to create a layout, including chunks of HTML representing the header, navigation, and footer. Nunjucks' template system has the concept of blocks, which allow us to slot in content into that spot when we use the layout.

^ Notice the files that are included are named like `_file.njk`. Recall that files that start with underscores are a bit of-of a standard way of saying they are a _partial_. `.njk` is the standard file extension for working with Nunjucks files. You are not limited to only including Nunjucks files in templates. You could include an HTML or SVG file in the same manner.

---

## Pages

```html
{% extends "_layout.njk" %}

{% block content %}
<h1>Hello World!</h1>
{% endblock %}
```

Now each page will be it's own file, each of which will reference (or extend from) a template layout, putting different content in the various _blocks_, creating unique HTML pages.

---

## Using Nunjucks with Gulp

^ _examples/06-nunjucks_
