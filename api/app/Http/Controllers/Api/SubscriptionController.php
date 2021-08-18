<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Subscription;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubscribeRequest;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = new Subscription();

        $allSubs = $subscriptions->where('user_id', auth()->user()->id)
            ->with('creator')
            ->get();
        $renewSubs = $subscriptions->where('user_id', auth()->user()->id)
            ->whereDate('expire_date', '<', now())
            ->with('creator')
            ->get();
        $activeSubs = $subscriptions->where('user_id', auth()->user()->id)
            ->whereDate('expire_date', '>=', now())
            ->with('creator')
            ->get();

        return response()->json([
            'success' => true,
            'subscriptions' => [
                'all' => $allSubs,
                'renew' => $renewSubs,
                'active' => $activeSubs,
            ]
        ]);
    }

    // TODO: Refactor this shitty code. Right now im sleeping asf
    public function subscribe(SubscribeRequest $request)
    {
        if (!auth()->user()->isCreator()) {
            $request->merge([
                'user_id' => auth()->user()->id,
                'start_date' => now()->format('Y-m-d h:i:s'),
                'expire_date' => Carbon::now()->addMonth(1)->format('Y-m-d h:i:s')
            ]);

            if ($request->transactionId == 'free') {
                $subscription = Subscription::create($request->all());
                return response()->json(['success' => $subscription]);
            }

            if (isTransactionValid($request->wallet_address, $request->transactionId)) {
                $subscription = Subscription::create($request->all());
                return response()->json(['success' => $subscription]);
            }

            return response()->json(['success' => false, 'msg' => 'Transaction is still processing or is invalid']);
        }
        return response()->json(['success' => false, 'msg' => 'Unauthorized'], 403);
    }
}
