<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DiscoveController;

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
    Route::get('/', [UserController::class, 'index']);
    Route::get('/search', [UserController::class, 'findUser']);
    Route::post('/account-offer', [UserController::class, 'listAccountOffer']);
    Route::post('/following', [UserController::class, 'listFollowing']);
});

Route::get('/languages', [LanguageController::class, 'index']);

Route::get('/discoves', [DiscoveController::class, 'index']);

Route::post('/redirectGoogle', [GoogleController::class, 'loginCallback']);