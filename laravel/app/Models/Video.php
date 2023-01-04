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
        'cover_image',
        'url',
        'description',
        'status',
        'comment',
        'duet',
        'stitch',
        'date_upload'
    ];

    protected $table = 'videos';
}
