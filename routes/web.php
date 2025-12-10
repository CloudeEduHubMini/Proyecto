<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


// ===================================================================
// 🚀 RUTA API TEMPORAL AGREGADA PARA LA CONEXIÓN CON EL FRONTEND VITE
// Esta ruta responde a http://127.0.0.1:8000/api/tasks
// ===================================================================

Route::get('/api/tasks', function () {
    // Usamos response()->json() para devolver datos en formato API
    return response()->json([
        ["id" => 1, "title" => "Estudiar Azure", "status" => "Pending"],
        ["id" => 2, "title" => "Leer documentación Vite", "status" => "Done"],
    ]);
});