<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],     // <--- Deja entrar a todos (Ngrok, localhost, etc)
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],     // <--- CRÍTICO: Deja pasar el header de Ngrok
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];