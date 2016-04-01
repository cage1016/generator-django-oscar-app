var file = require('file');
var path = require('path');
var glob = require('glob');
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

    var self=this;
    return Promise.all([
        exec('npm whoami').catch(function(e) {
          self.log(yosay(
            chalk.red('Error getting npm user name: run `npm login`')
          ));
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
      name: 'version',
      message: 'Package initial version',
      default: '0.1.0',
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Package keywords (space separated keywords):',
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
        self.version = jsonEscape(props.version);
        self.description = jsonEscape(props.description);
        self.author = jsonEscape(props.author);
        self.packagename = props.packagename;
        self.keywords = jsonEscape(props.keywords);
        self.capitalizePackagename = capitalize(props.packagename);
        resolve();
      });
    });
  },

  writing: {
    app: function() {
      var root = this.sourceRoot();
      var files = glob.sync('**', {
        dot: true,
        nodir: true,
        cwd: root,
      });
      var dest, src;
      var self = this;
      files.forEach(function(f) {
        src = path.join(root, f);
        dest = path.join('', replace(f, /_package/ig, self.packagename));
        self.copy(src, dest);
      });
    },
  },

});
