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
                'rooms.room_id as room_id',
                'avatar',
                'text',
                'm1.created_at as created_at',
            ])
            ->leftJoin('users', 'users.id', '=', 'rooms.user_id')
            ->leftJoin('messages as m1', 'm1.room_id', '=', 'rooms.room_id')
            ->whereIn('rooms.room_id', $rooms_id)
            ->where('rooms.user_id', '!=', $user_id)
            ->whereRaw('m1.created_at = (select max(m2.created_at) from messages as m2 where m2.room_id = m1.room_id)')
            ->get();

        return $list_room;
    }
}