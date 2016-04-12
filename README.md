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

crete new folder

```bash
$ mkdir django-oscar-hooks && cd django-oscar-hooks
```

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

visit http://localhost:8000/


Default Admin: for testing only
- account: **superuser@example.com**
- password: **superusercango**

## Change Logs

0.2.2
- auto create project folder
- add lincese generator 

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
