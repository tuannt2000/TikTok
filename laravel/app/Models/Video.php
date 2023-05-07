<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'path_directory',
        'cover_image',
        'url',
        'description',
        'status',
        'comment',
        'date_upload'
    ];

    protected $table = 'videos';

    protected static function boot() {
        parent::boot();
        static::deleting(function($video) { // before delete() method call this
            $video->likes()->delete();
            $video->comments()->delete();
        });
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function following()
    {
        return $this->hasMany(Follow::class, 'user_follower_id', 'user_id');
    }
}
