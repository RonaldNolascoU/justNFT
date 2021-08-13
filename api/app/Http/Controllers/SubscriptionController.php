<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Requests\SubscribeRequest;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::where('user_id', auth()->user()->id)->get();

        return response()->json(['success' => true, 'subscriptions' => $subscriptions]);
    }

    // TODO: Content creator cannot subscribe
    // TODO: Refactor this shitty code. Right now im sleeping asf
    public function subscribe(SubscribeRequest $request)
    {
        $request->merge([
            'user_id' => auth()->user()->id,
            'start_date' => now()->format('Y-m-d h:i:s'),
            'expire_date' => Carbon::now()->addMonth(1)->format('Y-m-d h:i:s')
        ]);

        if ($request->transaction_id == 'free') {
            $subscription = Subscription::create($request->all());
            return response()->json(['success' => $subscription ]);
        }

        if (isTransactionValid($request->wallet_address, $request->transactionId)) {
            $subscription = Subscription::create($request->all());
            return response()->json(['success' => $subscription ]);
        }
    
        return response()->json(['success' => false, 'msg' => 'Transaction is still processing or is invalid']);
    }
}