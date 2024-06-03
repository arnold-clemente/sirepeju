<?php

use App\Http\Controllers\Panel\ReglamentoController;
use App\Http\Controllers\Panel\RequisitoController;
use App\Http\Controllers\Panel\TramiteController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/requisito', [RequisitoController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/requisito/show/{requisito}', [RequisitoController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/requisito/store', [RequisitoController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/requisito/update', [RequisitoController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/requisito/destroy/{requisito}', [RequisitoController::class, 'destroy']);

// rutas para tramites
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/requisito/{requisito}', [TramiteController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/tramite/show/{tramite}', [TramiteController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/tramite/store', [TramiteController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/tramite/update', [TramiteController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/tramite/destroy/{tramite}', [TramiteController::class, 'destroy']);


// rutas para reglamentos
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/tramite/{tramite}', [ReglamentoController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/reglamento/show/{reglamento}', [ReglamentoController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/reglamento/store', [ReglamentoController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/reglamento/update', [ReglamentoController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/reglamento/destroy/{reglamento}', [ReglamentoController::class, 'destroy']);
