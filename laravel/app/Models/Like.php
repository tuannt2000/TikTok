<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $table = 'likes';

    public function scopeOfLikesCount($query, $user_id)
    {
        return $query
            ->join('videos', 'videos.id', '=', 'likes.video_id')
            ->where('videos.user_id', $user_id)
            ->distinct('likes.user_id')->count();
    }
}
