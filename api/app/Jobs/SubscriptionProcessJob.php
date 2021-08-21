<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Transaction;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use App\Notifications\SubscriptionCompletedNotify;

class SubscriptionProcessJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $request;
    public $transaction;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, $transaction, $request)
    {
        $this->user = $user;
        $this->request = $request;
        $this->transaction = $transaction;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->isValidTransaction(0);
    }

    public function isValidTransaction($i)
    {
        if ($i === 10) {
            Transaction::where('_id', $this->transaction->_id)->update(['status' => 'failed']);

            $this->fail();
            return false;
        }

        if (isTransactionValid($this->request['wallet_address'], $this->request['transactionId'])) {
            Transaction::where('_id', $this->transaction->_id)->update(['status' => 'completed']);
            unset($this->request['wallet_address_to'], $this->request['wallet_address']);
            Subscription::create($this->request);

            if ($this->user->role_id == 1) {
                $this->user->notify(
                    new SubscriptionCompletedNotify(
                        $this->user,
                        $this->request['username'],
                        $this->request['amount']
                    )
                );
            }
            return true;
        } else {
            $this->isValidTransaction($i++);
        }
    }
}
