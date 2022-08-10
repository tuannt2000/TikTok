<?php

namespace App\Repositories;

use App\Contracts\Repositories\RoomRepositoryInterface;
use App\Models\Room;
use Illuminate\Support\Facades\DB;

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
            ->select(
                'm1.user_id as text_user_id',
                'rooms.user_id as room_user_id',
                'nickname',
                'rooms.room_id as room_id',
                'avatar',
                'text',
                DB::raw('(CASE 
                        WHEN m1.date_send is NULL THEN rooms.created_at
                        ELSE m1.date_send
                        END) AS created_at')
            )
            ->leftJoin('users', 'users.id', '=', 'rooms.user_id')
            ->leftJoin('messages as m1', function ($query) use ($user_id) {
                $query->on('m1.room_id', '=', 'rooms.room_id');
                $query->whereRaw('m1.date_send = (select max(m2.date_send) from messages as m2 where m2.room_id = m1.room_id and rooms.user_id !=' . $user_id . ')');
            })
            ->whereIn('rooms.room_id', $rooms_id)
            ->where('rooms.user_id', '!=', $user_id)
            ->get();

        return $list_room;
    }
}