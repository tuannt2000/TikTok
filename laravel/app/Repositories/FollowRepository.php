<?php

namespace App\Repositories;

use App\Contracts\Repositories\FollowRepositoryInterface;
use App\Models\Follow;
use Illuminate\Support\Facades\Auth;

class FollowRepository extends BaseRepository implements FollowRepositoryInterface
{
    /**
     * FollowRepository constructor.
     * @param Follow $follow
     */
    public function __construct(Follow $follow)
    {
        parent::__construct($follow);
    }

    public function findFollow($data)
    {
        return $this->model->withTrashed()
            ->where('user_id', Auth::user()->id)
            ->where('user_follower_id', $data['user_follower_id'])
            ->first();
    }
}