var gulp = require('gulp');
var del = require('del');
// var browserSync = require('browser-sync');
var config = require('../config').copy;

gulp.task('image-del', function () {
  return del([config.dest + '/images']);
});

// 画像削除後にコピータスク実行
gulp.task('copy', ['image-del'], function() {
  return gulp.src(config.src,{base: 'src'})
  .pipe(gulp.dest(config.dest));
});
