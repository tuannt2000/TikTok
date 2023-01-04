<?php

namespace App\Services\Api;

use App\Contracts\Repositories\RoomRepositoryInterface;
use App\Contracts\Services\Api\RoomServiceInterface;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Log;

class RoomService extends AbstractService implements RoomServiceInterface
{
    /**
     * @var RoomRepositoryInterface
     */
    protected $roomRepository;

    /**
     * RoomService constructor.
     * @param RoomRepositoryInterface $roomRepository
     */
    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    /**
     * @param $user_id
     * @return array
     */
    public function index($user_id)
    {
        try {
            $room_user = $this->roomRepository->findRooms($user_id);
            $list_room = $this->roomRepository->findAllRooms($room_user, $user_id);
            return [
                'code' => 200,
                'data' => $list_room
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
