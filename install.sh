# INSTALL LARAVEL
composer create-project laravel/laravel $FOLDER 5.2.* --prefer-dist
cd $FOLDER
composer install
chmod -R 777 bootstrap/cache
chmod -R 777 storage
php artisan key:generate

# INSTALL LARAVEL HEAVEN
wget https://github.com/jcsuzanne/starter-heaven/archive/master.zip
unzip master.zip
cd starter-heaven-master
mv gulp ../
mv gulpfile.js ../
mv package.json ../
mv resources ../
mv app/Http/Middleware/Caramel.php ../app/Http/Middleware/
cd ../
rm -R starter-heaven-master
rm master.zip
npm install
gulp start