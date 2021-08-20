<?php

use BIP\BIP44;
use kornrunner\keccak;
use Sop\CryptoEncoding\PEM;
use FurqanSiddiqui\BIP39\BIP39;
use kornrunner\Ethereum\Address;
use Sop\CryptoTypes\Asymmetric\EC\ECPublicKey;
use Sop\CryptoTypes\Asymmetric\EC\ECPrivateKey;

function createWallet()
{
    $config = [
        'private_key_type' => OPENSSL_KEYTYPE_EC,
        'curve_name' => 'secp256k1'
    ];

    $res = openssl_pkey_new($config);
    if (!$res) {
        throw new \Exception('ERROR: Fail to generate private key. -> ' . openssl_error_string());
    }

    // Generate Private Key
    openssl_pkey_export($res, $prev_key);

    // Get The Public Key
    $priv_pem = PEM::fromString($prev_key);

    // Convert to Elliptic Curve Private Key Format
    $ec_priv_key = ECPrivateKey::fromPEM($priv_pem);

    // Then convert it to ASN1 Structure
    $ec_priv_seq = $ec_priv_key->toASN1();

    // Private Key & Public Key in HEX
    $priv_key_hex = bin2hex($ec_priv_seq->at(1)->asOctetString()->string());
    $pub_key_hex = bin2hex($ec_priv_seq->at(3)->asTagged()->asExplicit()->asBitString()->string());


    // Derive the Ethereum Address from public key
    // Every EC public key will always start with 0x04,
    // we need to remove the leading 0x04 in order to hash it correctly
    $pub_key_hex_2 = substr($pub_key_hex, 2);


    // Hash time
    $hash = Keccak::hash(hex2bin($pub_key_hex_2), 256);


    // Ethereum address has 20 bytes length. (40 hex characters long)
    // We only need the last 20 bytes as Ethereum address
    $wallet_address = '0x' . substr($hash, -40);
    $wallet_private_key = '0x' . $priv_key_hex;
    $wallet_pubic_key = '0x' . $pub_key_hex;

    return array("address" => $wallet_address, "private_key" => $wallet_private_key, "public_key" => $wallet_pubic_key);
}

function createWalletWithSeedPhrase()
{
    $mnemonic = BIP39::Generate(24);
    $seedPhrase = $mnemonic->words;
    $passphrase = "";
    $salt = "mnemonic" . $passphrase;
    $mnemonic = implode(" ", $mnemonic->words);
    $seed = hash_pbkdf2("sha512", $mnemonic, $salt, 2048, 64 * 2, false);
    $key = BIP44::fromMasterSeed($seed)->derive("m/44'/60'/0'/0/0");
    $privateKey = $key->privateKey;
    $address = new Address($privateKey);

    $walletAddress = '0x' . $address->get();
    return array("address" => $walletAddress, "private_key" => $address->getPrivateKey(), "seed" => $seedPhrase);
}

function getTransactions($walletAddress)
{
    $url =  'https://api.ftmscan.com/api?module=account&action=tokentx&contractaddress=0x37c045be4641328dfeb625f1dde610d061613497&address=' . $walletAddress . '&page=1&offset=1&sort=desc&apikey=' . config('constants.FTM_KEY');
    $response = file_get_contents($url);
    $response = json_decode($response);

    return $response->result;
}

function isTransactionValid($walletAddress, $transactionHash)
{
    $transactions = getTransactions($walletAddress);
    $transactionsCount = sizeof($transactions);


    if ($transactionsCount == 0) {
        return false;
    }

    if ($transactions[0]->hash == $transactionHash) {
        return true;
    }

    return false;
}

if (!function_exists('ddh')) {
    function ddh($var)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');
        dd($var);
    }
}
