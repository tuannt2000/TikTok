<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:34 PM
 */

namespace App\Services\Api;

use App\Contracts\Repositories\LikeRepositoryInterface;
use App\Contracts\Repositories\RoomRepositoryInterface;
use App\Contracts\Repositories\ShareRepositoryInterface;
use App\Contracts\Services\Api\VideoServiceInterface;
use App\Contracts\Repositories\VideoRepositoryInterface;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;
use App\Models\Report;
use App\Models\User;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

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
     * @var ShareRepositoryInterface
     */
    protected $shareRepository;

    /**
     * @var RoomRepositoryInterface
     */
    protected $roomRepository;

    /**
     * VideoService constructor.
     * @param VideoRepositoryInterface $videoRepository
     */
    public function __construct(
        VideoRepositoryInterface $videoRepository, 
        LikeRepositoryInterface $likeRepository,
        ShareRepositoryInterface $shareRepository,
        RoomRepositoryInterface $roomRepository
    )
    {
        $this->videoRepository = $videoRepository;
        $this->likeRepository  = $likeRepository;
        $this->shareRepository = $shareRepository;
        $this->roomRepository  = $roomRepository;
    }

    public function index() {
        try {
            $users_friend = Follow::ofListIdFriend(Auth::user()->id);
            $users_following = Follow::ofPluckIdUserFollowing(Auth::user()->id);

            return [
                'code' => 200,
                'data' => $this->videoRepository->index($users_friend, $users_following)
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 400,
                'message' => $err,
            ];
        }
    }

    public function getVideoNotLogin() {
        try {
            return [
                'code' => 200,
                'data' => $this->videoRepository->getVideoNotLogin()
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
            $users_following = Follow::ofPluckIdUserFollowing(Auth::user()->id);

            return [
                'code' => 200,
                'data' => $this->videoRepository->videoFollowing($users_friend, $users_following)
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

    public function delete($id) {
        try {
            $video = Video::findOrFail($id);
            if ($video->user_id != Auth::user()->id) {
                throw new \Exception('Video not found');
            }

            Storage::disk('google')->deleteDirectory($video->path_directory);
            $this->videoRepository->delete($id);

            return [
                'code' => 200,
                'message' => 'Deleted video successfully'
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 404,
                'message' => $err,
            ];
        }
    }

    public function edit($request) {
        try {
            $video = Video::where([
                'id' => $request['id'],
                'user_id' => Auth::user()->id
            ])->first();
            if ($video->user_id != Auth::user()->id) {
                throw new \Exception('Video not found');
            }

            $options = [];
            if (isset($request['comment'])) {
                $options['comment'] = $request['comment'];
            }

            if (isset($request['status'])) {
                $options['status'] = $request['status'];
            }

            $this->videoRepository->update($request['id'], $options);

            return [
                'code' => 200,
                'message' => 'Edit video successfully'
            ];
        } catch (\Throwable $err) {
            Log::error($err);

            return [
                'code' => 404,
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

    /**
     * @param array $data
     * @return array
     */
    public function share($data)
    {
        DB::beginTransaction();
        try {
            $users_id = $data['users_id'];
            $video_id = $data['video_id'];
            foreach($users_id as $user_id) {
                User::findOrFail($user_id);
                $share = $this->shareRepository->create([
                    'user_id'      => Auth::user()->id,
                    'recipient_id' => $user_id,
                    'video_id'     => $video_id
                ]);

                $room_id = $this->roomRepository->findRoomIdByUserId($user_id);

                if (!$room_id) {
                    throw new \Exception('Could not find room');
                }

                $share->message()->create([
                    'room_id'   => $room_id,
                    'user_id'   => Auth::user()->id,
                    'text'      => '',
                    'date_send' => Carbon::now()
                ]);
            }

            DB::commit();
            return [
                'message' => "Share successfully",
                'code' => 200
            ];
        } catch (\Throwable $err) {
            DB::rollback();
            Log::error($err);
            
            return [
                'code' => 400,
                'message' => $err->getMessage()
            ];
        }
    }
}