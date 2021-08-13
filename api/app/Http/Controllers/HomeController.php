<?php

namespace App\Http\Controllers;

use BIP\BIP44;
use kornrunner\Keccak;
use Sop\CryptoEncoding\PEM;
use Illuminate\Http\Request;
use FurqanSiddiqui\BIP39\BIP39;
use kornrunner\Ethereum\Address;
use RenokiCo\LaravelWeb3\Web3Facade;

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
        dd(isTransactionValid("0x245572b6fc1efd1a12f22954cfbb414691fca5f5", "0x7fa90d19dfca9a59e893714ab8f406b75ab5e5d5766226ca051346d3c290f423"));

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://mainnet.infura.io/v3/8490d4b3096a43d4b70e902b0f59960b');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"id\":1, \"jsonrpc\": \"2.0\", \"method\": \"eth_getTransactionReceipt\",\"params\":[\"0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238\"]}");

        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);

        dd($result);

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
