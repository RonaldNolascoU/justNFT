<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasFactory, Notifiable;
    protected $connection = 'mongodb';
    protected $collection = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * User has many subscriptions
     */
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * User has one role
     */

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * User has many posts
     */

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * User has many likes
     */

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * User has many comments
     */

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * User has many saves
     */

    public function saves()
    {
        return $this->hasMany(Save::class);
    }

    /**
     * Check if user is admin
     */
    public function scopeOfRole($user, $role)
    {
        return $user->where('role_id', $role)->exists();
    }
}
