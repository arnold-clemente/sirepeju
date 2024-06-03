<?php

use App\Http\Controllers\ModificacionController;
use Illuminate\Support\Facades\Route;

// rutas modificacion
Route::middleware(['auth:sanctum', 'can:modificaciones'])
    ->get('/modificaciones', [ModificacionController::class, 'index'])
    ->name('modificaciones');

Route::middleware(['auth:sanctum', 'can:modificaciones'])
    ->post('/modificacion-show-otorgacion', [ModificacionController::class, 'getOtorgacion'])
    ->name('modificacion.show.otorgacion');
