## Install Xampp
Install Xampp from https://www.apachefriends.org/index.html

- Run the Xampp installer and open the Xampp control panel
- Make sure that you enable the Apache and MySQL services
- On mac you need to click "Start" on the Home tab, "Enable" on the Network tab and "Mount" on the Location Tab. Click "Explore" on the location tab to open your Xampp/Lampp folder

## Install Composer
Go to https://getcomposer.org/download

- On Windows, download and run the installer
- On Mac, copy the php commands and run in the terminal. Then copy the mv command and run in terminal. You can also install composer with Homebrew

### Setting Up Project
To install your Vendor file run composer install on your VS Code Terminal and wait for it to complete.
```
composer install
```

### Setup .env file
```
cp .env.example .env
```

### Setup Database
On your .env file, locate this block of code below.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=root
DB_PASSWORD=
```
### Commands
```
php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan passport:install
```