var gulp    = require('gulp');
var gulpif = require('gulp-if');
var sass    = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var notify  = require('gulp-notify');
var cache = require('gulp-cached');
var config = require('../config').sass;
var option = require('../config').option;

gulp.task('sass', function() {
  // gulp.src([config.src])
  return sass(config.src,{
    base:'src',
    sourcemap: false,
    style : 'expanded',
  })
  .pipe(cache('sass'))
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  // .pipe(gulpif(config.minify === 'production', sass({
    // style : 'compressed',
    // sourcemap : false
  // })))
  .pipe(gulp.dest(config.dest))
  .pipe(gulpif(option.useWP === true, gulp.dest(config.destWP)))
  .pipe(browserSync.reload({stream: true}));
});
