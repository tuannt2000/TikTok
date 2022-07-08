<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\DiscoveServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DiscoveController extends Controller
{
    protected $discoveService;

    public function __construct(DiscoveServiceInterface $discoveService)
    {
        $this->discoveService = $discoveService;
    }

    public function index () {
        $result = $this->discoveService->index();

        return response()->json($result, 200);
    }
}
