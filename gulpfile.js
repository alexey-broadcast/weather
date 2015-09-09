"use strict";

var gulp            = require('gulp');
var connect         = require('gulp-connect');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var minifyCss       = require('gulp-minify-css');


// ============== CONFIG ==============
var cfg = {
	src: {},
	build: {}
};

cfg.src.dir = './src/';
cfg.src.scssPattern = cfg.src.dir + 'scss/*.scss';
cfg.src.scssDir = cfg.src.dir + 'scss/';
cfg.src.htmlPattern = cfg.src.dir + '*.html';

cfg.build.dir = './build/';
cfg.build.cssDir = cfg.build.dir + 'css/';

// ============== MAIN ==============


//connect
gulp.task('connect', function () {
    connect.server({
        root: cfg.build.dir,
        livereload: true
    });
});


// sass
gulp.task('sass', function () {
    console.log('gulp: sass');
    gulp.src(cfg.src.scssPattern)
        .pipe(sass({
            includePaths: [cfg.src.scssDir]
        }))
        .pipe(autoprefixer('last 15 versions'))
        //.pipe(minifyCss())
        .pipe(gulp.dest(cfg.build.cssDir))
        .pipe(connect.reload());
});


// html
gulp.task('html', function () {
    console.log('gulp: html');
    gulp.src(cfg.src.htmlPattern)
        .pipe(gulp.dest(cfg.build.dir))
        .pipe(connect.reload());
});


// watch
gulp.task('watch', function () {
    gulp.watch(cfg.src.scssPattern, ['sass']);
    gulp.watch(cfg.src.htmlPattern, ['html']);
});


// default
gulp.task('default', ['connect', 'sass', 'html', 'watch']);