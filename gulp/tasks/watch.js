var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config').watch;

gulp.task('watch', function () {
    // js
    watch(config.js, function () {
        gulp.start(['webpack']);
    });

    // sass
    watch(config.sass, function () {
        gulp.start(['sass']);
    });

    // sprites
    watch(config.sprites, function() {
        gulp.start(['sprites']);
    });

    // pug
    watch(config.pug,function(){
        gulp.start(['pug']);
    });

    // wp
    watch(config.wp,function(){
        gulp.start(['wp']);
    });
    
});
