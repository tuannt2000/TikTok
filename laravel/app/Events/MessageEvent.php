<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private $room_id, $user_id, $nickname, $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($room_id, $user_id, $nickname, $message)
    {
        $this->room_id = $room_id;
        $this->user_id = $user_id;
        $this->nickname = $nickname;
        $this->message = $message;
    }

    public function broadcastWith()
    {
        return [
            'user_id' => $this->user_id,
            'nickname' => $this->nickname,
            'text' => $this->message,
//            'createdAt' => now()->toDateTimeString(),
        ];
    }

    public function broadcastAs()
    {
        return 'message.new';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('room.'.$this->room_id);
    }
}
