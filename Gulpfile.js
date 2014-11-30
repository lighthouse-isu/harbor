//
// Build
//
var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    mainBower = require('main-bower-files');
    rimraf = require('rimraf'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify');

var watch = [
    './app/js/*.js',
    './app/*.html',
    './app/**/*.html'
];

// front-end assets handled by Bower
var bower_base = './bower_components/';

// lighthouse and lighthouse-client live at the same filesystem level
var staticRoot = '../lighthouse/static/';
var appRoot = './app/js/app.js';
var isProd = false;

// TL;DR Default task
gulp.task('default', ['prod', 'build']);

//
// Tasks
//
// sets up development build context
gulp.task('dev', function () {
    isProd = false;
});

// sets up production build context
gulp.task('prod', function () {
    isProd = true;
});

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
});

// View task for html assets
gulp.task('views', function () {
    gulp.src('./app/*.html')
    .pipe(gulp.dest(staticRoot));
});

// Watch for source updates, will use dev build
gulp.task('watch', ['dev'], function() {
    gulp.watch(watch, ['browserify', 'views']);
});

// Clean build artifacts
gulp.task('clean', function () {
    rimraf(staticRoot, function (er) {
        if (er) {
            console.log(er);
        }
    });

    rimraf(staticRoot, function (er) {
        if (er) {
            console.log(er);
        }
    });
});
