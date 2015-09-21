var gulp  = require('gulp');
var livereload = require('gulp-livereload');
var config= require('../config');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(config.javascript.srcWatch, ['javascript']);
    gulp.watch(config.sass.srcWatch, ['sass']);
    gulp.watch(config.sassMobile.srcWatch, ['sassMobile']);
});