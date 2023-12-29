<?php

use App\Http\Controllers\AdministrativoController;
use App\Http\Controllers\GobernacionController;
use Illuminate\Support\Facades\Route;

// rutas para usuario administrativo
Route::middleware(['auth:sanctum', 'can:administrativos'])
    ->get('/administrativos', [AdministrativoController::class, 'index'])
    ->name('administrativos');

Route::middleware(['auth:sanctum', 'can:administrativos'])
    ->get('/administrativo/show/{administrativo}', [AdministrativoController::class, 'show'])
    ->name('administrativo.show');

Route::middleware(['auth:sanctum', 'can:administrativo.store'])
    ->post('/administrativo/store', [AdministrativoController::class, 'store'])
    ->name('administrativo.store');

Route::middleware(['auth:sanctum', 'can:administrativo.update'])
    ->get('/administrativo/edit/{administrativo}', [AdministrativoController::class, 'edit'])
    ->name('administrativo.edit');

Route::middleware(['auth:sanctum', 'can:administrativo.update'])
    ->put('/administrativo/update/{administrativo}', [AdministrativoController::class, 'update'])
    ->name('administrativo.update');

Route::middleware(['auth:sanctum', 'can:administrativo.destroy'])
    ->delete('/administrativo/destroy/{administrativo}', [AdministrativoController::class, 'destroy'])
    ->name('administrativo.destroy');

Route::middleware(['auth:sanctum', 'can:administrativo.password'])
    ->post('/administrativo/password', [AdministrativoController::class, 'password'])
    ->name('administrativo.password');

// rutas para usuario gobernacion
Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/gobernacions', [GobernacionController::class, 'index'])
    ->name('gobernacions');

Route::middleware(['auth:sanctum', 'can:gobernacions'])
    ->get('/gobernacion/show/{gobernacion}', [GobernacionController::class, 'show'])
    ->name('gobernacion.show');

Route::middleware(['auth:sanctum', 'can:gobernacion.store'])
    ->post('/gobernacion/store', [GobernacionController::class, 'store'])
    ->name('gobernacion.store');

Route::middleware(['auth:sanctum', 'can:gobernacion.update'])
    ->put('/gobernacion/update/{gobernacion}', [GobernacionController::class, 'update'])
    ->name('gobernacion.update');

Route::middleware(['auth:sanctum', 'can:gobernacion.destroy'])
    ->delete('/gobernacion/destroy/{gobernacion}', [GobernacionController::class, 'destroy'])
    ->name('gobernacion.destroy');

Route::middleware(['auth:sanctum', 'can:gobernacion.password'])
    ->post('/gobernacion/password', [GobernacionController::class, 'password'])
    ->name('gobernacion.password');
