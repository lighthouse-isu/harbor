lighthouse-client
=================

UI assets and code for Lighthouse.

## Requirements

* [node](http://nodejs.org/)
* [lighthouse](https://github.com/lighthouse/lighthouse)

## Development

Then, install our node dependencies, do a dev build, and optionally start the js watcher (which will automatically do a dev build when files change).

* `npm install -g bower`
* `bower install`
* `npm install -g gulp`
* `npm install`
* `gulp dev build`
* `gulp watch` (optional)
* `gulp clean` removes built assets from the server static dir (see Gulpfile.js)
* `gulp prod build` will do the same as `dev`, but with minified js
* fire up a webserver from `lighthouse/static` and navigate to `localhost` at the port specified by the server

New angular modules should follow the same pattern as `instances`. Generally speaking, each major piece of functionality should be pulled out into it's own module and given a unique name to link into the root module. (see `app/js/app.js`)

### Running unit tests

* `npm install -g jasmine-node`
* `npm install -g karma-cli`
* (from root) `karma start`

Happy coding!
