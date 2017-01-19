var gulp = require('gulp');

// gulp.task('build', ['html','script','ts', 'sass', 'image', 'ejs','wp','clean']);
gulp.task('build', ['webpack', 'sass', 'pug','wp']);
