# Starter Heaven

Front-end sources for development

Dependencies
  - Laravel
  - Laravel installer
  - WGET for installation
  - Gulp
  - Yarn

### Version
0.2.0

### Installation

1.Launch installer

    FOLDER=foldername ./install.sh


### How to use Caramel?

Change the extends controller class in the controller file

    class TheController extends MotherbaseController


5.Update _.gitignore_ with

    /node_modules
    /public/hot
    /public/storage
    /storage/*.key
    /vendor
    /.idea
    /.vagrant
    Homestead.json
    Homestead.yaml
    npm-debug.log
    yarn-error.log
    .env
    /.sass-cache/
    /public/build
    /public/img/temp
    admin/.htaccess
    admin/wp-config.php
    admin/wp-content/uploads/
    admin/wp-content/blogs.dir/
    admin/wp-content/upgrade/
    admin/wp-content/backup-db/
    admin/wp-content/advanced-cache.php
    admin/wp-content/wp-cache-config.php
    admin/wp-content/cache/
    admin/wp-content/backups/
    admin/wp-config-sample.php
    sitemap.xml
    sitemap.xml.gz
    *.log
    .DS_Store
    /bootstrap/compiled.php
    composer.phar
    composer.lock
    *.csv
    admin/*.sql
    admin/*.gz
    wp_loader.php
    *.sql
    *.gz

### JCS CONFIG

    <?php

    return [
        'cache_enabled' => env('CACHE_ENABLED', true),
        'minify' => env('MINIFY', '.min'),
        'wpapi'=> env('WPAPI', 'url.to.admin'),
    ];

### HTACCESS

    <IfModule mod_rewrite.c>
        <IfModule mod_negotiation.c>
            Options -MultiViews
        </IfModule>

        RewriteEngine On

        # Redirect Trailing Slashes If Not A Folder...
        RewriteCond %{REQUEST_FILENAME} !-d
        #RewriteRule ^(.*)/$ /$1 [L,R=301]

        # Handle Front Controller...
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.php [L]

        # Handle Authorization Header
        RewriteCond %{HTTP:Authorization} .
        RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    </IfModule>

### ENV

    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=base64:zUu6DjOnBloyEO1NcvLk00zXkvy6oCmOGPBfzlQ3FHc=
    APP_DEBUG=true
    APP_LOG_LEVEL=debug
    APP_URL=http://localhost

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=homestead
    DB_USERNAME=homestead
    DB_PASSWORD=secret

    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    SESSION_DRIVER=file
    QUEUE_DRIVER=sync

    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_DRIVER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null

    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=

    CACHE_ENABLED=false
    MINIFY=
    WPAPI=url.to.admin.local

### BACKUP CLI

    wp db export
    tar -zcvf backup.tar.gz admin


License
----

MIT