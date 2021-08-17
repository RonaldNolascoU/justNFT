<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function listUsers()
    {
        $users = User::where('role_id', '!=', 3)->get();
        dd($users->toArray());
    }

    public function listCreators()
    {
        $users = User::where('role_id', 3)->get();
        dd($users->toArray());
    }
}
