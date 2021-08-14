<?php

namespace App\Http\Controllers\Auth\Api;

use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'success' => true,
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'nullable|string|unique:users',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)],
            ['role_id' => 1],
        ));

        $user->sendEmailVerificationNotification();

        return response()->json([
            'success' => true,
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function registerWithMetamask(Request $request)
    {
        $user = User::where('wallet_address', $request->wallet_address)->first();

        if (!$user) {
            $validator = Validator::make($request->all(), [
                'wallet_address' => 'required|unique:users',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $user = User::create(array_merge(
                $validator->validated(),
                [
                    'email' => time() . '@metamask.com',
                    'email_verified_at' => now(),
                    'role_id' => 3,
                ],
            ));
        }

        \Auth::login($user, true);

        return response()->json([
            'success' => true,
            'message' => 'User successfully registered',
            'user' => $user,
            'token' =>  JWTAuth::fromUser($user),
        ], 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, $validator->errors()], 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['success' => true, 'message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function currentUser()
    {
        try {
            return response()->json(['success' => true, 'user' => auth()->user()]);
        } catch (\Exception $error) {
            return response()->json(['success' => false]);
        }
    }

    /**
     * Change the current password
     * @param Request $request
     * @return Renderable
     */
    public function changePassword(Request $request)
    {
        if (!auth()->user()->isMetamask()) {
            $user = \Auth::user();
            $userPassword = $user->password;

            $request->validate([
                'old_password' => 'required',
                'new_password' => 'required|same:confirm_password|min:6',
                'confirm_password' => 'required',
            ]);

            if (!Hash::check($request->old_password, $userPassword)) {
                return response()->json(
                    ['success' => false, 'message' => 'password not match']
                );
            }

            $user->password = Hash::make($request->new_password);
            $user->save();

            return response()->json(
                ['success' => true, 'message' => 'password successfully updated', 'user' => auth()->user()]
            );
        }

        return response()->json(['success' => false, 'msg' => 'Unauthorized'], 403);
    }
}
