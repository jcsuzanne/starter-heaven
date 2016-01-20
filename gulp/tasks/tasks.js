var gulp = require('gulp');

gulp.task('start',          ['csstop', 'jstop' , 'minify']);
gulp.task('default',        ['csstop', 'jstop' , 'sprite', 'sass', 'sassMobile' , 'javascript']);
gulp.task('css',            ['sass', 'sassMobile' , 'minify']);
gulp.task('build',          ['csstop', 'jstop' , 'sprite', 'sass', 'sassMobile' , 'javascript', 'minify']);
gulp.task('export',         ['html', 'build']);
gulp.task('export-minify',  ['html-minify', 'build']);