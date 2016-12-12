# Starter Heaven

Front-end sources for development

Dependencies
  - Laravel
  - Laravel installer
  - Caramel (https://packagist.org/packages/lapiscine/caramel)
  - WGET for installation
  - Gulp

### Version
0.1.0

### Installation

1.Launch installer

    FOLDER=foldername ./install.sh

2.Add minify node in app.php

    'minify' => '.min',


3.Get Caramel front-end boilerplate by adding the lib in _composer.jon_ and run _composer update_

    "lapiscine/caramel": "dev-master"

4.Setup the Laravel environment in _bootstrap/start.php_

    $env = $app->detectEnvironment(function () {

        // Defined in the server configuration
        if(isset($_SERVER['APP_ENVIRONMENT'])) {
            return $_SERVER['APP_ENVIRONMENT'];
        // Look for ./environment.php
        } elseif ( file_exists( __DIR__ . '/environment.php' ) ) {
            return include __DIR__ . '/environment.php';
        }
    });

Add environment.php in _bootstrap_ folder with the following code

    <?php return 'the-environment-i-want';

### How to use Caramel?

Change the extends controller class in the controller file

    class HomeController extends Lapiscine\Caramel\CaramelController {}

Pass the datas inside _viewData_

    $this->viewData['view'] = 'the content';
    $this->viewData['jscontroller'] = 'js-controller';

5.Update _.gitignore_ with

    /node_modules/
    npm-debug.log
    /.sass-cache/
    /public/assets/build
    /public/assets/img/temp


### Migration L5 (5.2 ou 5.3)

https://github.com/jcsuzanne/caramel-l5

How to use with Laravel 5.2 + Wordpress
https://www.evernote.com/shard/s209/sh/64e95a53-6943-4e03-adcb-476fcf5b64f4/9776562f37c7db7b


License
----

MIT