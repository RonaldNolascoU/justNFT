<?php

namespace App\Http\Controllers\Auth\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest');
    }


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function registerUser()
    {
        $user = new User();
        $user->email = request()->email;
        $user->role = 'user';
        $user->password = Hash::make(request()->password);
        $user->save();

        return response()->json(['success' => true, 'user' => $user]);
    }
}
