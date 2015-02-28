thoughtpad-plugin-google-analytics
=================================

[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A thoughtpad plugin that adds tracking scripts to pages. It will automatically add the google script to your script bundle for each page and provide additional tracking to let you know how long your users stay on the page.

## Usage

The plugin should be loaded using the [thoughtpad-plugin-manager](https://github.com/thoughtpad/thoughtpad-plugin-manager). Once this has been done then the plugin will respond to events. To use standalone:

```JavaScript
var man = require('thoughtpad-plugin-manager'),
    analytics = require('thoughtpad-plugin-google-analytics');

var thoughtpad = man.registerPlugins([analytics]);
thoughtpad.subscribe("javascript-precompile-complete", function (data) {
    console.log("Analytics code here"); 
});
yield thoughtpad.notify("javascript-precompile-request", {});
```

## Setup

You need a google analytics userId in order to associate your site with an analytics account. Specify this in the config file under the following object:

```JavaScript
module.exports = {
	analytics: {
		siteName: 'www.example.com', // As setup in Google Analytics
		userId: 'UA123123213' // As specified in Google Analytics
	}
}
```

## Tests

Ensure you have globally installed mocha - `npm -g install mocha`. Then you can run:

`mocha`

Alternatively if you are in a *NIX environment `npm test` will run the tests plus coverage data.

## License

The code is available under the [MIT license](http://deif.mit-license.org/).

[travis-image]: https://img.shields.io/travis/thoughtpad/thoughtpad-plugin-google-analytics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/thoughtpad/thoughtpad-plugin-google-analytics
[coveralls-image]: https://img.shields.io/coveralls/thoughtpad/thoughtpad-plugin-google-analytics/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/thoughtpad/thoughtpad-plugin-google-analytics?branch=master
