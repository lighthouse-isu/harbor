lighthouse-client
=================

[![Build Status](https://img.shields.io/travis/lighthouse/lighthouse-client.svg?style=flat)](https://travis-ci.org/lighthouse/lighthouse-client)

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

As part of our node dependencies, we have a Google Chrome launcher for karma. Upon running the unit tests (as below, and after `npm install`), karma will look for a Chrome install at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` - If you have Chromium or a different install location, please set `$CHROME_BIN` to that binary before running karma.

(This assuming you're running OS X. If not, try to run `karma start` and it should notify you of where it's looking for Chrome.)

* `npm install -g jasmine-node`
* `npm install -g karma-cli`
* (from root) `karma start`

Happy coding!
