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
            ->leftJoin('users', 'users.id', '=', 'videos.user_id')
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
        $this->model::create([
            'user_id' => Auth::user()->id,
            'cover_image' => $data->cover_image,
            'url' => $data->url,
            'description' => $data->description,
            'status' => $data->status,
            'comment' => $data->comment,
            'duet' => $data->duet,
            'stitch' => $data->stitch,
            'date_upload' => Carbon::now()
        ]);
    }
}