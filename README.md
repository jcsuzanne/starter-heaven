# Starter Heaven

Front-end sources for development

Dependencies
  - Laravel
  - Laravel installer
  - WGET for installation
  - Gulp

### Version
0.0.3

### Installation

1.Launch installer

    FOLDER=foldername ./install.sh

2.Add minify node in app.php

    'minify' => '.min',


3.Get Caramel front-end boilerplate by adding the lib in _composer.jon_

    "lapiscine/caramel": "dev-master"

4.Setup the Laravel environment

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

    $this->viewData['view'] = 'test';
    $this->viewData['yo'] = 'yo';

License
----

MIT