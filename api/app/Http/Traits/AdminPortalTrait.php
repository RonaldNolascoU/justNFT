<?php

namespace App\Http\Traits;

use Validator;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

trait AdminPortalTrait
{

    public function listUsers(Request $request)
    {
        $users = User::search($request->q);

        $roles = [];

        if ($request->filter) {
            $role = Role::where('role', $request->filter)->where('role', '!=', 'admin')->first();
            $role = $role->id;
            $users = $users->where('role_id', $role);
        } else {
            $users = $users->whereIn('role_id', [1,2,3]);
        }

        $users = $users->paginate(10);

        return response()->json(['success' => true, 'users' => $users]);
    }

    public function listContentCreators()
    {
        $creators = User::where('role_id', 2)->select('name', 'email', 'username', 'role_id', 'profile_img', 'wallet_address', 'rate')->get();

        return response()->json(['success' => true, 'creators' => $creators]);
    }

    public function getUser(User $user)
    {
        return response()->json(['success' => true, 'user' => $user]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, $validator->errors()], 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['success' => false, 'error' => 'Invalid Credentials'], 422);
        }
        
        if (auth()->user()->role_id != 0) {
            return response()->json(['success' => false, 'error' => 'Not admin user'], 422);
        }

        return $this->createNewToken($token);
    }

    public function approveContentCreator(User $user)
    {
        $user->approved = true;
        $user->role_id = 2;
        $user->save();

        return response()->json(['success' => true]);
    }

    public function rejectContentCreator(User $user)
    {
        $user->approved = false;
        $user->role_id = 1;
        $user->save();

        return response()->json(['success' => true]);
    }

    public function delete(User $user)
    {
        $success = false;
        try {
            $user->delete();
            $success = true;
        } catch (\Exception $error) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
