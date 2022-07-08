<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Services\Api\DiscoveServiceInterface;
use App\Contracts\Services\Api\LanguageServiceInterface;
use App\Contracts\Services\Api\UserServiceInterface;
use App\Services\Api\DiscoveService;
use App\Services\Api\LanguageService;
use App\Services\Api\UserService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $services = [
            [
                LanguageServiceInterface::class,
                LanguageService::class
            ],
            [
                UserServiceInterface::class,
                UserService::class
            ],
            [
                DiscoveServiceInterface::class,
                DiscoveService::class
            ],
        ];
        
        foreach ($services as $service) {
            $this->app->bind(
                $service[0],
                $service[1]
            );
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
