<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $casts = [
        'room_id'  => 'int',
        'user_id'  => 'int',
        'video_id' => 'int',
    ];

    protected $fillable = [
        'room_id', 
        'user_id',
        'video_id',
        'text',
        'date_send'
    ];

    public static function booted()
    {
        static::created(function($message){
            $recipient_id = Room::ofUsersByRoomId($message->room_id, $message->user_id)->user_id;
            Notification::updateOrCreate([
                'user_id'      => $message->user_id,
                'recipient_id' => $recipient_id,
                'table_name'   => 'messages',
            ],[
                'table_id'     => $message->id,
                'checked'      => false
            ]);
        });
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
