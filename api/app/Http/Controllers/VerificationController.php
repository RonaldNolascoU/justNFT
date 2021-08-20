<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\URL;
use App\Notifications\WelcomeNotification;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "Invalid/Expired url provided."], 401);
        }

        $user = User::findOrFail($user_id);
        $token = null;
        
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            $token = JWTAuth::fromUser($user);
            \Auth::login($user, true);
            $url = env('APP_FRONT_URL') . '/wallet?token=' . $token;
            return redirect()->to($url);
        }

        $url = env('APP_FRONT_URL') . '/404';
        return redirect()->to($url);
    }

    public function resend()
    {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["msg" => "Email already verified."], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json(["msg" => "Email verification link sent on your email"]);
    }
}
