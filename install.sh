# INSTALL LARAVEL
composer create-project laravel/laravel $FOLDER 5.5.* --prefer-dist
cd $FOLDER
composer install
chmod -R 777 bootstrap/cache
chmod -R 777 storage
chmod -R 777 resources
php artisan key:generate

# INSTALL LARAVEL HEAVEN
wget https://github.com/jcsuzanne/starter-heaven/archive/master.zip
unzip master.zip
cd starter-heaven-master
mv gulp ../
mv gulpfile.js ../
mv package.json ../
mv webpack.mix.js ../
mv deploy-preprod.sh ../
mv manifest.json ../
mv pwa.js ../
rsync -av resources ../
mv app/Http/Controllers/MotherbaseController.php ../app/Http/Controllers/
mv app/Http/Controllers/PageController.php ../app/Http/Controllers/
mv app/Http/Controllers/WpController.php ../app/Http/Controllers/
mv app/Http/Controllers/HelperController.php ../app/Http/Controllers/
mv app/Http/Controllers/SitemapController.php ../app/Http/Controllers/
mv app/Http/Controllers/PreviewController.php ../app/Http/Controllers/
mv app/Providers/AppServiceProvider.php ../app/Providers/
mv config/jcs.php ../config/
cd ../
rm -R resources/assets
rm  resources/views/welcome.blade.php
rm  resources/views/templates/mobile.blade.php
rm  resources/views/templates/desktop.blade.php
rm -R resources/views/vendor
rm -R starter-heaven-master
rm master.zip
yarn install
yarn