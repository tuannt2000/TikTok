<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private $room_id, $user_id, $text;

    /**
     * Create a new event instance.
     * @param $data
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->room_id = $data['room_id'];
        $this->user_id = $data['user_id'];
        $this->text = $data['text'];
    }

    public function broadcastWith()
    {
        $user = User::find($this->user_id);
        return [
            'user_id' => $this->user_id,
            'nickname' => $user->nickname,
            'text' => $this->text,
            'avatar' => $user->avatar,
            'create_at' => date('d-m-y h:i:s')
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
