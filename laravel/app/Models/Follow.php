<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    protected $table = 'follows';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'user_follower_id'
    ];

    /**
     * Get the user associated with the follow.
     */
    public function currentUser()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function userFollowing()
    {
        return $this->hasOne(User::class, 'id', 'user_follower_id');
    }

    public function scopeOfFollowingCount($query, $user_id)
    {
        return $query->where('user_id', $user_id)->count();
    }

    public function scopeOfFollowerCount($query, $user_id)
    {
        return $query->where('user_follower_id', $user_id)->count();
    }
}
