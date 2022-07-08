
### docker
docker-compose build
docker-compose up -d

### laravel
Set up set in server docker:
docker exec -it travellist-app bash
composer install
cp .env.example .env
php artisan config:clear
php artisan key:generate
php artisan migrate:reset
php artisan migrate
php artisan db:seed