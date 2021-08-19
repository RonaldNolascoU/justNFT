<?php

namespace App\Models;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\Model;

class Subscription extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'subscriptions';

    protected $guarded = [];
    protected $appends = ['active'];

    // id, creator id, user id, transaction id, amount, start_date, expire_date, created_at, updated_at

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function getActiveAttribute()
    {
        return Carbon::parse($this->expire_date) > now();
    }
}
