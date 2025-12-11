<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Buena práctica tenerlo

class Task extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables en masa.
     * Esto es NECESARIO para que Task::create() funcione.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',    // Nombre de la tarea
        'status',   // Estado (Pending/Done)
        'user_id',  // <--- ¡NUEVO! El ID del dueño de la tarea
    ];
}