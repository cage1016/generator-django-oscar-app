# <%= repo %>

[![Build Status][travis-image]][travis-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![PyPI status][pypi-image]][pypi-url]

> <%= description %>

## Installation

install `<%= repo %>` using `pip`

```sh
pip install -U <%= repo %>
```

add `<%= packagename %>` to INSTALLED_APPS

__settings.py__

```python
# ...

INSTALLED_APPS =[
  ...
  '<%= packagename %>'
  ]

# ...
```

## [License](LICENSE)

<%= author %>

[travis-image]: https://travis-ci.org/<%= user %>/<%= repo %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= user %>/<%= repo %>
[coveralls-image]: https://coveralls.io/repos/<%= user %>/<%= repo %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= user %>/<%= repo %>
[pypi-image]: https://img.shields.io/pypi/v/<%= repo %>.svg
[pypi-url]: https://pypi.python.org/pypi/<%= repo %>/
