<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Like extends Model
{
    protected $collection = 'likes';
    protected $connection = 'mongodb';
}
