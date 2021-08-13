<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function forgot()
    {
        request()->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            request()->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['success' => true, 'msg' => 'Reset password link sent on your email id.']);
        }
        return response()->json(['success' => false, 'msg' => 'Something went wrong']);
    }

    public function reset()
    {
        $credentials = request()->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $reset_password_status = Password::reset($credentials, function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json(['success' => false, 'msg' => 'Invalid token provided'], 400);
        }

        return response()->json(['success' => true, 'msg' => 'Password has been successfully changed']);
    }

    public function resetPassword()
    {
        $token = request()->token;
        $email = request()->email;
        $url = env('APP_FRONT_URL') . "reset-password?code=$token&email=$email";

        return redirect()->to($url);
    }
}
