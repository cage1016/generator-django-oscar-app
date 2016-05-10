# generator-django-oscar-app

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![NPM Downloads][downloads-image]][downloads-url]

> Quick build app for django-oscar

## Installation

First, install [Yeoman](http://yeoman.io) and generator-django-oscar-app using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-django-oscar-app
```

Then generate your new project:

```bash
yo django-oscar-app
```

## Getting started

![screenshot]

create django-oscar app via generator

```bash
$ yo django-oscar-app
```

create new virtualenv, we are using virtualenv + virtualenvwrapper here

```bash
$ mkvirtualenv django-oscar-hooks
New python executable in /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/python2.7
Also creating executable in /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/python
Please make sure you remove any previous custom paths from your /Users/{HOME}/.pydistutils.cfg file.
Installing setuptools, pip, wheel...done.
virtualenvwrapper.user_scripts creating /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/predeactivate
virtualenvwrapper.user_scripts creating /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/postdeactivate
virtualenvwrapper.user_scripts creating /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/preactivate
virtualenvwrapper.user_scripts creating /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/postactivate
virtualenvwrapper.user_scripts creating /Users/{HOME}/.virtualenvs/django-oscar-hooks/bin/get_env_details
(django-oscar-hooks)
```

install pip packages,  create database tables and load dummy data.

```bash
(django-oscar-hooks)$ make sandbox
```

run your django-oscar-hooks app

```bash
(django-oscar-hooks)$ sh run.sh
```

run test

```bash
(django-oscar-hooks)$ make test
./runtests.py
=============================================== test session starts ===============================================
platform darwin -- Python 2.7.10, pytest-2.8.5, py-1.4.31, pluggy-0.3.1
django settings: tests.settings (from environment variable)
rootdir: /Users/cage/Documents/yo-generators/123/django-oscar-licenses, inifile:
plugins: cov-2.2.0, django-2.9.1, xdist-1.13.1
gw0 [2] / gw1 [2] / gw2 [2] / gw3 [2] / gw4 [2] / gw5 [2] / gw6 [2] / gw7 [2]
scheduling tests via LoadScheduling
..
============================================ 2 passed in 2.51 seconds =============================================
```

visit [http://localhost:8000/](http://localhost:8000/)

Default Admin: for testing only
- account: **superuser@example.com**
- password: **superusercango**

build sphinx docs

```
(django-oscar-hooks)$ make build_docs

// html page with generated at docs/_build/html/
// pdf file with generated at docs/_build/pdf/
```

django-oscar-app yeoman generator will use `VL-Gothic-Regular.ttf` & `VL-PGothic-Regular.ttf` fonts for **rst2pdf** packages default. Please download [VLGothic-20091202.zip](http://jaist.dl.sourceforge.jp/vlgothic/44715/VLGothic-20091202.zip) and install it. If you want to customize pdf fonts as you needs. You need to make your own `.style` for **rst2pdf** and modify `conf.py`

__docs/conf.py__

copy and replace your need. ex: tw.style

```python
# L320
...
# A comma-separated list of custom stylesheets. Example:
# pdf_stylesheets = ['kerning','a4', 'custom']
pdf_stylesheets = ['kerning','a4', '<your-dot-style-file-name>']

# A list of folders to search for stylesheets. Example:
pdf_style_path = ['.', '_styles', 'docs']

# Create a compressed PDF
# Use True/False or 1/0
# Example: compressed=True
#pdf_compressed = False

# A colon-separated list of folders to search for fonts. Example:
# pdf_font_path = ['/Users/' + os.environ.get('USER') + '/Library/Fonts']
pdf_font_path = ['<custom-fonts-you-installed>']

# Language to be used for hyphenation support
# pdf_language = "zh_TW"
pdf_language = "<your-language>"

```

## Change Logs

0.4.1
- fixed sandbox TemplateDoesNotExist error 

0.4.0
- add `Sphinx` docs skeleton generated
  - html
  - pdf
- fixed `.gitignore` egg info pattern

0.3.0
- add `unit/dashboard` test auto generated
- modified `tests/_site/urls` to add package dashboard url

0.2.5
- fixed code generated test `tests/_site/urls.py` missing
- fixed `make sandbox` fail caused requirements modify @0.2.4

0.2.4
- fixed tests/config.py string quotation marks incomplete
- requirements.testing add mock, model-mommy, six packages
- requirements.sandbox remove django-oscar, django packages. add pycountry package version

0.2.3
- fixed sandbox i18n does not work

0.2.2
- auto create project folder
- add license generator

0.2.0
- add payment package type

## License

BSD-3-Clause © [Kai-Chu Chung](http://kaichu.io/)


[npm-image]: https://badge.fury.io/js/generator-django-oscar-app.svg
[npm-url]: https://npmjs.org/package/generator-django-oscar-app
[travis-image]: https://travis-ci.org/cage1016/generator-django-oscar-app.svg?branch=master
[travis-url]: https://travis-ci.org/cage1016/generator-django-oscar-app
[daviddm-image]: https://david-dm.org/cage1016/generator-django-oscar-app.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cage1016/generator-django-oscar-app
[coveralls-image]: https://coveralls.io/repos/cage1016/generator-django-oscar-app/badge.svg
[coveralls-url]: https://coveralls.io/r/cage1016/generator-django-oscar-app
[screenshot]: screenshot-3.gif
[downloads-image]: https://img.shields.io/npm/dm/generator-django-oscar-app.svg
[downloads-url]: https://npmjs.org/package/generator-django-oscar-app
