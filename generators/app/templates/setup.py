#!/usr/bin/env python
from setuptools import setup, find_packages

from <%= packagename %> import __version__

setup(
    name='<%= repo %>',
    version=__version__,
    url='https://github.com/<%= user %>/<%= repo %>.git',
    author='<%- author %>',
    description=('<%- description %>'),
    long_description=open('README.md').read(),
    keywords='<%= keywords %>',
    license=open('LICENSE').read(),
    platforms=['Mac'],
    packages=find_packages(exclude=['sandbox*', 'tests*']),
    include_package_data=True,
    install_requires=[
    ],
    extras_require={
        'oscar': ["django-oscar>=1.1"]
    },
    # See http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        'Development Status :: 1 - Dev',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: Unix',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Topic :: Other/Nonlisted Topic'],
)
