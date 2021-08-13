<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CreatorController extends Controller
{
    public function approveCreator()
    {
        if (auth()->user()->isAdmin()) {
            $user = User::where('email', request()->email)->first();
            $user->role = 2;
            $user->approved = true;
            $user->save();

            return response()->json(['success' => true, 'message' => 'user approved']);
        }

        return response()->json(['success' => false, 'message' => 'forbidden'], 403);
    }
}
