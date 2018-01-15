# INSTALL LARAVEL
composer create-project laravel/laravel $FOLDER 5.4.* --prefer-dist
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
rsync -av resources ../
mv app/Http/Controllers/MotherbaseController.php ../app/Http/Controllers/
mv app/Http/Controllers/PageController.php ../app/Http/Controllers/
mv app/Http/Controllers/WpController.php ../app/Http/Controllers/
cd ../
rm -R resources/assets
rm  resources/views/welcome.blade.php
rm  resources/views/templates/mobile.blade.php
rm  resources/views/templates/desktop.blade.php
rm -R resources/views/vendor
rm -R starter-heaven-master
rm master.zip
yarn install
gulp