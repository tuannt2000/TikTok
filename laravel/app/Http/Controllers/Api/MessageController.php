<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\MessageServiceInterface;
use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Models\User;
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

    public function sendMessage(Request $request) {
        $user = User::where('id', $request->user_id)->first();
        $message = event(new MessageEvent($request->room_id, $request->user_id, $user->nickname, $request->message));

        return response()->json($message, 200);
    }
}
