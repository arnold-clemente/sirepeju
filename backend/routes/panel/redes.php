<?php

use App\Http\Controllers\Panel\RedesController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/rede', [RedesController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/rede/show/{redes}', [RedesController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/rede/icons', [RedesController::class, 'icons']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/rede/store', [RedesController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/rede/update', [RedesController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/rede/destroy/{redes}', [RedesController::class, 'destroy']);
