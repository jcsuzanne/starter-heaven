// Compile Sass and build CSS
//===========================
var gulp                    =   require('gulp');
var sass                    =   require('gulp-sass');
var sourcemaps              =   require('gulp-sourcemaps');
var rename                  =   require('gulp-rename');
var notify                  =   require("gulp-notify");
var plumber                 =   require('gulp-plumber');
var autoprefixer            =   require("gulp-autoprefixer")
var livereload              =   require('gulp-livereload');
var config                  =   require('../config').sass;
var configMobile            =   require('../config').sassMobile;
var configAP                =   require('../config').configAP;



gulp.task('sass', function() {
    gulp.src(config.src)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(config.compability))
    .pipe(rename(config.file))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(notify("CSS is Ready!"))
    .pipe(livereload())
    ;
});

gulp.task('sassMobile', function() {
    gulp.src(configMobile.src)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(configMobile.compability))
    .pipe(rename(configMobile.file))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(configMobile.dest))
    .pipe(notify("CSS is Ready!"))
    .pipe(livereload())
    ;
});