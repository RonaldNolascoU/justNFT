<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class CreateRoles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['id' => 0, 'role' => 'admin',],
            ['id' => 1, 'role' => 'regular',],
            ['id' => 2, 'role' => 'creator',],
            ['id' => 3, 'role' => 'metamask',],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
