<?php

use Illuminate\Support\Facades\Route;

// Ruta raíz solo para verificar que el servidor corre
Route::get('/', function () {
    return 'Backend Laravel funcionando correctamente. Usa /api para conectar.';
});

// (Opcional) Si quieres conservar el Auth de Laravel para entrar a administrar
// cosas manualmente sin React, puedes dejar el resto, pero para tu proyecto
// Frontend NO SE USA.
