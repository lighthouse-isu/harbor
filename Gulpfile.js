/*
 *  Copyright 2015 Caleb Brose, Chris Fogerty, Rob Sheehy, Zach Taylor, Nick Miller
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

//
// Build
//
var argv = require('yargs').argv,
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    mainBower = require('main-bower-files'),
    rimraf = require('rimraf'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify');

//
// Build Context
//

var watch = [
    './app/js/*.js',
    './app/*.html',
    './app/**/*.html'
];

// front-end assets handled by Bower
var bower_base = './bower_components/';

// build to lighthouse repo in gopath
var staticRoot = (function (env) {
    if (argv.gopath) {
        if (env.GOPATH) {
            return env.GOPATH + '/src/github.com/lighthouse/lighthouse/static/';
        }
        else {
            console.log('ERROR: $GOPATH not set - building to ../lighthouse/static/');
        }
    }

    return '../lighthouse/static/';
})(process.env);

var appRoot = './app/js/app.js';
var isProd = argv.prod ? true : false;

//
// Tasks
//

// TL;DR Default task
gulp.task('default', ['build']);

// Build app and assets
gulp.task('build', ['jshint', 'browserify', 'views', 'vendor']);

// JSHint
gulp.task('jshint', function () {
    gulp.src('./app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Browserify task for js assets
// -- This will package our app into a single file for distribution
gulp.task('browserify', function() {
    browserify(appRoot, {
        debug: !isProd,
        // modules with no require() deps
        noparse: ['lodash'],
        transform: ['partialify'],
    })
    .bundle()
    .pipe(source('app.js'))
    // minify source, skip on dev build
    .pipe(isProd ? buffer() : gutil.noop())
    .pipe(isProd ? uglify() : gutil.noop())
    .pipe(gulp.dest(staticRoot + 'js/'));
});

// add vendor assets from Bower
gulp.task('vendor', function() {
    gulp.src(mainBower(), { base: bower_base })
        .pipe(gulp.dest(staticRoot + 'vendor/'));

    gulp.src('./node_modules/flux-angular/release/flux-angular.min.js')
        .pipe(gulp.dest(staticRoot + 'vendor/'));
    gulp.src('./node_modules/oboe/dist/oboe-browser.min.js')
        .pipe(gulp.dest(staticRoot + 'vendor/'));
});

// View task for html assets
gulp.task('views', function () {
    gulp.src('./app/*.html')
        .pipe(gulp.dest(staticRoot));
});

// Watch for source updates
gulp.task('watch', function() {
    gulp.watch(watch, ['browserify', 'views']);
});

// Clean build artifacts
gulp.task('clean', function () {
    rimraf(staticRoot, function (er) {
        if (er) {
            console.log(er);
        }
    });
});
