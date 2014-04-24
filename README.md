Emberate [![Build Status][travis-img]][travis-url]
======================

[![NPM][npm-badge-img]][npm-badge-url]

This generator set is used to create an CJS `require` hierarchy for an EmberJS project structure.
The main use-case, is for use with Browserify.  
For example, given the following structure:


```
app
  |_controllers/
    |_user.js
    |_user/
      |_new.js
  |_views/
    |_user.js
  |_routes/
    |_user.js
    |_user/
      |_new.js
  |_...
```

This generator set can be used to generate a file, along the lines of `.index.js`, with the following contents:

```js
// Start template code: Generated from template
require('ember'); // get Ember global around for the templates
require('./.templates');

var routes = require('./config/routes');
var App = require('./config/application');

App.Router.map(routes);
// End template code

// Start generated code
App.UserController = require('./controllers/user');
App.UserNewController = require('./controllers/user/new');
App.UserView = require('./views/user');
App.UserRoute = require('./routes/user');
App.UserNewRoute = require('./routes/user/new');
// more ...
```

_Note: The `config` directory is required, with the application definition in `config/application.js` and the router definition in `config/routes.js`. This also requires a `.templates.js` file in the root directory (this is a precompiled templates file, see [ember-template-compiler][compiler])._

## Usage


__Install__:

```js
npm install emberate --save-dev
```


__Basic Example__:

This stream should be used with other streams:
```js
var esg = require('emberate');
var fs = require('fs');

esg('./client/app').pipe(fs.createReadStream('./tmp/.index.js'));
```

From here you can run browserify: `browserify ./client/.index.js --outfile ./dist/scripts/application.js`.


__Available Options__:

This stream takes three options `stream(path, appName, customTemplatePath)`.

* __path__ - The path to the root of you client directory.
* __appName__ - Name of your `Ember.Application` instance, e.g. `App.UserRoute`.
* __customTemplatePath__ - Path to custom template, the default template is [here][default-template].



### Via Grunt


```js
  // creates a file with requires for App.* for ember
  grunt.registerTask('pre-browserify', function () {
    var done = this.async();
    var emberStream = require('emberate');
    var fs = require('fs');
    var inStream = emberStream('./client');
    var outStream = fs.createWriteStream('./client/.index.js');

    outStream.on('finish', done);
    inStream.pipe(outStream);
  });
```

### Via Gulp

```js
// creates a file with requires for App.* for ember
gulp.task('pre-browserify', function () {
  var emberStream = require('emberate');
  var rename = require('gulp-rename');
  var source = require('vinyl-source-stream');
  var clientPath = './client/';
  
  emberStream(clientPath)
    .pipe(source(clientPath))
    .pipe(rename('.index.js'))
    .pipe(gulp.dest(clientPath));
});
```

## Acknowledgment

The concept and some of the code comes from Ryan Florence's [loom-ember][1].

[1]: https://github.com/rpflorence/loom-ember
[compiler]: https://github.com/toranb/ember-template-compiler
[travis-url]: https://travis-ci.org/AppGeo/emberate
[travis-img]: https://travis-ci.org/AppGeo/emberate.svg?branch=master
[npm-badge-img]: https://nodei.co/npm/emberate.svg?compact=true
[npm-badge-url]: https://nodei.co/npm/emberate/
[default-template]: https://github.com/AppGeo/emberate/blob/master/lib/defaultTemplate.hbs
