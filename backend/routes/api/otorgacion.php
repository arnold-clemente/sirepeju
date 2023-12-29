<?php

use App\Http\Controllers\otorgacion\OtorgacionArchivadoController;
use App\Http\Controllers\otorgacion\OtorgacionCaducadoController;
use App\Http\Controllers\otorgacion\OtorgacionController;
use App\Http\Controllers\otorgacion\OtorgacionExtinguidaController;
use App\Http\Controllers\otorgacion\OtorgacionFundadorController;
use App\Http\Controllers\otorgacion\OtorgacionInformeController;
use App\Http\Controllers\otorgacion\OtorgacionModificacionController;
use App\Http\Controllers\otorgacion\OtorgacionPersonalidadController;
use App\Http\Controllers\otorgacion\OtorgacionRevocadoController;
use App\Http\Controllers\otorgacion\OtorgacionSeguimientoController;
use Illuminate\Support\Facades\Route;


// otorgacion en tramite 
Route::middleware(['auth:sanctum', 'can:otorgaciones'])
    ->get('/otorgaciones', [OtorgacionController::class, 'index'])
    ->name('otorgaciones');

Route::middleware(['auth:sanctum'])
    ->get('/otorgacion/show/{otorgacion}', [OtorgacionController::class, 'show'])
    ->name('otorgacion.show');

//informe preliminar otorgacion
Route::middleware(['auth:sanctum', 'can:otorgacion.informe'])
    ->post('/otorgacion/informe/store', [OtorgacionInformeController::class, 'store'])
    ->name('otorgacion.informe');

//seguimiento otorgacion
Route::middleware(['auth:sanctum', 'can:otorgacion.seguimiento'])
    ->post('/otorgacion/seguimiento/store', [OtorgacionSeguimientoController::class, 'store'])
    ->name('otorgacion.seguimiento');

// registrar reserva_otorgacion a otorgacion 
Route::middleware(['auth:sanctum', 'can:otorgacion.store'])
    ->post('/otorgacion/store', [OtorgacionController::class, 'store'])
    ->name('otorgacion.store');

//otorgacion crear fundadores 
Route::middleware(['auth:sanctum', 'can:otorgacion.personalidad'])
    ->post('/otorgacion/fundadores/store', [OtorgacionFundadorController::class, 'store'])
    ->name('otorgacion.fundadores.store');

// registro final de otorgacion 
Route::middleware(['auth:sanctum', 'can:otorgacion.personalidad'])
    ->post('/otorgacion/registro-final', [OtorgacionController::class, 'registro'])
    ->name('otorgacion.registro');

// otorgacion crear personalidad 
Route::middleware(['auth:sanctum', 'can:otorgacion.personalidad'])
    ->post('/otorgacion/personalidad/store', [OtorgacionPersonalidadController::class, 'store'])
    ->name('otorgacion.personalidad');

//otorgacion listar personalidades
Route::middleware(['auth:sanctum', 'can:otorgaciones.personalidades'])
    ->get('/otorgacion/personalidades', [OtorgacionPersonalidadController::class, 'getpersonalidades'])
    ->name('otorgacion.personalidades');

//archivar otorgacion 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/archivar/{otorgacion}', [OtorgacionArchivadoController::class, 'archivar'])
    ->name('otorgacion.archivar');

//listar archivados 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/otorgacion/archivados', [OtorgacionArchivadoController::class, 'getarchivados'])
    ->name('otorgaciones.archivados');

//desarchivar otorgacion 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/desarchivar/{otorgacion}', [OtorgacionArchivadoController::class, 'desarchivar'])
    ->name('otorgacion.desarchivar');

// caducar otorgacion 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/caducar/{otorgacion}', [OtorgacionCaducadoController::class, 'caducar'])
    ->name('otorgacion.caducar');

// otorgacion caducados 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/otorgacion/caducados', [OtorgacionCaducadoController::class, 'getcaducados'])
    ->name('otorgaciones.caducados');

//revocar otorgacion 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/revocatoria/store', [OtorgacionRevocadoController::class, 'revocar'])
    ->name('otorgacion.revocar');

//otorgacion revocados 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/otorgacion/revocatorias', [OtorgacionRevocadoController::class, 'getrevocados'])
    ->name('otorgacion.revocatorias');

//  extinguir otorgacion
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/extinguida/store', [OtorgacionExtinguidaController::class, 'extinguir'])
    ->name('otorgacion.extinguir');

// otorgacion extinguidas
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/otorgacion/extinguidas', [OtorgacionExtinguidaController::class, 'getextinguidas'])
    ->name('otorgacion.extinguidas');


// proceso de modificacion 
// rutas modificaiones otorgacion
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/modificaciones-otorgacion', [OtorgacionModificacionController::class, 'getmodificaciones'])
    ->name('otorgacion.modificacion');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/modificacion-otorgacion-create', [OtorgacionModificacionController::class, 'store'])
    ->name('otorgacion.modificacion.store');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/modificacion-otorgacion-fundadores/{otorgacion}', [OtorgacionFundadorController::class, 'index'])
    ->name('otorgacion.modificacion.fundador');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/modificacion-otorgacion-fundador-store', [OtorgacionFundadorController::class, 'create'])
    ->name('otorgacion.modificacion.fundador.store');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->put('/modificacion-otorgacion-fundador-update/{otorgacion_fundador}', [OtorgacionFundadorController::class, 'update'])
    ->name('otorgacion.modificacion.fundador.update');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->delete('/modificacion-otorgacion-fundador-destroy/{otorgacion_fundador}', [OtorgacionFundadorController::class, 'destroy'])
    ->name('otorgacion.modificacion.fundador.destroy');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/modificacion-otorgacion-update', [OtorgacionModificacionController::class, 'update'])
    ->name('otorgacion.modificacion.update');

//rutas seguimiento modificacion otorgacion
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/informe/modificacion', [OtorgacionInformeController::class, 'modificacion_informe'])
    ->name('otorgacion.informe.modificacion');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/seguimiento/modificacion', [OtorgacionSeguimientoController::class, 'modificacion_seguimiento'])
    ->name('otorgacion.seguimiento.modificacion');

//desarchivar modificacion 
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->post('/otorgacion/modificacion/desarchivar/{otorgacion}', [OtorgacionArchivadoController::class, 'desarchivarModificacion'])
    ->name('otorgacion.modificacion.desarchivar');
