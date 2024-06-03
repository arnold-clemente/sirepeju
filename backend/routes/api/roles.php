<?php

use App\Http\Controllers\RolesController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum', 'can:roles'])
    ->get('/roles', [RolesController::class, 'index'])
    ->name('roles');

Route::middleware(['auth:sanctum', 'can:roles'])
    ->get('/rol/show/{role}', [RolesController::class, 'show'])
    ->name('rol.show');

Route::middleware(['auth:sanctum', 'can:roles'])
    ->get('/permisos', [RolesController::class, 'getpermisos'])
    ->name('rol.getpermisos');

Route::middleware(['auth:sanctum', 'can:rol.store'])
    ->post('/rol/store', [RolesController::class, 'store'])
    ->name('rol.store');

Route::middleware(['auth:sanctum', 'can:rol.update'])
    ->get('/rol/edit/{role}', [RolesController::class, 'edit'])
    ->name('rol.edit');

Route::middleware(['auth:sanctum', 'can:rol.update'])
    ->put('/rol/update/{role}', [RolesController::class, 'update'])
    ->name('rol.update');

Route::middleware(['auth:sanctum', 'can:rol.destroy'])
    ->delete('/rol/destroy/{role}', [RolesController::class, 'destroy'])
    ->name('rol.destroy');
