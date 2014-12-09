// Compiling css top
//==================
var gulp                    =   require('gulp');
var rename                  =   require('gulp-rename');
var concat                  =   require('gulp-concat');
var uglify                  =   require('gulp-uglify');
var config                  =   require('../config').jstop;

gulp.task('jstop', function () {
    gulp.src(config.src)
    .pipe(concat(config.file))
    .pipe(gulp.dest(config.dest))
    .pipe(rename(config.filemin))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    ;
});