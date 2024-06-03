<?php

use App\Http\Controllers\Panel\EnlaceController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/enlace', [EnlaceController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/enlace/show/{enlace}', [EnlaceController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/enlace/store', [EnlaceController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/enlace/update', [EnlaceController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/enlace/destroy/{enlace}', [EnlaceController::class, 'destroy']);