<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines which domains or "origins" may access your
    | application via HTTP requests. 
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Permite todos los métodos (GET, POST, PUT, DELETE)

    'allowed_origins' => [
        'http://localhost:5173', // <--- ¡Esta es la línea clave que tú modificaste!
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permite todos los headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Cambiar a 'true' si usas Sanctum/Cookies (futuro)

];