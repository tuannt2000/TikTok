<?php

namespace App\Services\Api;

use App\Contracts\Repositories\FollowRepositoryInterface;
use App\Contracts\Services\Api\FollowServiceInterface;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FollowService extends AbstractService implements FollowServiceInterface
{
    /**
     * @var FollowRepositoryInterface
     */
    protected $followRepository;

    /**
     * FollowService constructor.
     * @param FollowRepositoryInterface $roomRepository
     */
    public function __construct(FollowRepositoryInterface $followRepository)
    {
        $this->followRepository = $followRepository;
    }

    /**
     * @param array $data
     * @return array
     */
    public function store($data)
    {
        try {
            $follow = $this->followRepository->findFollow($data);
            if (is_null($follow)) {
                $this->followRepository->create([
                    'user_id' => Auth::user()->id,
                    'user_follower_id' => $data['user_follower_id']
                ]);
            } else {
                if (is_null($follow->deleted_at)) {
                    $follow->delete();
                } else {
                    $follow->restore();
                }
            }

            return [
                'code' => 200
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
