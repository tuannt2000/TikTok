<?php

namespace App\Providers;

use App\Contracts\Repositories\DiscoveRepositoryInterface;
use App\Contracts\Repositories\LanguageRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Repositories\DiscoveRepository;
use App\Repositories\LanguageRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected static $repositories = [
        'language' => [
            LanguageRepositoryInterface::class,
            LanguageRepository::class,
        ],
        'user' => [
            UserRepositoryInterface::class,
            UserRepository::class,
        ],
        'discove' => [
            DiscoveRepositoryInterface::class,
            DiscoveRepository::class,
        ]
    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach (static::$repositories as $repository) {
            $this->app->singleton(
                $repository[0],
                $repository[1]
            );
        }
    }
}
