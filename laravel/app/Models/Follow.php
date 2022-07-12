<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    protected $table = 'follows';

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
}
