<?php

use App\Http\Controllers\RegistroController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum'])
    ->get('/registrados', [RegistroController::class, 'index'])
    ->name('registrados');

Route::middleware(['auth:sanctum'])
    ->get('/registrado/show/{registro}', [RegistroController::class, 'show'])
    ->name('registrado.show');

Route::middleware(['auth:sanctum'])
    ->post('/registrado/store', [RegistroController::class, 'store'])
    ->name('registrado.store');

Route::middleware(['auth:sanctum'])
    ->put('/registrado/update/{registro}', [RegistroController::class, 'update'])
    ->name('registrado.update');

Route::middleware(['auth:sanctum'])
    ->delete('/registrado/destroy/{registro}', [RegistroController::class, 'destroy'])
    ->name('registrado.destroy');
