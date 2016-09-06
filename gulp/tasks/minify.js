// Minify JS and CSS
//==================
var gulp                    =   require('gulp');
var minifyCSS               =   require('gulp-clean-css');
var uglify                  =   require('gulp-uglify');
var rename                  =   require('gulp-rename');
var notify                  =   require("gulp-notify");
var config                  =   require('../config').minify;

gulp.task('minify', function() {
    gulp.src(config.srcCSS)
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(rename(config.fileminCSS))
    .pipe(gulp.dest(config.dest))
    .pipe(notify("Minify is Done!"))
    ;
    gulp.src(config.srcCSSMobile)
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(rename(config.fileminCSSMobile))
    .pipe(gulp.dest(config.dest))
    .pipe(notify("Minify Mobile is Done!"))
    ;
    gulp.src(config.srcJS)
    .pipe(rename(config.fileminJS))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    ;
    gulp.src(config.srcJSMobile)
    .pipe(rename(config.fileminJSMobile))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    ;
});