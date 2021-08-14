<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Subscription;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $creators = User::where('role_id', 2)->select('name', 'username', 'role_id', 'profile_img', 'wallet_address', 'rate')->get();

        return response()->json(['success' => true, 'creators' => $creators]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        if ($username != 'me') {
            $creator = User::where('role_id', 2)->where('username', $username)->select('name', 'username', 'role_id', 'profile_img', 'wallet_address', 'rate')->first();
            if ($creator) {
                $subscription = Subscription::where('creator_id', $creator->id)->where('user_id', auth()->user()->id)->first();
                $creator->isSubscribed = $subscription ? true : false;
            }
        } else {
            $creator = User::where('_id', auth()->user()->id)->select('name', 'username', 'role_id', 'profile_img', 'wallet_address')->first();
            $creator->me = true;
        }

        if (is_null($creator)) {
            return response()->json(['success' => false]);
        }

        $creator->posts = $creator->posts;
        $creator->likes = $creator->likes ? $creator->likes->count() : [];

        return response()->json(['success' => true, 'user' => $creator]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
