<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasFactory, Notifiable, Searchable;
    
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

    public function isAdmin()
    {
        return $this->role_id === 0;
    }

    public function isRegular()
    {
        return $this->role_id === 1;
    }

    public function isCreator()
    {
        return $this->role_id === 2;
    }

    public function isMetamask()
    {
        return $this->role_id === 3;
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
