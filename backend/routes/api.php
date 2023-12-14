<?php

use App\Http\Controllers\AdecuacionArchivadosController;
use App\Http\Controllers\AdecuacionCaducadosController;
use App\Http\Controllers\AdecuacionController;
use App\Http\Controllers\AdecuacionInformeController;
use App\Http\Controllers\AdecuacionPersonaColectivaController;
use App\Http\Controllers\AdecuacionSeguimientoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\ReservanombreController;
use App\Http\Controllers\AdministrativoController;
use App\Http\Controllers\FundadoresAdecuacionController;
use App\Http\Controllers\FundadoresGobernacionController;
use App\Http\Controllers\FundadoresOtorgacionController;
use App\Http\Controllers\GobernacionController;
use App\Http\Controllers\GobernacionOtorgacionController;
use App\Http\Controllers\ModificacionAdecuacionController;
use App\Http\Controllers\ModificacionController;
use App\Http\Controllers\ModificacionOtorgacionController;
use App\Http\Controllers\OtorgacionArchivadosController;
use App\Http\Controllers\OtorgacionCaducadosController;
use App\Http\Controllers\OtorgacionController;
use App\Http\Controllers\OtorgacionInformeController;
use App\Http\Controllers\OtorgacionSeguimientoController;
use App\Http\Controllers\RegistradosController;
use App\Http\Controllers\RegistroPersonaColectivaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// rutas para la autenticacion
Route::post('/auth/login', [AuthController::class, 'login'])
    ->name('auth.login');
Route::middleware(['auth:sanctum'])->get('auth/logout', [AuthController::class, 'logout'])
    ->name('auth.logout');
Route::middleware(['auth:sanctum'])->post('/auth/update', [UserController::class, 'profile'])
    ->name('user.profile');

// rutas para administrativos
Route::middleware(['auth:sanctum'])->get('/administrativos', [AdministrativoController::class, 'index'])
    ->name('administrativos');
Route::middleware(['auth:sanctum'])->get('/administrativo/show/{administrativo}', [AdministrativoController::class, 'show'])
    ->name('administrativo.show');
Route::middleware(['auth:sanctum'])->post('/administrativo/store', [AdministrativoController::class, 'store'])
    ->name('administrativo.store');
Route::middleware(['auth:sanctum'])->put('/administrativo/update/{administrativo}', [AdministrativoController::class, 'update'])
    ->name('administrativo.update');
Route::middleware(['auth:sanctum'])->delete('/administrativo/destroy/{administrativo}', [AdministrativoController::class, 'destroy'])
    ->name('administrativo.destroy');
Route::middleware(['auth:sanctum'])->post('/administrativo/password', [AdministrativoController::class, 'password'])
    ->name('administrativo.password');

// rutas para usuario gobernacion
Route::middleware(['auth:sanctum'])->get('/gobernacions', [GobernacionController::class, 'index'])
    ->name('gobernacions');
Route::middleware(['auth:sanctum'])->get('/gobernacion/show/{gobernacion}', [GobernacionController::class, 'show'])
    ->name('gobernacion.show');
Route::middleware(['auth:sanctum'])->post('/gobernacion/store', [GobernacionController::class, 'store'])
    ->name('gobernacion.store');
Route::middleware(['auth:sanctum'])->put('/gobernacion/update/{gobernacion}', [GobernacionController::class, 'update'])
    ->name('gobernacion.update');
Route::middleware(['auth:sanctum'])->delete('/gobernacion/destroy/{gobernacion}', [GobernacionController::class, 'destroy'])
    ->name('gobernacion.destroy');
Route::middleware(['auth:sanctum'])->post('/gobernacion/password', [GobernacionController::class, 'password'])
    ->name('gobernacion.password');

//rutas para reverva de nombre
Route::middleware(['auth:sanctum'])->get('/reservas/solicitudes', [ReservanombreController::class, 'index'])
    ->name('reservas.solicitudes');
Route::middleware(['auth:sanctum'])->get('/reservas/homonimias', [ReservanombreController::class, 'homonimias'])
    ->name('reservas.homonimias');
Route::middleware(['auth:sanctum'])->get('/reserva/show/{reserva_nombre}', [ReservanombreController::class, 'show'])
    ->name('reserva.show');
Route::middleware(['auth:sanctum'])->post('/reserva/store', [ReservanombreController::class, 'store'])
    ->name('reserva.store');
Route::middleware(['auth:sanctum'])->put('/reserva/update/{reserva_nombre}', [ReservanombreController::class, 'update'])
    ->name('reserva.update');
Route::middleware(['auth:sanctum'])->post('/reserva-nombres/entregar/{reserva_nombre}', [ReservanombreController::class, 'entregar'])
    ->name('reserva.entregar');

// rutas para el registro reservados
Route::middleware(['auth:sanctum'])->get('/registros', [RegistroController::class, 'index'])
    ->name('registros');
Route::middleware(['auth:sanctum'])->post('/registro/entregar/{registro}', [RegistroController::class, 'entregar'])
    ->name('registro.entregar');
Route::middleware(['auth:sanctum'])->post('/registro/caducar/{registro}', [RegistroController::class, 'caducar'])
    ->name('registro.caducar');
Route::middleware(['auth:sanctum'])->get('/registros/caducados', [RegistroController::class, 'getcaducados'])
    ->name('registros.caducados');

// rutas para la verificacion buscador
Route::middleware(['auth:sanctum'])->get('/verificacion/entidades', [VerificacionController::class, 'verificacion'])
    ->name('entidad.verificacion');
Route::middleware(['auth:sanctum'])->post('/verificacion/homonimia/{reserva_nombre}', [VerificacionController::class, 'homonimia'])
    ->name('entidad.homonimia');
Route::middleware(['auth:sanctum'])->post('/verificacion/registro/{reserva_nombre}', [VerificacionController::class, 'registro'])
    ->name('entidad.registro');

// rutas para otorgacion de nombre
Route::middleware(['auth:sanctum'])->get('/otorgaciones', [OtorgacionController::class, 'index'])
    ->name('otorgaciones');
Route::middleware(['auth:sanctum'])->get('/otorgacion/show/{otorgacion}', [OtorgacionController::class, 'show'])
    ->name('otorgacion.show');
Route::middleware(['auth:sanctum'])->post('/otorgacion/store', [OtorgacionController::class, 'store'])
    ->name('otorgacion.store');
// otorgacion caducados 
Route::middleware(['auth:sanctum'])->get('/otorgacion/caducados', [OtorgacionCaducadosController::class, 'getcaducados'])
    ->name('otorgaciones.caducados');
Route::middleware(['auth:sanctum'])->post('/otorgacion/caducar/{otorgacion}', [OtorgacionCaducadosController::class, 'caducar'])
    ->name('otorgacion.caducar');
// otorgacion archivados 
Route::middleware(['auth:sanctum'])->get('/otorgacion/archivados', [OtorgacionArchivadosController::class, 'getarchivados'])
    ->name('otorgaciones.archivados');
Route::middleware(['auth:sanctum'])->post('/otorgacion/archivar/{otorgacion}', [OtorgacionArchivadosController::class, 'archivar'])
    ->name('otorgacion.archivar');
Route::middleware(['auth:sanctum'])->post('/otorgacion/desarchivar/{otorgacion}', [OtorgacionArchivadosController::class, 'desarchivar'])
    ->name('otorgacion.desarchivar');

// Route::middleware(['auth:sanctum'])->put('/otorgacion/update/{otorgacion}', [OtorgacionController::class, 'update'])->name('otorgacion.update'); // todavia no existe
Route::middleware(['auth:sanctum'])->post('/otorgacion/informe/store', [OtorgacionInformeController::class, 'store'])
    ->name('otorgacion.informe.store');
Route::middleware(['auth:sanctum'])->post('/otorgacion/seguimiento/store', [OtorgacionSeguimientoController::class, 'store'])
    ->name('otorgacion.seguimiento.store');
Route::middleware(['auth:sanctum'])->post('/fundadores/store', [FundadoresOtorgacionController::class, 'store'])
    ->name('otorgacion.fundadores.store');
Route::middleware(['auth:sanctum'])->post('/otorgacion/registro-final', [OtorgacionController::class, 'registro'])
    ->name('otorgacion.registro.final');
Route::middleware(['auth:sanctum'])->post('/registro-persona-colectiva/store', [RegistroPersonaColectivaController::class, 'store'])
    ->name('otorgacion.persona.store');
//personalidades juridicas
Route::middleware(['auth:sanctum'])->get('/otorgacion/personalidades', [OtorgacionController::class, 'personalidades'])
    ->name('otorgacion.personalidades.juridicas');
// revocatorias
Route::middleware(['auth:sanctum'])->get('/otorgacion/revocatorias', [OtorgacionController::class, 'getrevocatorias'])
    ->name('otorgacion.revocatorias');
Route::middleware(['auth:sanctum'])->post('/otorgacion/revocatoria/store', [OtorgacionController::class, 'revocatoria'])
    ->name('otorgacion.revocatoria.store');


//rutas para adecuacion
Route::middleware(['auth:sanctum'])->get('/adecuaciones', [AdecuacionController::class, 'index'])
    ->name('adecuaciones');
Route::middleware(['auth:sanctum'])->get('/adecuacion/show/{adecuacion}', [AdecuacionController::class, 'show'])
    ->name('adecuacion.show');
Route::middleware(['auth:sanctum'])->post('/adecuacion/store', [AdecuacionController::class, 'store'])
    ->name('adecuacion.store');
// Route::middleware(['auth:sanctum'])->put('/adecuacion/update/{adecuacion}', [AdecuacionController::class, 'update'])->name('adecuacion.update'); // todavia no existe
Route::middleware(['auth:sanctum'])->post('/adecuacion/seguimiento/store', [AdecuacionSeguimientoController::class, 'store'])
    ->name('adecuacion.seguimiento.store');
Route::middleware(['auth:sanctum'])->post('/adecuacion/informe/store', [AdecuacionInformeController::class, 'store'])
    ->name('adecuacion.informe.store');
Route::middleware(['auth:sanctum'])->post('/fundadores/adecuacion/store', [FundadoresAdecuacionController::class, 'store'])
    ->name('fundadores.adecuacion.store');
Route::middleware(['auth:sanctum'])->post('/adecuacion/registro-final', [AdecuacionController::class, 'registro'])
    ->name('adecuacion.registro.final');
Route::middleware(['auth:sanctum'])->post('/adecuacion-persona-colectiva/store', [AdecuacionPersonaColectivaController::class, 'store'])
    ->name('adecuacion.persona.store');
//personalidades
Route::middleware(['auth:sanctum'])->get('/adecuacion/personalidades', [AdecuacionController::class, 'personalidades'])
    ->name('adecuacion.personalidades');
// revocatorias
Route::middleware(['auth:sanctum'])->get('/adecuacion/revocatorias', [AdecuacionController::class, 'getrevocatorias'])
    ->name('adecuacion.revocatorias');
Route::middleware(['auth:sanctum'])->post('/adecuacion/revocatoria/store', [AdecuacionController::class, 'revocatoria'])
    ->name('adecuacion.revocatoria.store');

// adecuacion caducados 
Route::middleware(['auth:sanctum'])->get('/adecuacion/caducados', [AdecuacionCaducadosController::class, 'getcaducados'])
    ->name('adecuaciones.caducados');
Route::middleware(['auth:sanctum'])->post('/adecuacion/caducar/{adecuacion}', [AdecuacionCaducadosController::class, 'caducar'])
    ->name('adecuacion.caducar');
// adecuacion archivados 
Route::middleware(['auth:sanctum'])->get('/adecuacion/archivados', [AdecuacionArchivadosController::class, 'getarchivados'])
    ->name('adecuaciones.archivados');
Route::middleware(['auth:sanctum'])->post('/adecuacion/archivar/{adecuacion}', [AdecuacionArchivadosController::class, 'archivar'])
    ->name('adecuacion.archivar');
Route::middleware(['auth:sanctum'])->post('/adecuacion/desarchivar/{adecuacion}', [AdecuacionArchivadosController::class, 'desarchivar'])
    ->name('adecuacion.desarchivar');


// para las otorgaciones gobernacions
Route::middleware(['auth:sanctum'])->get('/otorgacion-gobernacions', [GobernacionOtorgacionController::class, 'index'])
    ->name('otorgacion.gobernacione');
Route::middleware(['auth:sanctum'])->get('/otorgacion-gobernacion/show/{otorgacion_gobernacion}', [GobernacionOtorgacionController::class, 'show'])
    ->name('otorgacion.gobernacion.show');
Route::middleware(['auth:sanctum'])->post('/otorgacion-gobernacion/store', [GobernacionOtorgacionController::class, 'store'])
    ->name('otorgacion.gobernacion.store');
Route::middleware(['auth:sanctum'])->put('/otorgacion-gobernacion/update/{otorgacion_gobernacion}', [GobernacionOtorgacionController::class, 'update'])
    ->name('otorgacion.gobernacion.update');
Route::middleware(['auth:sanctum'])->delete('/otorgacion-gobernacion/destroy/{otorgacion_gobernacion}', [GobernacionOtorgacionController::class, 'destroy'])
    ->name('otorgacion.gobernacion.destroy');
// para los fundadores goberancion otorgacion
Route::middleware(['auth:sanctum'])->post('/otorgacion-gobernacion-fundador/store', [FundadoresGobernacionController::class, 'store'])
    ->name('gobernacion.fundador.store');
Route::middleware(['auth:sanctum'])->put('/otorgacion-gobernacion-fundador/update/{fundadores_gobernacion}', [FundadoresGobernacionController::class, 'update'])
    ->name('gobernacion.fundador.update');
Route::middleware(['auth:sanctum'])->delete('/otorgacion-gobernacion-fundador/destroy/{fundadores_gobernacion}', [FundadoresGobernacionController::class, 'destroy'])
    ->name('gobernacion.fundador.destroy');

// rutas modificaiones otorgacion
Route::middleware(['auth:sanctum'])->get('/modificaciones-otorgacion', [ModificacionOtorgacionController::class, 'index'])
    ->name('modificacion.otorgacion.proceso');
Route::middleware(['auth:sanctum'])->post('/modificacion-otorgacion-create', [ModificacionOtorgacionController::class, 'store'])
    ->name('modificacion.otorgacion.store');
Route::middleware(['auth:sanctum'])->get('/modificacion-otorgacion-fundadores/{otorgacion}', [FundadoresOtorgacionController::class, 'index'])
    ->name('modificacion.otorgacion.fundador.index');
Route::middleware(['auth:sanctum'])->post('/modificacion-otorgacion-fundador-store', [FundadoresOtorgacionController::class, 'create'])
    ->name('modificacion.otorgacion.fundador.store');
Route::middleware(['auth:sanctum'])->put('/modificacion-otorgacion-fundador-update/{fundador_Otorgacion}', [FundadoresOtorgacionController::class, 'update'])
    ->name('modificacion.otorgacion.fundador.update');
Route::middleware(['auth:sanctum'])->delete('/modificacion-otorgacion-fundador-destroy/{fundador_Otorgacion}', [FundadoresOtorgacionController::class, 'destroy'])
    ->name('modificacion.otorgacion.fundador.destroy');
Route::middleware(['auth:sanctum'])->post('/modificacion-otorgacion-update', [ModificacionOtorgacionController::class, 'update'])
    ->name('modificacion.otorgacion.update');
//rutas seguimiento modificacion otorgacion
Route::middleware(['auth:sanctum'])->post('/otorgacion/informe/modificacion', [OtorgacionInformeController::class, 'modificacion_informe'])
    ->name('otorgacion.informe.modificacion');
Route::middleware(['auth:sanctum'])->post('/otorgacion/seguimiento/modificacion', [OtorgacionSeguimientoController::class, 'modificacion_seguimiento'])
    ->name('otorgacion.seguimiento.modificacion');


// rutas modificaiones adecuacion
Route::middleware(['auth:sanctum'])->get('/modificaciones-adecuacion', [ModificacionAdecuacionController::class, 'index'])
    ->name('modificacion.adecuacion.proceso');
Route::middleware(['auth:sanctum'])->post('/modificacion-adecuacion-create', [ModificacionAdecuacionController::class, 'store'])
    ->name('modificacion.adecuacion.store');
Route::middleware(['auth:sanctum'])->get('/modificacion-adecuacion-fundadores/{adecuacion}', [FundadoresAdecuacionController::class, 'index'])
    ->name('modificacion.adecuacion.fundador.index');
Route::middleware(['auth:sanctum'])->post('/modificacion-adecuacion-fundador-store', [FundadoresAdecuacionController::class, 'create'])
    ->name('modificacion.adecuacion.fundador.store');
Route::middleware(['auth:sanctum'])->put('/modificacion-adecuacion-fundador-update/{fundador_adecuacion}', [FundadoresAdecuacionController::class, 'update'])
    ->name('modificacion.adecuacion.fundador.update');
Route::middleware(['auth:sanctum'])->delete('/modificacion-adecuacion-fundador-destroy/{fundador_adecuacion}', [FundadoresAdecuacionController::class, 'destroy'])
    ->name('modificacion.adecuacion.fundador.destroy');
Route::middleware(['auth:sanctum'])->post('/modificacion-adecuacion-update', [ModificacionAdecuacionController::class, 'update'])
    ->name('modificacion.adecuacion.update');


//rutas seguimiento modificacion adecuacion
Route::middleware(['auth:sanctum'])->post('/adecuacion/informe/modificacion', [AdecuacionInformeController::class, 'modificacion_informe'])
    ->name('adecuacion.informe.modificacion');
Route::middleware(['auth:sanctum'])->post('/adecuacion/seguimiento/modificacion', [AdecuacionSeguimientoController::class, 'modificacion_seguimiento'])
    ->name('adecuacion.seguimiento.modificacion');

// rutas modificacion
Route::middleware(['auth:sanctum'])->get('/modificaciones', [ModificacionController::class, 'index'])
    ->name('modificaciones');
Route::middleware(['auth:sanctum'])->post('/modificacion-show-otorgacion', [ModificacionController::class, 'getOtorgacion'])
    ->name('modificacion.show.otorgacion');

// rutas para registrados
Route::middleware(['auth:sanctum'])->get('/registrados', [RegistradosController::class, 'index'])
    ->name('registrados');
Route::middleware(['auth:sanctum'])->get('/registrado/show/{registrado}', [RegistradosController::class, 'show'])
    ->name('registrado.show');
Route::middleware(['auth:sanctum'])->post('/registrado/store', [RegistradosController::class, 'store'])
    ->name('registrado.store');
Route::middleware(['auth:sanctum'])->put('/registrado/update/{registrado}', [RegistradosController::class, 'update'])
    ->name('registrado.update');
Route::middleware(['auth:sanctum'])->delete('/registrado/destroy/{registrado}', [RegistradosController::class, 'destroy'])
    ->name('registrado.destroy');
