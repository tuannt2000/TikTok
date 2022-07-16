<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Resources\lang\vi\messages;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class GoogleController extends Controller
{
    public function loginCallback(Request $request)
    {
        $token = $request->access_token;
        $userCurrent = file_get_contents('https://www.googleapis.com/oauth2/v1/userinfo?access_token='.$token);
        $userData = json_decode($userCurrent);
        $userMailCurrent = $userData->email;
        $existingUser = User::where('email', $userMailCurrent)->first();
        try {
            if ($existingUser) {
                $user = User::find($existingUser->id);
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->save();
                return response()->json([
                    'data' => [
                        'code' => 200,
                        'message' => trans('messages.loginWithGoogleSuccess'),
                        'access_token' => $tokenResult->accessToken,
                        'token_type' => 'Bearer',
                        'expires_at' => Carbon::parse(
                            $tokenResult->token->expires_at
                        )->toDateTimeString()
                    ]
                ]);
            }           
        } catch (\Throwable $err) {
            return response()->json([
                'data' => [
                    'code' => 401,
                    'message' => trans('messages.loginWithGoogleFailt'),
                ],
            ]);
        }
    }
}
