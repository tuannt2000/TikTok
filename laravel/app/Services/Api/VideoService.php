<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Services\Api\VideoServiceInterface;
use App\Contracts\Repositories\VideoRepositoryInterface;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;

class VideoService extends AbstractService implements VideoServiceInterface
{
    /**
     * @var VideoRepositoryInterface
     */
    protected $videoRepository;

    /**
     * VideoService constructor.
     * @param VideoRepositoryInterface $videoRepository
     */
    public function __construct(VideoRepositoryInterface $videoRepository)
    {
        $this->videoRepository = $videoRepository;
    }

    public function index() {
        try {
            $users_following = Follow::ofListIdUserFollowing(Auth::user()->id);

            return [
                'code' => 200,
                'data' => $this->videoRepository->index($users_following)
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    /**
     * @param $url
     * @return array
     */
    public function uploadVideo($url)
    {
        try {
            $this->videoRepository->uploadVideo($url);

            return [
                'code' => 200,
                'message' => 'Upload video thành công'
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }
}