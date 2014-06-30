// this file is auto-generated, do not edit
var Ember = require('ember'); // get Ember global around for the templates

var App = require('./app');
App.Router = require('./router');


Ember.TEMPLATES['application'] = require('./pods/application/template.hbs');
Ember.TEMPLATES['sidebar'] = require('./templates/sidebar.hbs');
Ember.TEMPLATES['user/index'] = require('./pods/user/index/template.hbs');
App.TestInitializer = require('./initializers/test');
App.TestMixin = require('./mixins/test');
App.ObjectTransform = require('./transforms/object');
App.UserSerializer = require('./serializers/user');
App.UserAdapter = require('./adapters/user');
App.UserModel = require('./models/user');
App.XPlayerComponent = require('./components/x-player');
App.ApplicationController = require('./pods/application/controller');
App.UserIndexController = require('./pods/user/index/controller');
App.ApplicationRoute = require('./pods/application/route');
App.ApplicationView = require('./pods/application/view');

module.exports = App;
