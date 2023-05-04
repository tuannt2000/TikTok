<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Repositories\LikeRepositoryInterface;
use App\Contracts\Services\Api\VideoServiceInterface;
use App\Contracts\Repositories\VideoRepositoryInterface;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;
use App\Models\Report;

class VideoService extends AbstractService implements VideoServiceInterface
{
    /**
     * @var VideoRepositoryInterface
     */
    protected $videoRepository;

    /**
     * @var LikeRepositoryInterface
     */
    protected $likeRepository;

    /**
     * VideoService constructor.
     * @param VideoRepositoryInterface $videoRepository
     */
    public function __construct(VideoRepositoryInterface $videoRepository, LikeRepositoryInterface $likeRepository)
    {
        $this->videoRepository = $videoRepository;
        $this->likeRepository = $likeRepository;
    }

    public function index() {
        try {
            $users_friend = Follow::ofListIdFriend(Auth::user()->id);

            return [
                'code' => 200,
                'data' => $this->videoRepository->index($users_friend)
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function following() {
        try {
            $users_friend = Follow::ofListIdFriend(Auth::user()->id);

            return [
                'code' => 200,
                'data' => $this->videoRepository->videoFollowing($users_friend)
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function getMyVideo($user_id) {
        try {
            $users_friend = Follow::ofListIdFriend(Auth::user()->id);

            return [
                'code' => 200,
                'data' => $this->videoRepository->getMyVideo($user_id, in_array($user_id, $users_friend))
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function getMyVideoLike() {
        try {
            $users_friend = Follow::ofListIdFriend(Auth::user()->id);
            
            return [
                'code' => 200,
                'data' => $this->videoRepository->getMyVideoLike($users_friend)
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
     * @param $data
     * @return array
     */
    public function uploadVideo($data)
    {
        try {
            $this->videoRepository->uploadVideo($data);

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

    /**
     * @param $data
     * @return array
     */
    public function likeVideo($data)
    {
        try {
            $like = $this->likeRepository->findVideo($data);
            $message = '';
            if (is_null($like)) {
                $this->likeRepository->create(['video_id' => $data['video_id'], 'user_id' => Auth::user()->id]);
                $message = 'Like video thành công';
            } else {
                if (is_null($like->deleted_at)) {
                    $like->delete();
                    $message = 'Xóa like video thành công';
                } else {
                    $like->restore();
                    $message = 'Like video thành công';
                }
            }

            return [
                'code' => 200,
                'message' => $message
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
     * @param $key_word
     * @return array
     */
    public function findTopVideo($key_word)
    {
        try {
            $data = $this->videoRepository->getTopVideo($key_word);

            return [
                'code' => 200,
                'data' => $data
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err->getMessage()
            ];
        }
    }

    /**
     * @param $request
     * @return array
     */
    public function report($request)
    {
        try {
            $options = [
                'user_id' => Auth::user()->id,
                'video_id' => $request['video_id'],
                'value' => $request['value'],
                'progress' => 'unprocessed'
            ];
            $data = Report::create($options);

            return [
                'code' => 200,
                'message' => 'Report successfully'
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err->getMessage()
            ];
        }
    }
}