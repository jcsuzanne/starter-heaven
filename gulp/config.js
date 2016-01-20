var dest                    =   "./public/assets/build";
var destImg                 =   "./public/assets/img";
var destRoot                =   "./public/";
var src                     =   './src';
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
        srcWatch: src + "/precss/**/*.{sass,scss}",
        dest: dest,
        file: fileCSS,
        filemin: fileminCSS,
        compability : compatibilityDesktop
    },
    sassMobile: {
        src: src + "/precss/builder-mobile.{sass,scss}",
        srcWatch: src + "/precss/**/*.{sass,scss}",
        dest: dest,
        file: fileCSSMobile,
        filemin: fileminCSSMobile,
        compability: compatibilityMobile
    },
    javascript: {
        src: [
            'node_modules/json2/json2.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery-enhance/src/jquery.enhance.js',
            'node_modules/jquery-mousewheel/jquery.mousewheel.js',
            'node_modules/jquery-smartresize/jquery.throttledresize.js',
            // 'node_modules/historyjs/scripts/bundled/html5/jquery.history.js',
            'node_modules/kickstarter/src/kickstarter.js',
            'node_modules/gsap/src/minified/TweenMax.min.js',
            'node_modules/raf/src/raf.js',
            'node_modules/js-toolbox/src/toolbox.js',
            'src/js/class/transition.js',
            'src/js/base/core.js',
            'src/js/framework/layout.js',
            'src/js/view/view.home.js',
            'src/js/base/app.js'
        ],
        srcMobile: [
            'node_modules/json2/json2.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery-enhance/src/jquery.enhance.js',
            'node_modules/kickstarter/src/kickstarter.js',
            'node_modules/gsap/src/minified/TweenMax.min.js',
            'node_modules/js-toolbox/src/toolbox.js',
            'src/js/class/transition.js',
            'src/js/base/core.js',
            'src/js/framework/layout.js',
            'src/js/view/view.home.js',
        ],
        srcWatch : src + '/js/**/*.js',
        dest: dest,
        file: fileJS,
        fileMobile: fileJSMobile,
        filemin: fileminJS,
        fileminMobile: fileminJSMobile
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
        destCSS: src + '/precss/vendor',
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
        dest: destRoot + "assets/svg/"
    },
    views: {
        srcWatch : './views/**',
    }
};