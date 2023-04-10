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
            $file = request()->file('video');

            if (!$file->isValid()) {
                Log::error($file->getErrorMessage());
            }
            if (!$request->hasFile('video') || !$request->hasFile('cover_image')) {
                throw new \Exception('not file');
            }
            $file_name = $request->file('video')->getClientOriginalName();
            $folder_name = pathinfo($file_name, PATHINFO_FILENAME);
            $link = Auth::user()->id . '/' . date('Y_m_d_H_i_s_', strtotime(Carbon::now())) . $folder_name;
            $request['url'] = $this->__createUrlFile($link . '/' . $file_name, $request->video);
            $request['cover_image'] = $this->__createUrlFile($link . '/' . $folder_name . ".png", $request->cover_image);
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
