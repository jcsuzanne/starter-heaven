// Generate sprite
//================
var gulp                    =   require('gulp');
var spritesmith             =   require('gulp.spritesmith');
var config                  =   require('../config').sprite;

gulp.task('sprite', function () {
    var spriteData = gulp.src(config.src)
    .pipe(spritesmith({
        imgName: config.imgName,
        cssName: config.cssName,
        algorithm:  config.algorithm,
        cssFormat: config.cssFormat,
        imgPath: config.imgPath
    }));
    spriteData.img.pipe(gulp.dest(config.destImg));
    spriteData.css.pipe(gulp.dest(config.destCSS));
});