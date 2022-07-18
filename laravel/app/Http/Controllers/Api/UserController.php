<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Contracts\Services\Api\UserServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index () {
        $result = $this->userService->index();

        return response()->json($result, 200);
    }

    public function findUser (Request $request) {
        $params = $request->all();

        $result = $this->userService->findUserByKey($params);

        return response()->json($result, 200);
    }

    public function listAccountOffer (Request $request) {
        $result = $this->userService->listAccountOffer($request->id);

        return response()->json($result, 200);
    }

    public function listFollowing (Request $request) {
        $result = $this->userService->listFollowing($request->id);

        return response()->json($result, 200);
    }

    public function getInfoUser () {
        $result = [
            'data' => Auth::user()
        ];

        return response()->json($result, 200);
    }
}
