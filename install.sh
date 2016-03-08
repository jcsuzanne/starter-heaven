# INSTALL LARAVEL
composer create-project laravel/laravel $FOLDER 4.2.* --prefer-dist
cd $FOLDER
composer install
chmod -R 777 app/storage

# INSTALL LARAVEL HEAVEN
wget https://github.com/jcsuzanne/starter-heaven/archive/master.zip
unzip master.zip
cd starter-heaven-master
mv gulp ../
mv gulpfile.js ../
mv package.json ../
mv resources ../
mv templates ../app/views/
cd ../
rm -R starter-heaven-master
rm master.zip
npm install
gulp start