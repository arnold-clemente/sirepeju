<?php

use App\Http\Controllers\AdministrativoController;
use App\Http\Controllers\GobernacionController;
use Illuminate\Support\Facades\Route;

// rutas para usuario administrativo
Route::middleware(['auth:sanctum'])
    ->get('/administrativos', [AdministrativoController::class, 'index'])
    ->name('administrativos');

Route::middleware(['auth:sanctum'])
    ->get('/administrativo/show/{administrativo}', [AdministrativoController::class, 'show'])
    ->name('administrativo.show');

Route::middleware(['auth:sanctum'])
    ->post('/administrativo/store', [AdministrativoController::class, 'store'])
    ->name('administrativo.store');

Route::middleware(['auth:sanctum'])
    ->put('/administrativo/update/{administrativo}', [AdministrativoController::class, 'update'])
    ->name('administrativo.update');

Route::middleware(['auth:sanctum'])
    ->delete('/administrativo/destroy/{administrativo}', [AdministrativoController::class, 'destroy'])
    ->name('administrativo.destroy');

Route::middleware(['auth:sanctum'])
    ->post('/administrativo/password', [AdministrativoController::class, 'password'])
    ->name('administrativo.password');

// rutas para usuario gobernacion
Route::middleware(['auth:sanctum'])
    ->get('/gobernacions', [GobernacionController::class, 'index'])
    ->name('gobernacions');

Route::middleware(['auth:sanctum'])
    ->get('/gobernacion/show/{gobernacion}', [GobernacionController::class, 'show'])
    ->name('gobernacion.show');

Route::middleware(['auth:sanctum'])
    ->post('/gobernacion/store', [GobernacionController::class, 'store'])
    ->name('gobernacion.store');

Route::middleware(['auth:sanctum'])
    ->put('/gobernacion/update/{gobernacion}', [GobernacionController::class, 'update'])
    ->name('gobernacion.update');

Route::middleware(['auth:sanctum'])
    ->delete('/gobernacion/destroy/{gobernacion}', [GobernacionController::class, 'destroy'])
    ->name('gobernacion.destroy');

Route::middleware(['auth:sanctum'])
    ->post('/gobernacion/password', [GobernacionController::class, 'password'])
    ->name('gobernacion.password');
