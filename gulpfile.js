"use strict";

// CONFIG
const browserify = require("browserify"),
    buffer       = require("vinyl-buffer"),
    gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    path         = require("path"),
    plumber      = require('gulp-plumber'),
    source       = require("vinyl-source-stream"),
    util         = require("gulp-util"),
    watchify     = require("watchify"),
    autoprefixer = require("gulp-autoprefixer"),
    rename       = require('gulp-rename'),
    compatibility = { browsers: ['last 2 versions','> 1%', 'iOS <= 7' , 'Android >= 4'] },
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    svgmin = require('gulp-svgmin'),
    notify =   require("gulp-notify"),

    src = {
        css:    "./resources/css/builder.scss",
        js:     ["./resources/js/app.js"]
    },
    dest = {
        css:    "./public/build/",
        js:     "./public/build/",
        svg:    "./public/svg/"
    };


// JAVASCRIPT
let bundlers;
function bundles(profile) {
    let start = new Date().getTime();

    if (bundlers === undefined) {
        let opts = {},
            presets = [];

        if (profile == "prod") {
            opts.debug = false;
            presets.push("env");
        } else {
            opts.debug = true;
        }

        bundlers = {};

        for (let index in src.js) {
            opts.standalone = "$";

            switch (profile) {
                case "watch":
                    bundlers[src.js[index]] = watchify(browserify(src.js[index], opts)).transform("babelify", {presets: presets});
                    break;

                case "dev":
                    bundlers[src.js[index]] = browserify(src.js[index], opts).transform("babelify", {presets: presets});
                    break;

                case "prod":
                    bundlers[src.js[index]] = browserify(src.js[index], opts)
                                .transform("babelify", {presets: presets})
                                .transform({
                                    global: true
                                }, "uglifyify");
                    break;
            }
        }
    }

    for (let file in bundlers) {
        bundle(file);
    }
}
function bundle(file) {
    let start = new Date().getTime(),
        _ = bundlers[file]
            .bundle()
            .on("error", util.log.bind(util, "Browserify Error"))
            // .pipe(source(`${path.parse(file).name}.js`))
            .pipe(source(`front.js`))
            .pipe(buffer())
            .pipe(gulp.dest(dest.js))
            .pipe(notify("JS is Ready!"))
            .pipe(livereload()),
        time = new Date().getTime() - start;

    util.log("[browserify] rebundle took ", util.colors.cyan(`${time} ms`), util.colors.grey(`(${file})`));

    return _;
}
gulp.task("js:dev", bundles.bind(null, "dev"));
// gulp.task("js:prod", bundles.bind(null, "prod"));
gulp.task('js:prod', function() {
    gulp.src('./build/front.js')
    .pipe(rename('front.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest.js))
    .pipe(notify("Minify JS Done"))
});

// CSS
gulp.task("css:dev", function() {
    return gulp.src(src.css)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(compatibility))
        .pipe(rename('front.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest.css))
        .pipe(notify("CSS is Ready!"))
        .pipe(livereload());
});
gulp.task("css:prod", function() {
    return gulp.src(src.css)
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(autoprefixer(compatibility))
        .pipe(rename('front.min.css'))
        .pipe(gulp.dest(dest.css))
        .pipe(notify("Minify CSS Done"))
});

// WATCH
gulp.task("watch", function () {
    var server = livereload;
    server.listen();
    bundles("watch");

    gulp.watch('./resources/css/**/*.{sass,scss}', ["css:dev"]).on("change", function(event) {
        console.log(`File ${event.path} has been ${event.type}`);
        gulp.task("css:watch", ["css:dev"]);
    });

    gulp.watch('./resources/views/**').on('change', function(event) {
        console.log(`File ${event.path} has been ${event.type}`);
        server.changed(event.path);
    });

    for (let file in bundlers) {
        bundlers[file].on("update", bundle.bind(null, file));
    }
});

// SVG
gulp.task('svg', function () {
    return gulp.src('./resources/svg/**.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(dest.svg));
});

// GLOBAL TASKS
gulp.task("dev", ["js:dev", "css:dev"]);
gulp.task("prod", ["js:prod", "css:prod"]);
gulp.task("default", ["dev"]);
gulp.task("watching", ["watch", "dev"]);