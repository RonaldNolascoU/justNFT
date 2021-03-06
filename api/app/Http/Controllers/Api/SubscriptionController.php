<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Transaction;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\SubscriptionProcessJob;
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
                'expire_date' => Carbon::now()->addMonth(1)->format('Y-m-d h:i:s'),
            ]);

            if ($request->transactionId == 'free') {
                $subscription = Subscription::create($request->all());
                return response()->json(['success' => $subscription]);
            }

            $transaction = Transaction::create([
                'status' => 'pending',
                'amount' => $request->amount,
                'transactionId' => $request->transactionId,
                'to' => $request->wallet_address_to,
                'from' => $request->wallet_address,
                'creator_id' => $request->creator_id,
                'user_id' => auth()->user()->id,
            ]);

            $request->merge([
                'transaction_id' => $transaction->_id
            ]);

            SubscriptionProcessJob::dispatch(auth()->user(), $transaction, $request->all())
                ->delay(now()->addSeconds(5));

            return response()->json([
                'success' => true, 'message' => "You will notified when your subscription is complete."
            ]);
        }
        return response()->json(['success' => false, 'msg' => 'Unauthorized'], 403);
    }

    public function updateRate(Request $request)
    {
        if (!auth()->user()->isCreator() || is_null($request->rate) || !is_numeric(floatval($request->rate))) {
            return response()->json(['success' => false]);
        }

        auth()->user()->update(['rate' => $request->rate]);
        return response()->json(['success' => true]);
    }
}
