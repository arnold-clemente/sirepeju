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

Route::middleware(['auth:sanctum', 'can:adecuaciones'])
    ->get('/adecuaciones', [AdecuacionController::class, 'index'])
    ->name('adecuaciones');

Route::middleware(['auth:sanctum'])
    ->get('/adecuacion/show/{adecuacion}', [AdecuacionController::class, 'show'])
    ->name('adecuacion.show');

Route::middleware(['auth:sanctum', 'can:adecuacion.store'])
    ->post('/adecuacion/store', [AdecuacionController::class, 'store'])
    ->name('adecuacion.store');

// adecuacion informes 
Route::middleware(['auth:sanctum', 'can:adecuacion.informe'])
    ->post('/adecuacion/informe/store', [AdecuacionInformeController::class, 'store'])
    ->name('adecuacion.informe.store');

Route::middleware(['auth:sanctum', 'can:adecuacion.informe'])
    ->post('/adecuacion/informe/modificacion', [AdecuacionInformeController::class, 'modificacion_informe'])
    ->name('adecuacion.informe.modificacion');

// adecuacion seguimientos 
Route::middleware(['auth:sanctum', 'can:adecuacion.seguimiento'])
    ->post('/adecuacion/seguimiento/store', [AdecuacionSeguimientoController::class, 'store'])
    ->name('adecuacion.seguimiento.store');

Route::middleware(['auth:sanctum', 'can:adecuacion.seguimiento'])
    ->post('/adecuacion/seguimiento/modificacion', [AdecuacionSeguimientoController::class, 'modificacion_seguimiento'])
    ->name('adecuacion.seguimiento.modificacion');

// adecuacion registro final 
Route::middleware(['auth:sanctum', 'can:adecuacion.personalidad'])
    ->post('/adecuacion/registro-final', [AdecuacionController::class, 'registro'])
    ->name('adecuacion.registro.final');

//adecuacion personalidad crear 
Route::middleware(['auth:sanctum', 'can:adecuacion.personalidad'])
    ->post('/adecuacion-persona-colectiva/store', [AdecuacionPersonalidadController::class, 'store'])
    ->name('adecuacion.persona.store');

// adecuacion listar personalidades
Route::middleware(['auth:sanctum', 'can:adecuaciones.personalidades'])
    ->get('/adecuacion/personalidades', [AdecuacionPersonalidadController::class, 'getpersonalidades'])
    ->name('adecuaciones.personalidades');

// rutas para fundadores 
Route::middleware(['auth:sanctum', 'can:adecuacion.personalidad'])
    ->post('/fundadores/adecuacion/store', [AdecuacionFundadorController::class, 'store'])
    ->name('fundadores.adecuacion.store');

//adecuaciones archivados 
Route::middleware(['auth:sanctum', 'can:adecuaciones.archivados'])
    ->get('/adecuacion/archivados', [AdecuacionArchivadoController::class, 'getarchivados'])
    ->name('adecuaciones.archivados');

Route::middleware(['auth:sanctum', 'can:adecuacion.archivar'])
    ->post('/adecuacion/archivar/{adecuacion}', [AdecuacionArchivadoController::class, 'archivar'])
    ->name('adecuacion.archivar');

Route::middleware(['auth:sanctum', 'can:adecuacion.desarchivar'])
    ->post('/adecuacion/desarchivar/{adecuacion}', [AdecuacionArchivadoController::class, 'desarchivar'])
    ->name('adecuacion.desarchivar');

Route::middleware(['auth:sanctum', 'can:adecuacion.desarchivar'])
    ->post('/adecuacion/modificacion/desarchivar/{adecuacion}', [AdecuacionArchivadoController::class, 'desarchivarModificacion'])
    ->name('adecuacion.modificacion.desarchivar');

//adecuaciones caducados 
Route::middleware(['auth:sanctum', 'can:adecuaciones.caducados'])
    ->get('/adecuacion/caducados', [AdecuacionCaducadoController::class, 'getcaducados'])
    ->name('adecuaciones.caducados');

Route::middleware(['auth:sanctum', 'can:adecuacion.caducar'])
    ->post('/adecuacion/caducar/{adecuacion}', [AdecuacionCaducadoController::class, 'caducar'])
    ->name('adecuacion.caducar');

//adecuaciones revocados 
Route::middleware(['auth:sanctum', 'can:adecuacion.revocar'])
    ->post('/adecuacion/revocatoria/store', [AdecuacionRevocadoController::class, 'revocar'])
    ->name('adecuacion.revocatoria.store');

Route::middleware(['auth:sanctum', 'can:adecuaciones.revocatorias'])
    ->get('/adecuacion/revocatorias', [AdecuacionRevocadoController::class, 'getrevocados'])
    ->name('adecuacion.revocatorias');

// adecuacion exinguir
Route::middleware(['auth:sanctum', 'can:adecuacion.extinguir'])
    ->post('/adecuacion/extinguida/store', [AdecuacionExtinguidoController::class, 'extinguir'])
    ->name('adecuacion.extinguir');

// adecuacion extinguidas
Route::middleware(['auth:sanctum', 'can:adecuaciones.extinguidas'])
    ->get('/adecuacion/extinguidas', [AdecuacionExtinguidoController::class, 'getextinguidas'])
    ->name('adecuacion.extinguidas');

// adecuacion fundadores
Route::middleware(['auth:sanctum', 'can:adecuacion.modificar'])
    ->get('/modificacion-adecuacion-fundadores/{adecuacion}', [AdecuacionFundadorController::class, 'index'])
    ->name('modificacion.adecuacion.fundador.index');

Route::middleware(['auth:sanctum', 'can:adecuacion.modificar'])
    ->post('/modificacion-adecuacion-fundador-store', [AdecuacionFundadorController::class, 'create'])
    ->name('modificacion.adecuacion.fundador.store');

Route::middleware(['auth:sanctum', 'can:adecuacion.modificar'])
    ->put('/modificacion-adecuacion-fundador-update/{adecuacion_fundador}', [AdecuacionFundadorController::class, 'update'])
    ->name('modificacion.adecuacion.fundador.update');

Route::middleware(['auth:sanctum', 'can:adecuacion.modificar'])
    ->delete('/modificacion-adecuacion-fundador-destroy/{adecuacion_fundador}', [AdecuacionFundadorController::class, 'destroy'])
    ->name('modificacion.adecuacion.fundador.destroy');

// adecuacion modificaciones 
Route::middleware(['auth:sanctum', 'can:adecuaciones.modificaciones'])
    ->get('/modificaciones-adecuacion', [AdecuacionModificacionController::class, 'index'])
    ->name('adecuacion.modificacion.proceso');

Route::middleware(['auth:sanctum', 'can:adecuacion.modificar'])
    ->post('/modificacion-adecuacion-create', [AdecuacionModificacionController::class, 'store'])
    ->name('adecuacion.modificacion.store');

Route::middleware(['auth:sanctum', 'can:adecuacion.modificar'])
    ->post('/modificacion-adecuacion-update', [AdecuacionModificacionController::class, 'update'])
    ->name('adecuacion.modificacion.update');
