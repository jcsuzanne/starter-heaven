// Compile JS
//===========
var gulp                    =   require('gulp');
var concat                  =   require('gulp-concat');
var sourcemaps              =   require('gulp-sourcemaps');
var rename                  =   require('gulp-rename');
var uglify                  =   require('gulp-uglify');
var notify                  =   require("gulp-notify");
var plumber                 =   require('gulp-plumber');
var livereload              =   require('gulp-livereload');
var config                  =   require('../config').javascript;

gulp.task('javascript', function() {
    gulp.src(config.srcMobile)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(concat(config.fileMobile))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(notify("JS Mobile is Ready!"))
    ;
    gulp.src(config.src)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(concat(config.file))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(notify("JS is Ready!"))
    .pipe(livereload())
    ;
});