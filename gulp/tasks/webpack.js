var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var webpack = require('gulp-webpack');
var config = require('../config').webpack;

gulp.task('webpack', function () {
    gulp.src(config.src)
      .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      }))
      .pipe(webpack( require('../webpack.config.js') ))
      .pipe(gulpif(config.minify === 'production', uglify()))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.reload({stream: true}));
});
