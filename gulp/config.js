var dest                    =   "./public/assets/build";
var destImg                 =   "./public/assets/img";
var src                     =   './src';
var fileCSS                 =   'front.css';
var fileminCSS              =   'front.min.css';
var fileJS                  =   'front.js';
var fileminJS               =   'front.min.js';

module.exports = {
    csstop: {
        src: src+'/css/*.css',
        dest: dest,
        file: 'top.css',
        filemin: 'top.min.css'
    }
    ,
    jstop: {
        src: [
            './node_modules/modernizr/src/modernizr.custom.js',
            './node_modules/detectizr/dist/detectizr.min.js'
        ],
        dest: dest,
        file: 'top.js',
        filemin: 'top.min.js'
    }
    ,
    sass: {
        src: src + "/precss/builder.{sass,scss}",
        srcWatch: src + "/precss/*.{sass,scss}",
        dest: dest,
        file: fileCSS,
        filemin: fileminCSS
    },
    javascript: {
        src: [
            'node_modules/json2/json2.js',
            'node_modules/jquery/jquery.min.js',
            'node_modules/jquery-upgrade/src/jquery.enhance',
            'node_modules/jquery.mousewheel/jquery.mousewheel.js',
            'node_modules/jquery-smartresize/jquery.throttledresize.js',
            'node_modules/history.js/history.js',
            'node_modules/kickstarter/src/kickstarter.js',
            'node_modules/gsap/src/minified/TweenMax.min.js',
            'node_modules/raf/src/raf.js',
        ],
        srcWatch : src + '/js/*.js',
        dest: dest,
        file: fileJS,
        filemin: fileminJS
    },
    minify: {
        dest: dest,
        srcCSS: dest + '/'+fileCSS,
        fileminCSS: fileminCSS,
        srcJS: dest + '/'+fileJS,
        fileminJS: fileminJS
    },
    sprite: {
        src: src + '/sprite/*.png',
        destCSS: src + '/precss',
        destImg: destImg + '/common/',
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        algorithm:  'left-right',
        cssFormat: 'scss',
        imgPath:    '../img/common/sprite.png'
    },
    images: {
        src: src + "/images/**",
        dest: dest + "/images"
    }
};