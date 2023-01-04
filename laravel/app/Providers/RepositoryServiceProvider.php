<?php

namespace App\Providers;

use App\Contracts\Repositories\FollowRepositoryInterface;
use App\Contracts\Repositories\LanguageRepositoryInterface;
use App\Contracts\Repositories\MessageRepositoryInterface;
use App\Contracts\Repositories\MusicRepositoryInterface;
use App\Contracts\Repositories\RoomRepositoryInterface;
use App\Contracts\Repositories\TagRepositoryInterface;
use App\Contracts\Repositories\VideoRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Repositories\FollowRepository;
use App\Repositories\LanguageRepository;
use App\Repositories\MessageRepository;
use App\Repositories\MusicRepository;
use App\Repositories\RoomRepository;
use App\Repositories\TagRepository;
use App\Repositories\VideoRepository;
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
        'music' => [
            MusicRepositoryInterface::class,
            MusicRepository::class,
        ],
        'tag' => [
            TagRepositoryInterface::class,
            TagRepository::class,
        ],
        'room' => [
            RoomRepositoryInterface::class,
            RoomRepository::class,
        ],
        'message' => [
            MessageRepositoryInterface::class,
            MessageRepository::class,
        ],
        'video' => [
            VideoRepositoryInterface::class,
            VideoRepository::class,
        ],
        'follow' => [
            FollowRepositoryInterface::class,
            FollowRepository::class,
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
