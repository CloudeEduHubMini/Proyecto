use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

// Ya no necesitas middleware de web aquí por ahora
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/login', [UsuarioController::class, 'login']);
