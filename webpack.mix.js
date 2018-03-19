let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.options({
    autoprefixer: false,
    postCss: [
        require('autoprefixer')({
            browsers: ['last 2 versions','> 1%', 'IE 10' , 'Safari <= 8'],
            cascade:false
        })
    ]
});

let namesFiles = { js : 'front.js' , jsTop : 'top.js' , css : 'front.css' }
if (mix.inProduction()) {
    mix.copy('resources/js/vendor/modernizr-custom.js', `public/build/${namesFiles.jsTop}`)
   .js('resources/js/app.js', `public/build/${namesFiles.js}`)
   .sass('resources/css/builder.scss', `public/build/${namesFiles.css}`)
   .version()
   .options({
        processCssUrls: false
    })
   .sourceMaps();
} else {
    mix.copy('resources/js/vendor/modernizr-custom.js', `public/build/${namesFiles.jsTop}`)
   .js('resources/js/app.js', `public/build/${namesFiles.js}`)
   .sass('resources/css/builder.scss', `public/build/${namesFiles.css}`)
   .options({
        processCssUrls: false
    })
   .sourceMaps();
}

// BrowserSync

mix.browserSync({
    proxy : '192.168.1.20/domain.tld',
    cors:true,
    files: [
    'public/build/front.css',  // Generated .css file
    'public/build/front.js',    // Generated .js file
    // =====================================================================
    // You probably need only one of the below lines, depending
    // on which platform this project is being built upon.
    // =====================================================================
    'resources/views/**', // Laravel-specific view files
    ]
});