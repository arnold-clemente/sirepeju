<?php

use App\Http\Controllers\ModificacionController;
use Illuminate\Support\Facades\Route;

// rutas modificacion
Route::middleware(['auth:sanctum'])
    ->get('/modificaciones', [ModificacionController::class, 'index'])
    ->name('modificaciones');

Route::middleware(['auth:sanctum'])
    ->post('/modificacion-show-otorgacion', [ModificacionController::class, 'getOtorgacion'])
    ->name('modificacion.show.otorgacion');
