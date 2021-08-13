<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Save extends Model
{
    protected $collection = 'saves';
    protected $connection = 'mongodb';
}
