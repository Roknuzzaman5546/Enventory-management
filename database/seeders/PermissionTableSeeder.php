<?php

  

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Permission;

  

class PermissionTableSeeder extends Seeder

{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {

        $permissions = [
            'create user',
            'edit user',
            'view user',
            'delete user',
            'create permission',
            'edit permission',
            'view permission',
            'delete permission',
            'create roles',
            'edit roles',
            'view roles',
            'delete roles',
            'create product',
            'edit product',
            'view product',
            'delete product'
        ];
        foreach ($permissions as $permission) {
             Permission::create(['name' => $permission]);
        }

    }

}

