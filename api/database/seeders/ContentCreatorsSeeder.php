<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ContentCreatorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $creators = [
            [
                'email' => 'contact@justyours.me',
                'password' => Hash::make(12341234),
                'role_id' => 2,
                'wallet_address' => "0x245572B6fc1EFd1a12f22954Cfbb414691FCA5f5",
                "email_verified_at" => "2021-08-12T05:23:01.804+00:00",
                "username" => "justyours",
                "approved" => true,
                "name" => "Just Yours",
                "rate" => 0
            ],
            [
                'email' => 'contact1@justyours.me',
                'password' => Hash::make(12341234),
                'role_id' => 2,
                'wallet_address' => "0x245572B6fc1EFd1a12f22954Cfbb414691FCA5f5",
                "email_verified_at" => "2021-08-12T05:23:01.804+00:00",
                "username" => "lana1800",
                "approved" => true,
                "name" => "Lana Fernandes",
                "rate" => 12
            ],
            [
                'email' => 'contact2@justyours.me',
                'password' => Hash::make(12341234),
                'role_id' => 2,
                'wallet_address' => "0x245572B6fc1EFd1a12f22954Cfbb414691FCA5f5",
                "email_verified_at" => "2021-08-12T05:23:01.804+00:00",
                "username" => "sarina",
                "approved" => true,
                "name" => "Sarina Izvyk",
                "rate" => 7
            ],
            [
                'email' => 'contact3@justyours.me',
                'password' => Hash::make(12341234),
                'role_id' => 2,
                'wallet_address' => "0x245572B6fc1EFd1a12f22954Cfbb414691FCA5f5",
                "email_verified_at" => "2021-08-12T05:23:01.804+00:00",
                "username" => "mariska",
                "approved" => true,
                "name" => "Mariska",
                "rate" => 5
            ],
        ];

        User::insert($creators);
    }
}
