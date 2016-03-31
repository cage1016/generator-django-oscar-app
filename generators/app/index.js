'use strict';
var file = require('file');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var Promise = require('bluebird');
var camelcase = require('lodash.camelcase');
var capitalize = require('lodash.capitalize');
var replace = require('lodash.replace');
var kebabcase = require('lodash.kebabcase');
var trim = require('lodash.trim');
var jsesc = require('jsesc');
var exec = Promise.promisify(require('child_process').exec);
var gitConfig = require('git-config');

function jsonEscape(str) {
  return jsesc(str, {
    quotes: 'double',
  });
}

function getPackageName(appname) {
  var s = appname.split(' ');
  return s.length > 1 ? s[s.length - 1] : appname;
}

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.pkg = require('../../package.json');
  },

  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-django-oscar-app') + ' generator!'
    ));

    return Promise.all([
        exec('npm whoami').catch(function(e) {
          console.error('Error getting npm user name: run `npm login`');
          console.error(e);
        }),
      ])
      .then(function(result) {
        result = result ? result : {};
        this.username = trim(result[0]);
        return this._showPrompts();
      }.bind(this));
  },

  _showPrompts: function() {
    var config = gitConfig.sync();
    config.user = config.user ? config.user : {};
    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is the Github username/organization for this project?',
      default: this.username,
      store: true,
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the repository/project name? (ex: django-oscar-paypal)',
      default: kebabcase(this.appname),
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a short description for this project?',
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: config.user.name + ' <' + config.user.email + '>',
      store: true,
    }, {
      type: 'input',
      name: 'packagename',
      message: 'What is the name of this django-oscar packagename name?',
      default: getPackageName(this.appname),
    }, ];

    var self = this;
    return new Promise(function(resolve, reject) {
      self.prompt(prompts, function(props) {
        self.user = jsonEscape(props.user);
        self.repo = jsonEscape(props.repo);
        self.description = jsonEscape(props.description);
        self.author = jsonEscape(props.author);
        self.packagename = props.packagename;
        self.capitalizePackagename = capitalize(props.packagename);
        resolve();
      });
    });
  },

  writing: {
    app: function() {
      var src = this.sourceRoot();
      var self = this;
      file.walkSync(src, function(dirPath, dirs, files) {
        var relativeDir = path.relative(src, dirPath);
        files.forEach(function(filename) {
          var target, dest;
          target = path.join(relativeDir, filename);
          dest = replace(target, /package/ig, self.packagename);
          self.copy(target, dest);
        });
      });


    },
  },

  install: function() {
    // This.installDependencies();
  },
});
