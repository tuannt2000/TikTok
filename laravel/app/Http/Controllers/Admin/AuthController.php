<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login() {
        return view('content/auth/login');
    }

    public function postLogin(LoginRequest $request) {
        $validated = $request->validated();

        if (Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            return redirect()->route('dashboard')->with('flashSuccess', 'Đăng nhập thành công');    
        }

        return redirect()->back()
            ->withInput()
            ->with('flashError', 'Email hoặc mật khẩu không chính xác');
    }

    public function forgotPassword() {
        return view('content/auth/forgot_password');
    }
}
