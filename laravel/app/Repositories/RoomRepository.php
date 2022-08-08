<?php

namespace App\Repositories;

use App\Contracts\Repositories\RoomRepositoryInterface;
use App\Models\Room;

class RoomRepository extends BaseRepository implements RoomRepositoryInterface
{
    /**
     * RoomRepository constructor.
     * @param Room $room
     */
    public function __construct(Room $room)
    {
        parent::__construct($room);
    }

    public function findRooms($user_id) {
        return $this->model->where('user_id', $user_id)->get();
    }

    public function findAllRooms($room_user, $user_id) {
        $rooms_id = [];
        foreach ($room_user as $value) {
            $rooms_id[] = $value->room_id;
        }

        $list_room = $this->model
            ->select([
                'nickname',
                'room_id',
                'avatar'
            ])
            ->leftJoin('users', 'users.id', '=', 'rooms.user_id')
            ->whereIn('room_id', $rooms_id)
            ->where('user_id', '!=', $user_id)
            ->get();

        return $list_room;
    }
}