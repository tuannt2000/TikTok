<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function() {
    return view('content/dashboard/index');
})->name('dashboard');

Route::get('/login', function() {
    return view('content/auth/login');
})->name('login');

Route::get('/register', function() {
    return view('content/auth/register');
})->name('register');

Route::get('/forgot-password', function() {
    return view('content/auth/forgot_password');
})->name('forgot-password');

Route::get('/charts', function() {
    return view('content/charts/index');
})->name('charts');

Route::get('/tables', function() {
    return view('content/tables/index');
})->name('tables');