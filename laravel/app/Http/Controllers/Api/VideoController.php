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

    public function following() {
        $result = $this->videoService->following();

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
            $video = $request->file('video_file');
            $cover_image = $request->file('cover_image_file');

            if (!$video->isValid() || !$cover_image->isValid()) {
                throw new \Exception('file error');
            }
            if (!$request->hasFile('video_file') || !$request->hasFile('cover_image_file')) {
                throw new \Exception('not file');
            }
            $file_name = $video->getClientOriginalName();
            $folder_name = pathinfo($file_name, PATHINFO_FILENAME);
            $link = Auth::user()->id . '/' . date('Y_m_d_H_i_s_', strtotime(Carbon::now())) . $folder_name;
            $request['url'] = $this->__createUrlFile($link . '/' . $file_name, $request->video_file);
            $request['cover_image'] = $this->__createUrlFile($link . '/' . $folder_name . ".png", $request->cover_image_file);
            $result = $this->videoService->uploadVideo($request->all());

            return response()->json($result, 200);
        } catch (\Throwable $err) {
            Log::error($err);
            return response()->json('Upload file thất bại!', 500);
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
      * @param Request $request
      *
      * @return \Illuminate\Http\Response
     */
    public function findTopVideo(Request $request) {
        $result = $this->videoService->findTopVideo($request->q ?? '');

        return response()->json($result, 200);
    }

    /**
      * create path url
      * @param string $link
      * @param string $file
      *
      * @return string $url
     */
    private function __createUrlFile($link, $file) {
        Storage::disk('google')->put($link, file_get_contents($file));
        $url = Storage::disk('google')->url($link);

        return $url;
    }
}
