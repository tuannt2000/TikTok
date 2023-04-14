<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DiscoveController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\FollowController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Auth\GoogleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('users')->group(function () {
    Route::get ('/',               [UserController::class, 'index']);
    Route::get ('/info',           [UserController::class, 'getInfoUser'])->middleware('auth:api');
    Route::get ('/search',         [UserController::class, 'findUser']);
    Route::get ('/search/logined', [UserController::class, 'findUser'])->middleware('auth:api');
    Route::get ('/profile',        [UserController::class, 'getUserByNickname']);
    Route::post('/account-offer',  [UserController::class, 'listAccountOffer']);
    Route::post('/following',      [UserController::class, 'listFollowing']);
});

Route::prefix('search')->group(function () {
    Route::get ('/top-video',      [VideoController::class, 'findTopVideo']);
});

Route::prefix('/')->middleware('auth:api')->group(function () {
    Route::get ('/rooms',    [RoomController::class, 'index']);
    Route::get ('/messages', [MessageController::class, 'index']);
    Route::post('/message',  [MessageController::class, 'store']);
    Route::post('/follow',   [FollowController::class, 'store']);

    Route::prefix('video')->group(function () {
        Route::get ('/',         [VideoController::class, 'index']);
        Route::get ('/following',[VideoController::class, 'following']);
        Route::get ('/my-video', [VideoController::class, 'getMyVideo']);
        Route::post('/upload',   [VideoController::class, 'upload']);
        Route::post('/like',     [VideoController::class, 'like']);
    });

    Route::prefix('comment')->group(function () {
        Route::get('/{video_id}/list-comment', [CommentController::class, 'getListComment']);
        Route::post ('/create', [CommentController::class, 'store']);
    });
});

Route::get('/languages', [LanguageController::class, 'index']);

Route::get('/discoves', [DiscoveController::class, 'index']);

Route::post('/redirectGoogle', [GoogleController::class, 'loginCallback']);