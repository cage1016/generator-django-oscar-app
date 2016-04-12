'usestrict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var mockery = require('mockery');

var getDefaultFilesForPackagePath = function (packagename, isPaymentPackage) {
  var baseFiles = [
    packagename + '/__init__.py',
    packagename + '/abstract_models.py',
    packagename + '/admin.py',
    packagename + '/config.py',
    packagename + '/dashboard/__init__.py',
    packagename + '/dashboard/app.py',
    packagename + '/dashboard/forms.py',
    packagename + '/dashboard/views.py',
    packagename + '/forms.py',
    packagename + '/models.py',
    packagename + '/templates/' + packagename + '/dashboard/' + packagename + '_list.html',
    packagename + '/tests.py',
    packagename + '/urls.py',
    packagename + '/version.py',
    packagename + '/views.py',
    '.gitignore',
    'makefile',
    'README.md',
    'requirements.sandbox.txt',
    'requirements.testing.txt',
    'run.sh',
    'runtests.py',
    'sandbox/__init__.py',
    'sandbox/fixtures/auth.json',
    'sandbox/fixtures/books.computers-in-fiction.csv',
    'sandbox/fixtures/books.essential.csv',
    'sandbox/fixtures/books.hacking.csv',
    'sandbox/fixtures/child_products.json',
    'sandbox/fixtures/images.tar.gz',
    'sandbox/fixtures/multi-stockrecord-product.json',
    'sandbox/fixtures/orders.json',
    'sandbox/manage.py',
    'sandbox/public/media/image_not_found.jpg',
    'sandbox/settings.py',
    'sandbox/urls.py',
    'setup.py',
    'tests/__init__.py',
    'tests/_site/__init__.py',
    'tests/config.py',
    'tests/conftest.py',
    'tests/functional/__init__.py',
    'tests/settings.py',
    'tests/unit/__init__.py',
  ];

  var isPaymentPackageFiles = [
    packagename + '/gateway.py',
    packagename + '/facade.py',
    packagename + '/templates/' + packagename + '/preview.html',
    'sandbox/apps/__init__.py',
    'sandbox/apps/app.py',
    'sandbox/apps/checkout/__init__.py',
    'sandbox/apps/checkout/app.py',
    'sandbox/apps/checkout/config.py',
    'sandbox/apps/checkout/models.py',
    'sandbox/apps/checkout/views.py',
    'sandbox/templates/checkout/payment_details.html',
  ];

  return isPaymentPackage ? baseFiles.concat(isPaymentPackageFiles) : baseFiles;
};

describe('generator-django-oscar-app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock(
      require.resolve('generator-license/app'),
      helpers.createDummyGenerator()
    );
  });

  after(function () {
    mockery.disable();
  });

  describe('general package', function(){
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          repo: 'django-oscar-hooks',
          user: 'cage1016',
          version: '0.1.0',
          keywords: 'Oscar,django,hooks',
          description: 'to be done',
          author: 'Kai-Chu Chung <cage.chung@gmail.com>',
          packagename: 'hooks',
          isPaymentPackage: false
        })
        .on('end', done);
    });

    it('creates hooks package files', function () {
      assert.file(getDefaultFilesForPackagePath('hooks', false));
    });

    it('generates prompts in every file', function () {
      assert.fileContent('setup.py', 'name=\'django-oscar-hooks\'');
      assert.fileContent('setup.py', 'url=\'https://github.com/cage1016/django-oscar-hooks.git\'');
      assert.fileContent('setup.py', 'author=\'Kai-Chu Chung <cage.chung@gmail.com>\'');
      assert.fileContent('setup.py', 'description=(\'to be done\')');
      assert.fileContent('setup.py', 'keywords=\'Oscar,django,hooks\'');
      assert.fileContent('hooks/version.py', '__version__ = \'0.1.0\'  # NOQA');
    });

    it('DONOT　generates payment package necessary file', function(){
      assert.noFile([
        'hooks/gateway.py',
        'hooks/facade.py',
        'hooks/templates/hooks/preview.html',
        'sandbox/apps/__init__.py',
        'sandbox/apps/app.py',
        'sandbox/apps/checkout/__init__.py',
        'sandbox/apps/checkout/app.py',
        'sandbox/apps/checkout/config.py',
        'sandbox/apps/checkout/models.py',
        'sandbox/apps/checkout/views.py',
        'sandbox/templates/checkout/payment_details.html',
      ]);
    });
  });

  describe('payment package', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          repo: 'django-oscar-hooks',
          user: 'cage1016',
          version: '0.1.0',
          keywords: 'Oscar,django,hooks',
          description: 'to be done',
          author: 'Kai-Chu Chung <cage.chung@gmail.com>',
          packagename: 'hooks',
          isPaymentPackage: true
        })
        .on('end', done);
    });

    it('creates hooks payment package files', function () {
      assert.file(getDefaultFilesForPackagePath('hooks', true));
    });

    it('generates prompts in every file', function () {
      assert.fileContent('sandbox/templates/checkout/payment_details.html', 'title="{% trans "Pay with Hooks" %}"');
      assert.fileContent('hooks/templates/hooks/preview.html', 'action="{% url \'hooks-place-order\' basket.id %}"');
    });

    it('generates payment package necessary file', function(){
      assert.file([
        'hooks/gateway.py',
        'hooks/facade.py',
        'hooks/templates/hooks/preview.html',
        'sandbox/apps/__init__.py',
        'sandbox/apps/app.py',
        'sandbox/apps/checkout/__init__.py',
        'sandbox/apps/checkout/app.py',
        'sandbox/apps/checkout/config.py',
        'sandbox/apps/checkout/models.py',
        'sandbox/apps/checkout/views.py',
        'sandbox/templates/checkout/payment_details.html',
      ]);
    });

    it('fill all README.md content', function(){
      assert.fileContent('README.md','install `django-oscar-hooks` using `pip`');
      assert.fileContent('README.md','pip install -U django-oscar-hooks');
      assert.fileContent('README.md','add `hooks` to INSTALLED_APPS');
      assert.fileContent('README.md','\'hooks\'');
      assert.fileContent('README.md','Kai-Chu Chung &lt;cage.chung@gmail.com&gt;');
      assert.fileContent('README.md','[travis-image]: https://travis-ci.org/cage1016/django-oscar-hooks.svg?branch=master');
      assert.fileContent('README.md','[travis-url]: https://travis-ci.org/cage1016/django-oscar-hooks');
      assert.fileContent('README.md','[coveralls-image]: https://coveralls.io/repos/cage1016/django-oscar-hooks/badge.svg');
      assert.fileContent('README.md','[coveralls-url]: https://coveralls.io/r/cage1016/django-oscar-hooks');
      assert.fileContent('README.md','[pypi-image]: https://img.shields.io/pypi/v/django-oscar-hooks.svg');
      assert.fileContent('README.md','[pypi-url]: https://pypi.python.org/pypi/django-oscar-hooks/');
    });
  });
});
