<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;

class EmailVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        $user = auth()->check() ? auth()->user() : User::where('email', $request->email)->first();

        if (!$user->hasVerifiedEmail()) {
            return response()->json(['success' => false, 'message' => 'Your email address is not verified.'], 403);
        }

        return $next($request);
    }
}
