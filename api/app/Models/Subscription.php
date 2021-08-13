<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Subscription extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'subscriptions';

    protected $guarded = [];

    // id, creator id, user id, transaction id, amount, start_date, expire_date, created_at, updated_at

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
