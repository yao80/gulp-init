var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var notify  = require('gulp-notify');
var config = require('../config').wp;

gulp.task('wp', function () {
    gulp.src(config.src)
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(browserSync.reload({stream: true}));
});
