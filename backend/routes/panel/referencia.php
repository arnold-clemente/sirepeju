<?php

use App\Http\Controllers\Panel\ReferenciaController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/referencia', [ReferenciaController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/referencia/update', [ReferenciaController::class, 'update']);
