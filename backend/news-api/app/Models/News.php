<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title',
        'description',
        'content',
        'image_url',
        'published_at',
        'source',
        'category',
        'author',
        'url'
    ];

    protected $casts = [
        'published_at' => 'datetime'
    ];
}
