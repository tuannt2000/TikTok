<?php

namespace App\Contracts\Services\Api;

interface RoomServiceInterface
{
    public function index($user_id);
    public function removeNotification($notification_id);
}