"use strict";

// CONFIG
const gulp = require("gulp");
const svgmin = require('gulp-svgmin');
const htmlmin = require('gulp-htmlmin');
const dest = {
    svg :"./public/svg/"
};

// SVG
gulp.task('svg', function () {
    return gulp.src('./resources/svg/**.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(dest.svg));
});

// COMPRESS
gulp.task('compress', function() {
    var opts = {
        collapseWhitespace:    true,
        collapseInlineTagWhitespace: true,
        removeAttributeQuotes: true,
        removeComments:        true,
        minifyJS:              true,
    };

    return gulp.src('./storage/framework/views/*')
               .pipe(htmlmin(opts))
               .pipe(gulp.dest('./storage/framework/views/'));
});