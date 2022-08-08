<?php
namespace App\Contracts\Repositories;

interface RoomRepositoryInterface extends BaseRepositoryInterface
{
    public function findRooms($user_id);
    public function findAllRooms($room_user, $user_id);
}