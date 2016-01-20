var gulp                    =   require('gulp');
var php2html                =   require("gulp-php2html");
var rename                  =   require('gulp-rename');
var htmlreplace             =   require('gulp-html-replace');
var minifyHTML              =   require('gulp-minify-html');

gulp.task('html', function () {
    return gulp.src("index.php")
    .pipe(php2html())
    .pipe(rename('build.html'))
    .pipe(htmlreplace({
        'css': 'public/assets/build/front.min.css',
        'csstop': 'public/assets/build/top.min.css',
        'js': 'public/assets/build/front.min.js',
        'jstop': 'public/assets/build/top.min.js'
    }))
    .pipe(gulp.dest(""));
});

gulp.task('html-minify', function () {
    return gulp.src("index.php")
    .pipe(php2html())
    .pipe(rename('build.html'))
    .pipe(htmlreplace({
        'css': 'public/assets/build/front.min.css',
        'csstop': 'public/assets/build/top.min.css',
        'js': 'public/assets/build/front.min.js',
        'jstop': 'public/assets/build/top.min.js'
    }))
    .pipe(minifyHTML({ conditionals: true, spare:true }))
    .pipe(gulp.dest(""));
});
