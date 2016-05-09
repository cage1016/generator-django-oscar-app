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
var askName = require('inquirer-npm-name');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var snakeCase = require('snake-case');

function jsonEscape(str) {
  return jsesc(str, {
    quotes: 'double',
  });
}

function getPackageName(repo) {
  return _.last(repo.split('-'));
}

function getAuthorName(author) {
  if (_.indexOf(author, '<') > 0) {
    var buf = _.split(author, '<');
    if (buf.length) {
      return _.trim(buf[0]);
    } else {
      return author;
    }
  } else {
    return author
  }
}

function makeDjangoOscarPackageName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('django-oscar-') === 0 ? name : 'django-oscar-' + name;
  return name;
}

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.pkg = require('../../package.json');
    this.props = {};
  },

  prompting: {
    askForModuleName: function () {
      var done = this.async();

      this.log(yosay(
        'Welcome to the ' + chalk.red('generator-django-oscar-app') + ' generator!'
      ));

      askName({
        name: 'repo',
        message: 'What is your django repository/project name',
        default: makeDjangoOscarPackageName(path.basename(process.cwd())),
        filter: makeDjangoOscarPackageName,
        validate: function (str) {
          return str.length > 0;
        }
      }, this, function (repo) {
        this.props.repo = repo;

        if (path.basename(this.destinationPath()) !== this.props.repo) {
          this.log(
            'Your django oscar app must be inside a folder named ' + chalk.green(this.props.repo) + '\n' +
            'I\'ll automatically create this folder.'
          );
          mkdirp(this.props.repo);
          this.destinationRoot(this.destinationPath(this.props.repo));
        }

        done();
      }.bind(this));
    },

    askFor: function(){
      var done = this.async();
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
        name: 'version',
        message: 'Package initial version',
        default: '0.1.0',
      }, {
        type: 'input',
        name: 'keywords',
        message: 'Package keywords (comma split keywords):',
        default: 'Oscar,django'
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
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        store: true
      }, {
        type: 'input',
        name: 'packagename',
        message: 'What is the name of this django-oscar packagename name?',
        default: getPackageName(this.props.repo),
      }, {
        type: 'Boolean',
        name: 'isPaymentPackage',
        message: 'Will package integrate with any payment?',
        default: false
      }];

      var self=this;
      this.prompt(prompts, function(props) {
        self.user = jsonEscape(props.user);
        self.repo = jsonEscape(self.props.repo);
        self.snakeCaseRepo = snakeCase(self.props.repo);
        self.version = jsonEscape(props.version);
        self.description = jsonEscape(props.description);
        self.author = jsonEscape(props.author);
        self.authorUrl = jsonEscape(props.authorUrl);
        self.authorName = getAuthorName(props.author);
        self.packagename = props.packagename;
        self.isPaymentPackage = props.isPaymentPackage;
        self.keywords = jsonEscape(props.keywords);
        self.capitalizePackagename = capitalize(props.packagename);
        done();
      });
    }
  },

  default: function () {
    this.composeWith('license', {
      options: {
        name: this.user.name,
        email: this.user.email,
        website: this.authorUrl
      }
    }, {
      local: require.resolve('generator-license/app')
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
      var isPaymentPackageExtraFiles = [
        '_package/gateway.py',
        '_package/facade.py',
        '_package/templates/_package/preview.html',
        'sandbox/apps/__init__.py',
        'sandbox/apps/app.py',
        'sandbox/apps/checkout/__init__.py',
        'sandbox/apps/checkout/app.py',
        'sandbox/apps/checkout/config.py',
        'sandbox/apps/checkout/models.py',
        'sandbox/apps/checkout/views.py',
        'sandbox/templates/checkout/payment_details.html',
      ];
      var paymentFilter = function(f){
        return self.isPaymentPackage ? true : isPaymentPackageExtraFiles.indexOf(f) === -1;
      };
      files.filter(paymentFilter).forEach(function(f) {
        src = path.join(root, f);
        dest = path.join('', replace(f, /_package/ig, self.packagename));
        self.copy(src, dest);
      });
    },
    docsStaticFolder: function(){
      this.mkdir('docs/_static');
    }
  },

  end: {
    git: function() {
      var repo = 'https://github.com/' + this.user + '/' + this.repo + '.git';
      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repo]);
      this.spawnCommandSync('git', ['add', '--all']);
      this.spawnCommandSync('git', ['commit', '-m', '"initial commit from django-oscar-app generator"']);
      this.log(chalk.green('\n  git init done.'));
    }
  }

});
