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
var browserify              =   require('browserify');
var babelify                =   require('babelify');
var source                  =   require('vinyl-source-stream');
var config                  =   require('../config').javascript;

gulp.task('javascript', function() {
     return browserify( {entries: config.src, extensions: ['.js','.jsx'], debug: true })
        .transform('babelify', {presets: ['env']})
        .bundle()
        .pipe(source(config.file))
        .pipe(gulp.dest(config.dest))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(notify("JS is Ready!"))
        .pipe(livereload())
});