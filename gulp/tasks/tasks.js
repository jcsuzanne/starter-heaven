var gulp = require('gulp');

gulp.task('start',          ['jstop' , 'minify']);
gulp.task('default',        ['jstop' , 'sprite', 'sass', 'sassMobile' , 'javascript']);
gulp.task('css',            ['sass', 'sassMobile' , 'minify']);
gulp.task('build',          ['jstop' , 'sprite', 'sass', 'sassMobile' , 'javascript', 'minify']);
gulp.task('export',         ['html', 'build']);
gulp.task('export-minify',  ['html-minify', 'build']);