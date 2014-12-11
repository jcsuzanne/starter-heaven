# INSTALL LARAVEL
laravel new $FOLDER
cd $FOLDER
chmod -R 777 app/storage

# INSTALL LARAVEL HEAVEN
wget https://github.com/jcsuzanne/starter-heaven/archive/master.zip
unzip master.zip
cd starter-heaven-master
mv gulp ../
mv gulpfile.js ../
mv package.json ../
mv src ../
cd ../
rm -R starter-heaven-master
rm master.zip
npm install
gulp start