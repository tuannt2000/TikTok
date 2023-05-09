<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:37 PM
 */

namespace App\Repositories;

use App\Contracts\Repositories\VideoRepositoryInterface;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class VideoRepository extends BaseRepository implements VideoRepositoryInterface
{
    /**
     * VideoRepository constructor.
     * @param Video $video
     */
    public function __construct(Video $video)
    {
        parent::__construct($video);
    }

    public function index($users_friend) {
        $query = $this->__getQueryListVideo();
        $video = $query
            ->where(function ($query) use($users_friend) {
                $query->where('status', 0)
                    ->orWhere(function ($query) use($users_friend) {
                    $query->whereIn('user_id', $users_friend)
                        ->where('status', 1);
                    });
            })
            ->where('user_id', '<>', Auth::user()->id)
            ->orderByDesc('created_at')
            ->take(15)
            ->get();

        return $video;
    }

    public function videoFollowing($users_friend) {
        $query = $this->__getQueryListVideo();
        $video = $query
            ->whereIn('user_id', $users_friend)
            ->where('status', '<>', 2)
            ->get();

        return $video;
    }

    public function getMyVideo($id, $is_friend) {
        $user_id = Auth::check() ? Auth::user()->id : null;
        $query = $this->__getQueryListVideo();
        if ($user_id) {
            $query = $query->with(['following' => function ($query) use ($user_id) {
                $query->where('user_id', $user_id);
            }]);
        }
        if ($is_friend) {
            $query = $query->where('videos.status', '<>', 2);
        } else if ($user_id != $id) {
            $query = $query->where('videos.status', 0);
        }
        $video = $query
            ->where('videos.user_id', $id)
            ->get();

        return $video;
    }

    public function getMyVideoLike($users_friend) {
        $user_id = Auth::check() ? Auth::user()->id : null;
        $query = $this->__getQueryListVideo();
        $video = $query
            ->where(function ($query) use($users_friend) {
                $query->where('status', 0)
                    ->orWhere(function ($query) use($users_friend) {
                    $query->whereIn('videos.user_id', $users_friend)
                        ->where('status', 1);
                    });
            })
            ->where('videos.user_id', '<>', $user_id)
            ->join('likes', 'likes.video_id', '=', 'videos.id')
            ->where('likes.user_id', $user_id)
            ->whereNull('likes.deleted_at')
            ->get();

        return $video;
    }

    public function uploadVideo($data)
    {
        $data['user_id'] = Auth::user()->id;
        $data['date_upload'] = Carbon::now();
        $this->model::create($data);
    }

    public function getTopVideo($key_word) {
        $video = $this->model
            ->with('user')
            ->withCount('likes')
            ->where('description', 'like', '%' . $key_word . '%')
            ->orderBy('likes_count', 'DESC')
            ->take(15)
            ->get();

        return $video;
    }

    private function __getQueryListVideo () {
        $query = $this->model
            ->with(['user' => function($query) { 
                $query->withCount([
                    'followers', 
                    'likes'
                ]);
            }])
            ->with(['likes' => function($query) {
                $query->where('likes.user_id', Auth::user()->id)
                    ->whereNull('deleted_at');
            }])
            ->withCount(['likes' => function($query) {
                $query->whereNull('deleted_at');
            }])
            ->withCount('comments');

        return $query;
    }
}