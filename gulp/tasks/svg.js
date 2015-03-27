// Minify SVG
//===========

var gulp                    =   require('gulp');
var svgmin                  =   require('gulp-svgmin');
var config                  =   require('../config').svg;


gulp.task('svg', function () {
    return gulp.src(config.src)
    .pipe(svgmin())
    .pipe(gulp.dest(config.dest));
});