<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\VideoServiceInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    protected $videoService;

    public function __construct(VideoServiceInterface $videoService)
    {
        $this->videoService = $videoService;
    }

    public function index() {
        $result = $this->videoService->index();

        return response()->json($result, 200);
    }

    public function getMyVideo() {
        $result = $this->videoService->getMyVideo();

        return response()->json($result, 200);
    }

    /**
      * @param Request $request
      *
      * @return \Illuminate\Http\Response
     */
    public function upload (Request $request) {
        try {
            $video = $request->url;
            if (Storage::disk('google')->exists($request->name)) {
                return response()->json('Tên video đã tồn tại', 200);
            }
            Storage::disk('google')->put($request->name, file_get_contents($video));
            $result = $this->videoService->uploadVideo(Storage::disk('google')->url($request->name));
            return response()->json($result, 200);
        } catch (\Throwable $err) {
            Log::error($err);
            return response()->json('Upload file lên google drive thất bại!', 500);
        }
    }
}
