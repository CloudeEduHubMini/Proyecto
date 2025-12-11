<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Task;

// --- URL DE TEAMS (Tu Webhook real) ---
const TEAMS_WEBHOOK = "https://itsxedumx.webhook.office.com/webhookb2/d5570f90-34a6-4e6d-b5f3-2976ba651951@7aab5429-e8cd-4d83-b304-328b36175600/IncomingWebhook/f4431cafcee44e718f45ccf12c036685/586a3228-5867-4e11-876f-c40a24be9b8d/V2LqxqY9isio9s8HfDOp2RWomxE4S6Fd-Yn93tJxbxnOA1";

// 1. LOGIN
Route::post('/login', function (Request $request) {
    $user = User::where('email', $request->email)->first();
    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }
    return response()->json(['message' => 'Login exitoso', 'user' => $user]);
});

// 2. REGISTRO
Route::post('/register', function (Request $request) {
    if (User::where('email', $request->email)->exists()) {
        return response()->json(['message' => 'Este correo ya está registrado'], 400);
    }
    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->save();
    return response()->json(['message' => 'Registro exitoso', 'user' => $user]);
});

// 3. CRUD TAREAS

// LEER (GET)
Route::get('/tasks', function (Request $request) {
    $userId = $request->query('user_id'); 
    if (!$userId) return [];
    return Task::where('user_id', $userId)->get();
});

// CREAR (POST) -> Avisa "Nueva Tarea"
Route::post('/tasks', function (Request $request) {
    $task = new Task();
    $task->title = $request->title;
    $task->status = 'Pending';
    $task->user_id = $request->user_id; 
    $task->save();

    // Notificación Teams (Crear)
    try {
        Http::post(TEAMS_WEBHOOK, [
            "@type" => "MessageCard",
            "themeColor" => "0076D7",
            "summary" => "Nueva Tarea",
            "sections" => [[
                "activityTitle" => "🚀 Nueva Tarea Creada",
                "facts" => [
                    ["name" => "Tarea:", "value" => $task->title],
                    ["name" => "Dueño ID:", "value" => (string)$task->user_id]
                ],
                "markdown" => true
            ]]
        ]);
    } catch (\Exception $e) {}

    return $task;
});

// ACTUALIZAR (PUT) -> CORREGIDO: NO DUPLICA, SOLO EDITA
Route::put('/tasks/{id}', function (Request $request, $id) {
    // 1. BUSCAMOS LA TAREA QUE YA EXISTE
    $task = Task::find($id);

    if ($task) {
        // Detectamos qué cambió para el aviso de Teams
        $tipoCambio = "Actualización";
        $color = "0076D7"; // Azul por defecto

        if ($request->has('title')) {
            $task->title = $request->title;
            $tipoCambio = "Texto editado ✏";
        }
        
        if ($request->has('status')) {
            $task->status = $request->status;
            $tipoCambio = "Estado cambiado";
            // Si se completó, ponemos color verde
            if ($task->status === 'Done') $color = "00FF00";
        }
        
        // 2. GUARDAMOS LOS CAMBIOS
        $task->save();

        // Notificación Teams (Editar)
        try {
            Http::post(TEAMS_WEBHOOK, [
                "@type" => "MessageCard",
                "themeColor" => $color,
                "summary" => "Tarea Actualizada",
                "sections" => [[
                    "activityTitle" => "📝 Tarea Actualizada",
                    "facts" => [
                        ["name" => "Tarea:", "value" => $task->title],
                        ["name" => "Cambio:", "value" => $tipoCambio],
                        ["name" => "Estado Actual:", "value" => $task->status]
                    ],
                    "markdown" => true
                ]]
            ]);
        } catch (\Exception $e) {}
    }
    
    return $task;
});

// BORRAR (DELETE)
Route::delete('/tasks/{id}', function ($id) {
    $task = Task::find($id);
    if ($task) {
        $titulo = $task->title;
        $task->delete();

        // Notificación Teams (Borrar)
        try {
            Http::post(TEAMS_WEBHOOK, [
                "@type" => "MessageCard",
                "themeColor" => "FF0000",
                "summary" => "Tarea Eliminada",
                "sections" => [[
                    "activityTitle" => "🗑 Tarea Eliminada",
                    "facts" => [["name" => "Tarea:", "value" => $titulo]],
                    "markdown" => true
                ]]
            ]);
        } catch (\Exception $e) {}
    }
    return response()->json(['message' => 'Eliminado']);
});

// 4. MÉTRICAS
Route::get('/metrics', function () {
    return response()->json([
        'cpu' => rand(5, 60), 
        'ram' => rand(20, 80), 
        'latency' => rand(80, 250) . 'ms', 
        'status' => 'Healthy' 
    ]);
});