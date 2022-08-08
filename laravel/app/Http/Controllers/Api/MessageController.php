<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\MessageServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    protected $messageService;

    public function __construct(MessageServiceInterface $messageService)
    {
        $this->messageService = $messageService;
    }

    public function index (Request $request) {
        $result = $this->messageService->index($request->room_id);

        return response()->json($result, 200);
    }
}
