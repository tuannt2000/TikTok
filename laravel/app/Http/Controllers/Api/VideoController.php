<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Services\Api\VideoServiceInterface;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function upload(Request $request) {
        try {
            $nameVideo = Auth::user()->id . '/' . date('Y_m_d_H_i_s_', strtotime(Carbon::now())) . $request->name;
            Storage::disk('google')->put($nameVideo, file_get_contents($request->url));
            $request['url'] = Storage::disk('google')->url($nameVideo);
            $nameImage = Auth::user()->id . '/' . date('Y_m_d_H_i_s_', strtotime(Carbon::now())) . 'image_' . $request->name;
            Storage::disk('google')->put($nameImage, file_get_contents($request->cover_image));
            $request['cover_image'] = Storage::disk('google')->url($nameImage);
            $result = $this->videoService->uploadVideo($request);
            return response()->json($result, 200);
        } catch (\Throwable $err) {
            Log::error($err);
            return response()->json('Upload file lên google drive thất bại!', 500);
        }
    }
}
