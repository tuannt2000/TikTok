<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    use HasFactory;

    protected $table = 'shares';

    protected $fillable = [
        'user_id', 
        'recipient_id',
        'video_id'
    ];

    public function message()
    {
        return $this->hasOne(Message::class);
    }

    public function video()
    {
        return $this->belongTo(Video::class);
    }
}
