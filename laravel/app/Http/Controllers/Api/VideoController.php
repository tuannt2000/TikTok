<?php

namespace App\Http\Controllers\Api;

//use App\Contracts\Services\Api\MessageServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    protected $videoService;

//    public function __construct(MessageServiceInterface $messageService)
//    {
//        $this->messageService = $messageService;
//    }

    /**
      * @param Request $request
      *
      * @return \Illuminate\Http\Response
     */
    public function upload (Request $request) {
        $video = $request->url;
//        return response()->json(file_get_contents($video), 200);

        Storage::disk('google')->put('test.mp4', file_get_contents($video));

        return response()->json('Đã upload file lên google drive thành công!', 200);
    }
}
