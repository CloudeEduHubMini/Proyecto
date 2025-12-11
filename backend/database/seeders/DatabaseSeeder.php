<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash; // <--- Importante para encriptar la contraseña

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Verificamos si el usuario ya existe para no duplicarlo al correr el comando varias veces
        if (!User::where('email', 'admin@itsx.edu.mx')->exists()) {
            
            User::create([
                'name' => 'Admin Azure',
                'email' => 'admin@itsx.edu.mx',   // <--- ESTE SERÁ TU USUARIO
                'password' => Hash::make('password123'), // <--- ESTA SERÁ TU CONTRASEÑA
            ]);
            
            $this->command->info('¡Usuario Admin creado exitosamente!');
        } else {
            $this->command->info('El usuario Admin ya existe. No se hizo nada.');
        }
    }
}