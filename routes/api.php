<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Laravel ya agrega el prefijo "/api" automáticamente a este archivo.
// Por eso, cambiamos '/api/tasks' a solo '/tasks'.

Route::get('/tasks', function () {
    return response()->json([
        ["id" => 1, "title" => "Estudiar Azure", "status" => "Pending"],
        ["id" => 2, "title" => "Leer documentación Vite", "status" => "Done"],
    ]);
});
