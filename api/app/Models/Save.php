<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Save extends Model
{
    protected $collection = 'saves';
    protected $connection = 'mongodb';
    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
