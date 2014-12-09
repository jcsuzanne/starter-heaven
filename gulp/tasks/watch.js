var gulp  = require('gulp');
var config= require('../config');

gulp.task('watch', function() {
    gulp.watch(config.javascript.srcWatch, ['javascript']);
    gulp.watch(config.sass.srcWatch, ['sass']);
});