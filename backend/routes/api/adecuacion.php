<?php

use App\Http\Controllers\adecuacion\AdecuacionArchivadoController;
use App\Http\Controllers\adecuacion\AdecuacionCaducadoController;
use App\Http\Controllers\adecuacion\AdecuacionController;
use App\Http\Controllers\adecuacion\AdecuacionExtinguidoController;
use App\Http\Controllers\adecuacion\AdecuacionFundadorController;
use App\Http\Controllers\adecuacion\AdecuacionInformeController;
use App\Http\Controllers\adecuacion\AdecuacionModificacionController;
use App\Http\Controllers\adecuacion\AdecuacionPersonalidadController;
use App\Http\Controllers\adecuacion\AdecuacionRevocadoController;
use App\Http\Controllers\adecuacion\AdecuacionSeguimientoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])
    ->get('/adecuaciones', [AdecuacionController::class, 'index'])
    ->name('adecuaciones');

Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/show/{adecuacion}', [AdecuacionController::class, 'show'])
    ->name('adecuacion.show');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/store', [AdecuacionController::class, 'store'])
    ->name('adecuacion.store');

// adecuacion informes 
Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/informe/store', [AdecuacionInformeController::class, 'store'])
    ->name('adecuacion.informe.store');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/informe/modificacion', [AdecuacionInformeController::class, 'modificacion_informe'])
    ->name('adecuacion.informe.modificacion');

// adecuacion seguimientos 
Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/seguimiento/store', [AdecuacionSeguimientoController::class, 'store'])
    ->name('adecuacion.seguimiento.store');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/seguimiento/modificacion', [AdecuacionSeguimientoController::class, 'modificacion_seguimiento'])
    ->name('adecuacion.seguimiento.modificacion');

// adecuacion registro final 
Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/registro-final', [AdecuacionController::class, 'registro'])
    ->name('adecuacion.registro.final');

//adecuacion personalidad crear 
Route::middleware(['auth:sanctum'])
    ->post('/adecuacion-persona-colectiva/store', [AdecuacionPersonalidadController::class, 'store'])
    ->name('adecuacion.persona.store');

// adecuacion listar personalidades
Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/personalidades', [AdecuacionPersonalidadController::class, 'getpersonalidades'])
    ->name('adecuacion.personalidades');

// rutas para fundadores 
Route::middleware(['auth:sanctum'])
    ->post('/fundadores/adecuacion/store', [AdecuacionFundadorController::class, 'store'])
    ->name('fundadores.adecuacion.store');

//adecuaciones archivados 
Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/archivados', [AdecuacionArchivadoController::class, 'getarchivados'])
    ->name('adecuaciones.archivados');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/archivar/{adecuacion}', [AdecuacionArchivadoController::class, 'archivar'])
    ->name('adecuacion.archivar');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/desarchivar/{adecuacion}', [AdecuacionArchivadoController::class, 'desarchivar'])
    ->name('adecuacion.desarchivar');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/modificacion/desarchivar/{adecuacion}', [AdecuacionArchivadoController::class, 'desarchivarModificacion'])
    ->name('adecuacion.modificacion.desarchivar');

//adecuaciones caducados 
Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/caducados', [AdecuacionCaducadoController::class, 'getcaducados'])
    ->name('adecuaciones.caducados');

Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/caducar/{adecuacion}', [AdecuacionCaducadoController::class, 'caducar'])
    ->name('adecuacion.caducar');

//adecuaciones revocados 
Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/revocatoria/store', [AdecuacionRevocadoController::class, 'revocar'])
    ->name('adecuacion.revocatoria.store');

Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/revocatorias', [AdecuacionRevocadoController::class, 'getrevocados'])
    ->name('adecuacion.revocatorias');

// adecuacion exinguir
Route::middleware(['auth:sanctum'])
    ->post('/adecuacion/extinguida/store', [AdecuacionExtinguidoController::class, 'extinguir'])
    ->name('adecuacion.extinguir');

// adecuacion extinguidas
Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/extinguidas', [AdecuacionExtinguidoController::class, 'getextinguidas'])
    ->name('adecuacion.extinguidas');

// adecuacion modificaciones 
Route::middleware(['auth:sanctum'])
    ->get('/modificaciones-adecuacion', [AdecuacionModificacionController::class, 'index'])
    ->name('adecuacion.modificacion.proceso');

Route::middleware(['auth:sanctum'])
    ->post('/modificacion-adecuacion-create', [AdecuacionModificacionController::class, 'store'])
    ->name('adecuacion.modificacion.store');

Route::middleware(['auth:sanctum'])
    ->post('/modificacion-adecuacion-update', [AdecuacionModificacionController::class, 'update'])
    ->name('adecuacion.modificacion.update');
