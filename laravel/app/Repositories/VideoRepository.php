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

    public function index($users_following) {
        $video = $this->model
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
            ->whereIn('user_id', $users_following)
            ->get();

        return $video;
    }

    public function getMyVideo($id) {
        $video = $this->model
            ->where('user_id', $id)
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
}