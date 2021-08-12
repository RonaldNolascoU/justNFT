<?php

namespace App\Http\Controllers;

use BIP\BIP44;
use kornrunner\Keccak;
use Sop\CryptoEncoding\PEM;
use Illuminate\Http\Request;
use FurqanSiddiqui\BIP39\BIP39;
use kornrunner\Ethereum\Address;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $mnemonic = BIP39::Generate(24);
        $passphrase = "";
        $salt = "mnemonic" . $passphrase;
        $mnemonic = implode(" ", $mnemonic->words);
        $seed = hash_pbkdf2("sha512", $mnemonic, $salt, 2048, 64 * 2, false);
        $key = BIP44::fromMasterSeed($seed)->derive("m/44'/60'/0'/0/0");
        $privateKey = $key->privateKey;
        $address = new Address($privateKey);
        dd('0x' . $address->get(), $address->getPrivateKey(), $address->getPublicKey(), $key);

        return view('home');
    }
}
