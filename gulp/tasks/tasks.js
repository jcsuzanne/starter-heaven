var gulp = require('gulp');

gulp.task('start',          ['csstop', 'jstop' , 'minify']);
gulp.task('default',        ['csstop', 'jstop' , 'sprite', 'sass', 'javascript']);
gulp.task('build',          ['csstop', 'jstop' , 'sprite', 'sass', 'javascript', 'minify']);