var dest                    =   "./public/build";
var destImg                 =   "./public/img";
var destRoot                =   "./public/";
var src                     =   './resources';
var fileCSS                 =   'front.css';
var fileCSSMobile           =   'mobile.css';
var fileminCSS              =   'front.min.css';
var fileminCSSMobile        =   'mobile.min.css';
var fileJS                  =   'front.js';
var fileminJS               =   'front.min.js';
var fileJSMobile            =   'mobile.js';
var fileminJSMobile         =   'mobile.min.js';
var compatibilityDesktop    =   { browsers: ['last 2 versions','> 1%', 'IE 9' , 'Safari <= 8'] };
var compatibilityMobile     =   { browsers: ['last 2 versions','> 1%', 'iOS <= 7' , 'Android >= 4'] };

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
            './resources/js/_top/modernizr.js',
        ],
        dest: dest,
        file: 'top.js',
        filemin: 'top.min.js'
    }
    ,
    sass: {
        src: src + "/css/builder.{sass,scss}",
        srcWatch: src + "/css/**/*.{sass,scss}",
        dest: dest,
        file: fileCSS,
        filemin: fileminCSS,
        compability : compatibilityDesktop
    },
    sassMobile: {
        src: src + "/css/builder-mobile.{sass,scss}",
        srcWatch: src + "/css/**/*.{sass,scss}",
        dest: dest,
        file: fileCSSMobile,
        filemin: fileminCSSMobile,
        compability: compatibilityMobile
    },
    javascript: {
        src: 'resources/js/app.js',
        srcWatch : src + '/js/**/*.js',
        dest: dest,
        file: fileJS,
        filemin: fileminJS
    },
    minify: {
        dest: dest,
        srcCSS: dest + '/'+fileCSS,
        fileminCSS: fileminCSS,
        srcCSSMobile: dest + '/'+fileCSSMobile,
        fileminCSSMobile: fileminCSSMobile,
        srcWatchMobile: dest + '/'+fileCSSMobile,
        srcJS: dest + '/'+fileJS,
        srcJSMobile: dest + '/'+fileJSMobile,
        fileminJS: fileminJS,
        fileminJSMobile: fileminJSMobile
    },
    sprite: {
        src: src + '/sprite/*.png',
        destCSS: src + '/css/vendor',
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
    },
    svg: {
        src: src + "/svg/**.svg",
        dest: destRoot + "/svg/"
    },
    views: {
        srcWatch : './resources/views/**',
    }
};