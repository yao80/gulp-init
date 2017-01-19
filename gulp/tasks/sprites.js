var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var spritesmith = require("gulp.spritesmith");
var config = require('../config').sprites;
var option = require('../config').option;

// function.getFolders
var getFolders = function (dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory(); 
    });
};

gulp.task('sprites', function () {
  var folders = getFolders(config.src + '/' + config.image + '/sprites/');
  
  folders.map(function (folder) {
  var spriteData = gulp.src('sprites/' + folder + '/*.png', {cwd: config.src + '/' + config.image})
    .pipe(plumber())
    .pipe(spritesmith({
        imgName: folder + '.png',
        imgPath:   config.rootPath + config.image + '/sprites/' + folder + '.png',
        cssName: '_' + folder + '.scss',
        cssFormat: 'scss',
        algorithm: 'top-down'
    }));
    
    spriteData.img.pipe(gulp.dest(config.dest))
    
    .pipe(gulpif(option.useWP === true, spriteData.img.pipe(gulp.dest(config.destWP))));
    spriteData.css.pipe(gulp.dest(config.src + '/' + config.scss));
    
  });
});
