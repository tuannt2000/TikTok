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
            $request['url'] = $this->__createUrlFile($request->name, $request->url);
            $request['cover_image'] = $this->__createUrlFile($request->name, $request->cover_image, true);
            $result = $this->videoService->uploadVideo($request);

            return response()->json($result, 200);
        } catch (\Throwable $err) {
            Log::error($err);
            return response()->json('Upload file lên google drive thất bại!', 500);
        }
    }

    /**
      * @param Request $request
      *
      * @return \Illuminate\Http\Response
     */
    public function like(Request $request) {
        $result = $this->videoService->likeVideo($request->all());

        return response()->json($result, 200);
    }

     /**
      * create path url
      * @param string $name
      * @param string $content
      * @param boolean $image
      *
      * @return string $url
     */
    private function __createUrlFile($name, $content, $image = false) {
        $name = Auth::user()->id . '/' . date('Y_m_d_H_i_s_', strtotime(Carbon::now())) . $name;
        if ($image) {
            $name = Auth::user()->id . '/' . date('Y_m_d_H_i_s_', strtotime(Carbon::now())) . 'image_' . $name;
        }
        
        Storage::disk('google')->put($name, file_get_contents($content));
        $url = Storage::disk('google')->url($name);

        return $url;
    }
}
