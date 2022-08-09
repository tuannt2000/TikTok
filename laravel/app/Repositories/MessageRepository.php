<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 7/8/2022
 * Time: 3:37 PM
 */

namespace App\Repositories;

use App\Contracts\Repositories\MessageRepositoryInterface;
use App\Models\Message;

class MessageRepository extends BaseRepository implements MessageRepositoryInterface
{
    /**
     * MessageRepository constructor.
     * @param Message $message
     */
    public function __construct(Message $message)
    {
        parent::__construct($message);
    }

    public function getListMessages($room_id)
    {
        $messages = $this->model->select([
                'user_id',
                'room_id',
                'nickname',
                'text',
                'avatar',
                'messages.created_at as created_at'
            ])->leftJoin('users', 'users.id', '=', 'messages.user_id')
            ->where('room_id', $room_id)
            ->orderBy('messages.created_at', 'DESC')
            ->take(20)
            ->get();

        return $messages;
    }

    public function store($params)
    {
        return $this->model->create($params);
    }
}