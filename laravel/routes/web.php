<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LanguageController;
use Illuminate\Http\Request;

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


Route::get('upload-file', function() {
    \Illuminate\Support\Facades\Storage::disk('google')->put('google-drive.txt', 'Google Drive As Filesystem In Laravel');
    dd('Đã upload file lên google drive thành công!');
});
Route::get('/', function() {
    return view('home');
});