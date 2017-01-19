var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config').bs;
var option = require('../config').option;
 
// Static server
gulp.task('browser-sync', function() {
  if(option.useWP === true){
    browserSync({
      proxy: config.proxy
    });
  } else {
    browserSync({
      server: {
        baseDir: config.baseDir
      }
    });
  }
});
