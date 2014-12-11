// Compiling css top
//==================
var gulp                    =   require('gulp');
var rename                  =   require('gulp-rename');
var minifyCSS               =   require('gulp-minify-css');
var concatCss               =   require('gulp-concat-css');
var notify                  =   require("gulp-notify");
var config                  =   require('../config').csstop;

gulp.task('csstop', function () {
    gulp.src(config.src)
    .pipe(concatCss(config.file))
    .pipe(gulp.dest(config.dest))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(rename(config.filemin))
    .pipe(gulp.dest(config.dest))
    .pipe(notify("CSSTop is Done!"))
    ;
});