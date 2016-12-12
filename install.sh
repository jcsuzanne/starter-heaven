# INSTALL LARAVEL
composer create-project laravel/laravel $FOLDER 5.3.* --prefer-dist
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
mv app/Http/Middleware/Caramel.php ../app/Http/Middleware/
cd ../
rm -R resources/assets
rm -R resources/views/vendor
rm -R starter-heaven-master
rm master.zip
npm install
gulp start