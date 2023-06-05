<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = [
        'room_id', 
        'user_id',
        'video_id',
        'text',
        'date_send'
    ];

    public function video()
    {
        return $this->belongsTo(Video::class);
    }
}
