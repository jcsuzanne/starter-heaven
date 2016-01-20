var gulp  = require('gulp');
var livereload = require('gulp-livereload');
var config= require('../config');

gulp.task('watch', function() {
    var server = livereload;
    server.listen();
    gulp.watch(config.javascript.srcWatch, ['javascript']);
    gulp.watch(config.sass.srcWatch, ['sass']);
    gulp.watch(config.sassMobile.srcWatch, ['sassMobile']);
    gulp.watch(config.views.srcWatch).on('change', function(file) {
          server.changed(file.path);
      });

});