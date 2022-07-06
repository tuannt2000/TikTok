<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Contracts\Services\Api\UserServiceInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function findUser (Request $request) {
        $params = $request->all();

        $result = $this->userService->findUserByKey($params);

        return response()->json($result, 200);
    }
}
