lighthouse-client
=================

[![Build Status](https://img.shields.io/travis/lighthouse/lighthouse-client.svg?style=flat)](https://travis-ci.org/lighthouse/lighthouse-client)
[![License](https://img.shields.io/badge/license-apache2-blue.svg?style=flat)](/LICENSE)

UI assets and code for Lighthouse.

## Requirements

* [node](http://nodejs.org/)
* [lighthouse](https://github.com/lighthouse/lighthouse)

## Development

### Setup

* `npm install -g bower`
* `bower install`
* `npm install -g gulp`
* `npm install`

### Doing things

* `gulp build` default build (non-minified source) to `../lighthouse/static`
* `gulp watch` optional, rebuilds on source changes
* `gulp clean` removes built assets from the server static dir (see Gulpfile.js)

Options:

* `--prod` build minfied source to `../lighthouse/static`
* `--gopath` build to `$GOPATH/src/github.com/lighthouse/lighthouse/static/`

These two flags can be used in conjunction with each other and with any command above. Note that using `--gopath` overrides the default target directory. (i.e. source isn't moved to both locations)

### Running unit tests (work in progress)

* `npm install -g karma-cli`
* `npm test`

Happy coding!

## License

[Apache v2.0](http://www.apache.org/licenses/LICENSE-2.0)
