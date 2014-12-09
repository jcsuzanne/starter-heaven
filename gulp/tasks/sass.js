// Compile Sass and build CSS
//===========================
var gulp                    =   require('gulp');
var sass                    =   require('gulp-sass');
var minifyCSS               =   require('gulp-minify-css');
var sourcemaps              =   require('gulp-sourcemaps');
var rename                  =   require('gulp-rename');
var notify                  =   require("gulp-notify");
var plumber                 =   require('gulp-plumber');
var config                  =   require('../config').sass;

gulp.task('sass', function() {
    gulp.src(config.src)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(rename(config.file))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    // .pipe(minifyCSS({keepBreaks:false}))
    // .pipe(rename(config.filemin))
    // .pipe(gulp.dest(config.dest))
    .pipe(notify("CSS is Ready!"))
    ;
});