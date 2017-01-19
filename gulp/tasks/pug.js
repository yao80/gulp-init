// var fs = require('fs');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var cache = require('gulp-cached');
var notify  = require('gulp-notify');
var config = require('../config').pug;

gulp.task('pug', function () {
    var option = {
      pretty: true
    };
    gulp.src(config.src,{base:'src'})
    .pipe(cache('pug'))
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(pug(option))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
