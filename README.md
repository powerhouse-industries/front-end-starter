# Front-End Best Practice and Methodology

[![Build Status](https://travis-ci.org/ledgardjepson/front-end-starter.svg)](https://travis-ci.org/ledgardjepson/front-end-starter) [![Code Climate](https://codeclimate.com/github/ledgardjepson/front-end-starter/badges/gpa.svg)](https://codeclimate.com/github/ledgardjepson/front-end-starter)  [![David](https://img.shields.io/david/ledgardjepson/front-end-starter.svg)](https://github.com/ledgardjepson/front-end-starter) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ledgardjepson/front-end-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Authors: [Oliver Farrell](https://twitter.com/oliverfarrell) & [Jonny Haynes](https://twitter.com/jonnyhaynes) | Last Updated: 17 March 2015

This document outlines best practices, guidelines and methodologies that should be considered and in most cases adhered to when building web applications. It is a forever evolving document and should be regularly reviewed to keep up with changes and best practices. It is inspired by the great work of [TMW](http://tech.tmw.co.uk/code/TMW-frontend-guidelines), [Isobar](http://isobar-idev.github.io/code-standards/) and [Sass Guidelines](http://sass-guidelin.es/).

## Content
* General Guidelines
	* Editor Setup
	* Project Structure & Setup
	* Build Tools
	* Readability vs Compression
* Browser Support
* Markup
	* General Guidelines
  * Quoting Attributes
  * Schema.org
  * Images
  * Accessibility
* CSS
  * Syntax and Formatting
  * Validation
  * OOCSS
  * Typography
  * Reset
  * Comments
  * Conditional Stylesheets
  * Images
	  * Inline SVG
* Sass
	* Nesting
	* Extends
	* Mixins
	* Mobile First
* Javascript
	* Dependency Management
	* jQuery vs Vanilla JavaScript

## General Guidelines
All front-end code should be well written, semantically correct and generally valid to W3C Standards. Progressive enhancement should be considered when implementing Javascript functionality and unsupported technologies such as `box-shadow` and geolocation. Sites should degrade gracefully using feature detection through [Modernizr](http://modernizr.com/).

### Editor Setup
Everyone has a preference when it comes to their text editor/IDE of choice and we’re not going to force anyone to use any particular editor. Therefore each project should feature an `.editorconfig` file in its root.

EditorConfig helps us define and maintain consistent coding styles between different editors and IDEs. You should [install the EditorConfig plugin](http://editorconfig.org/#download) for your editor of choice.

### Project Structure and Setup
All projects use the [FES] as a starting point. You can clone the repo from here: [https://github.com/ledgardjepson/front-end-starter.git](https://github.com/ledgardjepson/front-end-starter.git).

#### To set up a project on your local machine follow the steps below:

The first step is setting up a new empty git repo in [Github](https://help.github.com/articles/create-a-repo/).

Create a new empty repo and add an empty file (`.gitkeep`) to initialise the repo. Then push to the new empty repo back to Github. Initialise the local repo with [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/). *N.B.* Git Flow adds local settings to the git config, but does not affect the remote (origin) repo in any way, so if you re-clone the repo for whatever reason later on, you will need to re-initialise git flow again.

In your terminal of choice do the following:

```
mkdir <new_repo>
cd <new_repo>
git init .
touch .gitkeep # git works on files, not empty directories
git add .
git commit -m 'Initial Commit'
git remote add origin git@github.com:<username>/<new_repo_name>.git
git push origin master -u
git flow init -d # Accept all the default settings, this will create the develop branch for you
git push origin develop -u # Set local develop to track origin develop branch
```
Now your empty project is setup you'll need to pull this repo into your develop branch.

```
git pull --no-commit --squash git@github.com:ledgardjepson/front-end-starter.git master
```

This pulls the [FES] repo files into your working copy. The --squash option prevents the entire [FES] master branch history from being imported. Now commit the changes we've just done.

```
git commit -m 'Initial import of [FES] master branch'
```

Now we have all the necessary [FES] files we need to set up the build environment.

Run `npm install` to download all the Node dependencies listed in `package.json`. You should then run `npm run setup` which will build your production environment for the first time and install any dependencies.

If you're using something like the highly recommended Node module [http-server](https://www.npmjs.com/package/http-server) you can now run `http-server` and you should see the [FES] startup page.

### Build Tools
Build tool such as Grunt or Gulp are not used. Instead we opt for a slimline set of native NPM commands and packages. Open up `package.json` and you’ll find a number of build commands under "scripts".

Type `npm run [task-name]` into your command prompt to run a single task or `npm run build:watch` to continually watch for changes to Sass and JavaScript and run the corresponding tasks.

### Readability vs Compression
We promote readability over file-size where maintaining code is concerned. Add as much white space as appropriate and comment your code regularly. There is no need to manually compress HTML, CSS or JavaScript.

We will use server-side or build tools to automatically minify and gzip static client-side files, such as CSS and JavaScript.

## Browser Support
All code is thoroughly tested across a number of platforms, operating systems and web browsers. We primarily use VirtualBox to host our Virtual Machines and grab the latest VMs for Internet Explorer from [here](https://www.modern.ie/en-us).

Where testing is concerned we split web browsers into two main categories. A Grade browsers and C Grade browsers, based on the worked developed by [YUI](https://github.com/yui/yui3/wiki/Graded-Browser-Support).

### A Grade Browsers
A-grade support is the highest support level. By taking full advantage of the capabilities of modern web standards, the A-grade experience provides advanced functionality and visual fidelity.

| Desktop            | Versions      |
| ------------------ | ------------- |
| Internet Explorer  | 9, 10 and 11  |
| Safari             | 8             |
| Chrome             | 30 and 40     |
| Firefox            | Latest        |

| Tablet             | Versions      |
| ------------------ | ------------- |
| Chrome             | Latest        |
| Safari             | Latest        |

| Mobile             | Versions      |
| ------------------ | ------------- |
| Chrome             | Latest        |
| Safari             | Latest        |

### C Grade Browsers
C-grade is the base level of support, providing core content and functionality.

| Desktop            | Versions      |
| ------------------ | ------------- |
| Internet Explorer  | 8             |
| Safari             | 7             |
| Chrome             | 38            |
| Firefox            | 34            |

| Tablet             | Versions      |
| ------------------ | ------------- |
| Opera              | N/A           |
| Firefox            | N/A           |

| Tablet             | Versions      |
| ------------------ | ------------- |
| Chrome             | N/A           |
| Safari             | N/A           |

## Markup
We use HTML5 as standard on all our web applications. To ensure backwards compatibility with older, unsupported, web browsers we use [Modernizr](http://modernizr.com/).

### Validation

All of our markup is tested against W3C Standards using [their validator](http://validator.w3.org/) to ensure that our markup is well formed and free of errors that may cause compatibility problems.

It’s important to note that our goal isn’t to write 100% valid code but instead ensure our code is maintainable whilst making sure the user experience is consistent cross-browser.

### General Guidelines
The following are general guidelines for structuring your HTML markup. We are reminded to always use markup which represents the semantics of the content in the document being created.

* Use `<p>` elements for paragraph delimiters as opposed to multiple `<br />` tags.
* Items in list form should always be housed in a `<ul>`, `<ol>`, or `<dl>`.
* Consider placing HTML comments around block element that contain larger amounts of markup to indicate the element being closed. It makes skim-reading code much easier.

```html
<div class="my-element">
	<p>This is my element</p>
</div><!-- /.my-element -->
```
* Each `<input>` inside of a form should always have an associated `<label>` and the `placeholder` attribute should never be used as a substitute.
* Always use CSS to transform text to uppercase or lowercase. Never enter content in ALL CAPS or lowercase.
* Use Schema where appropriate, specifically for organisation details (logo, address, telephone numbers etc). Refer to the [Scheme]() section of this document for more details.

### Quoting Attributes
Even though the HTML5 specification enables us to write HTML attributes without quotation marks, we should always use double quotes around all attribute values.
```html
<a href=“#” title=“This is a link title”>My link</a>
```

### Schema
Schema.org is a collaboration between the top three search engine providers, Google, Microsoft and Yahoo! to improve the web by creating a structured data markup schema that all major search engines pledge to support.

Schema.org can be used to markup addresses, organisation details such as logos, addresses and telephone numbers, events, articles, products and reviews.

We strive to incorporate Schema markup where possible – check out a full list of supported Schemas [here](http://schema.org/docs/schemas.html).

### Images
While support for `<picture>` and `srcset` are limited we’ve opted for [Picturefill](https://github.com/scottjehl/picturefill) as a Polyfill for responsive images.

```html
<picture>
	<!--[if IE 9]><video style="display: none;"><![endif]-->
	<source srcset="examples/images/large.jpg, examples/images/extralarge.jpg 2x" media="(min-width: 800px)">
	<!--[if IE 9]></video><![endif]-->
	<img srcset="examples/images/small.jpg, examples/images/medium.jpg 2x" alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia">
</picture>
```

All images (including SVGs) should be optimised before hitting a production server. Our build tools usually take care of this.

#### Inline SVGs
In most cases we inline SVG images to remove the need for different versions of the same image. If an icon has two variants, one red and one blue, we can use CSS to change the `<path>` fill colour instead of generating two different images. We use <a href="https://github.com/jonnyhaynes/inline-svg">a script</a> to take care of this process for us.

### Accessibility
We utilise [WAI-ARIA](http://rawgit.com/w3c/aria-in-html/master/index.html) in all web applications to ensure that users with visual impairments or others disabilities are able to access our applications via a screen reader or other assistive technology.

You should always strive to make your applications accessible and therefore should include WAI-ARIA wherever possible.

```html
<header role="banner"></header>
<button aria-label="Close">X</button>
```

All of our code strives to adhere to the W3C's [WCAG 2.0](http://www.w3.org/TR/WCAG20/) AA standard where possible.

## CSS
We use Sass to compose our stylesheet, but more on that further into this document. We always avoid writing CSS inline – it might make quick and dirty fixes easy, but in the long run it makes our code impossible to maintain. The only time we do inline CSS is where it’s necessary to apply user customisations.

### Validation
We don’t validate our CSS to W3C Standards as we use a lot of experimental features and these are usually not supported by the W3C's validators.

### Syntax and Formatting
We write CSS using the BEM (Block, Element, Modifier) naming convention and opt for multi-line CSS declarations. Where possible you should try to group related rulesets together, for example: all positional rules together, all font rules together etc.

All CSS rules should have a space after the selector colon and a trailing semi-colon. The closing brace should be inline with the start of the selector it closes.

We use two spaces indents and no tabs. We also use whitespace to clearly separate large blocks of code.

Some examples of good rulesets:

```css
// a standard ruleset
.element {
  position: relative;
  top: 0;
  left: 0;

  padding: 10px;
  margin-right: 20px;

  background: red;
  box-shadow: 0px 0px 10px rgba(0,0,0,.2);
}

// chained classes should look like this
.this,
.then-this {
  background: blue;
}

// a state class (.is-*, .has-*) should look like this
.is-visible { display: block; }
.has-dropdown { display: none; }
.is-collapsed { height: 0; }

// single rule selectors can look like this
a { color: red; }
```

Class names should always be lowercase and where necessary separated with a dash. It is always preferable to name an ID or class by the nature of what it is rather than by what it looks like.

Our use of IDs are limited to major containers and in most cases are avoid to prevent specificity issues.

Don’t over qualify selectors:

```css
// bad
div.content {}

// good
.content {}
```

### OOCSS
In an effort to make our code reusable and to help us build easily maintainable chunks of code we've opted to follow the OOCSS methodology.

When building components, or modules, try and keep a DRY, object oriented mindset.

Following an OOCSS approach means that we don't need to build lots of unique components and instead can spot similarities and repeated patterns that can be reused elsewhere. In short, save specific classes for theming a module and use generic classes to construct them.

### Typography
Where it’s necessary for us to use a non-standard typeface we look to TypeKit or Fonts.com to provide web fonts for use in our web applications. When choosing web fonts for a project be sure to only select the exact families and weights required, loading in non-essential fonts will add bloat and harm page load speeds.

### Reset
Where CSS resets are concerned we opt for the tried and tested [Eric Meyer Reset](http://meyerweb.com/eric/tools/css/reset/).

### Comments
We aim to comment as much of our code as we can. Where we think it might be useful to include a commented out piece of markup which can help put CSS rules into context, we do. This is particularly useful when adopting a modular approach to writing CSS to illustrate how an entire module can be replicated in HTML.

All CSS is minified before it is deployed so don't worry about bloating code with excessive comments it's more beneficial than it is detrimental.

### Conditional Stylesheets
When building mobile first responsive websites, it’s necessary to generate a separate stylesheet for older versions of Internet Explorer to ensure they aren't left with the mobile version of a website because they cannot read media queries. This can be done using SASS and is covered in the SASS section of this documentation.

### Images
Image names should use dashes and be named so that their use is clear e.g. `icon-facebook.svg`. There are a number of options for how we might choose to deal with images in CSS:

* CSS Sprites:
* Data URIs:

When possible we choose SVGs over any other file format for icons and other vector based imagery and provide a fallback for browsers that don't support SVG in the following manner:

```css
.thing {
  background-image: url('bear.svg');
}

.no-svg .thing {
	background-image: url('bear.png');
}
```

The `.no-svg` class is added to the body by Modernizr. To quickly generate PNG fallbacks you might choose to use a tool like [Grunticon](https://github.com/filamentgroup/grunticon).

## Sass
We use Sass as our preprocessor of choice and choose to separate our CSS into separate files for easier maintainability. A typical Sass structure looks something like this:

```
|- base
|- components
|- helpers
|- layout
|- modules
|- _vars.scss
|- _trumps.scss
|- print.scss
|- main.scss
|- ie8.scss
```

There are some downsides to using preprocessors and these should be fully understood before contributing CSS to a project.

### Nesting
When nesting selectors don’t nest more than three levels deep. Don’t use Sass’ ability to nest infinitely to do just that. Only nest selectors as you would with vanilla CSS.

The following Sass is unnecessary and overly specific meaning the styles will be hard to reuse across a project.

```scss
.global-header {
	.site-nav {
		li {
			a {}
		}
	}
}
```

Instead we would write the following:

```scss
.site-nav {
	li {}
	a {}
}
```

### Extends
Employ caution when using the `@extend` operator. When used incorrectly it can bloat compiled CSS. Instead use classes that can be added to markup.

### Mixins
We try to adhere to the <abbr title="Don't Repeat Yourself">DRY</abbr> principles when writing our CSS and use mixins to prevent unnecessary code duplication. FES ships with a select few predefined mixins to help achieve common repetitive tasks which can be found in `source/scss/helpers/_mixins.scss`.

### Mobile First
Most of our web applications are built mobile first, in that we specify mobile styles as our base and then, using media queries, enhance the user experience for larger devices and screens.

The problem with doing this is that Internet Explorer 8 and earlier don’t support media queries and so ignore them and just renders the mobile styles. There is a way of solving this problem using JavaScript, but our preferred solution is to use Sass.

[The Guardian’s Sass MQ](https://github.com/sass-mq/sass-mq) library of mixins is used to create our various media queries and set a default static breakpoint for Internet Explorer 8. The mixins rasterise the breakpoints so browsers rely on the cascade itself.

## JavaScript
The majority of our Javascript should be written in external JavaScript files. Similar to our approach with CSS we promote the use of comments, our build tools will take care of stripping those out before our code hits the production server.

We take a modular approach to writing JavaScript to ensure our code is maintainable and easy to understand. A typical module structure looks something like this.

```javascript
var Module = (function () {

	var _privateMethod = function () {
		// private method
	};

	var publicMethod = function () {
  	_privateMethod();
	};

	return {
  	publicMethod: publicMethod
	};

})();
```

You can then call a particular method like so:

```javascript
Module.publicMethod();
```

We prefer feature detection over browser sniffing and utilise Modernizr to take care of it.

Functions and variables should be named logically and in camelCase. Sensible names that are long are preferred to short names that make no sense.

### jQuery vs Vanilla JavaScript

When using JavaScript to enhance a users experience on a website we prefer to use vanilla JavaScript where possible. jQuery isn't bundled with our Front-end Starter and therefore shouldn't be relied upon where vanilla JavaScript would suffice.

There are cases when jQuery is useful, but this will be decided on a per-project basis.

To find out vanilla JavaScript alternatives to common jQuery methods see: [http://youmightnotneedjquery.com/](http://youmightnotneedjquery.com/)


### Dependency Management
We rely on a number of JavaScript libraries to add functionality to our projects. Some of these have been written internally and others not. We use Bower to handle these dependencies which can be installed using `bower-installer`. If you've run the `npm run setup` command when cloning FES you should have all the default dependencies.
