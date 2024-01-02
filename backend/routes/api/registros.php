<?php

use App\Http\Controllers\RegistroController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:registrados'])
    ->get('/registrados', [RegistroController::class, 'index'])
    ->name('registrados');

Route::middleware(['auth:sanctum', 'can:registrados'])
    ->get('/registrado/show/{registro}', [RegistroController::class, 'show'])
    ->name('registrado.show');

Route::middleware(['auth:sanctum', 'can:registrado.store'])
    ->post('/registrado/store', [RegistroController::class, 'store'])
    ->name('registrado.store');

Route::middleware(['auth:sanctum', 'can:registrado.update'])
    ->put('/registrado/update/{registro}', [RegistroController::class, 'update'])
    ->name('registrado.update');

Route::middleware(['auth:sanctum', 'can:registrado.destroy'])
    ->delete('/registrado/destroy/{registro}', [RegistroController::class, 'destroy'])
    ->name('registrado.destroy');
