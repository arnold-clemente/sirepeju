<?php

use App\Http\Controllers\Panel\VIdeoController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/video', [VIdeoController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/video/show/{video}', [VIdeoController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/video/store', [VIdeoController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/video/update', [VIdeoController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/video/destroy/{video}', [VIdeoController::class, 'destroy']);