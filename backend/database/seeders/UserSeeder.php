<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Verifica si ya existe para no crearlo doble
        if (!User::where('email', 'admin@itsx.edu.mx')->exists()) {
            User::create([
                'name' => 'Admin Azure',
                'email' => 'admin@itsx.edu.mx',
                'password' => Hash::make('password123'), // Contraseña encriptada
            ]);
        }
    }
}