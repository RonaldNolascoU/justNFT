<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function createWallet()
    {
        if (auth()->user()->wallet_address) {
            return response()->json(['success' => false]);
        }

        $user = User::find(auth()->user()->id);

        $wallet = createWalletWithSeedPhrase();
        $user->wallet_address = $wallet['address'];
        $user->save();

        return response()->json(['success' => true, 'seed' => implode(" ", $wallet['seed']), 'privateKey' => $wallet['private_key'], 'user' => $user]);
    }
}
