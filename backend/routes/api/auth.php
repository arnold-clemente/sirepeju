<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\auth\ProfileController;
use Illuminate\Support\Facades\Route;


// rutas para la autenticacion
Route::post('/auth/login', [AuthController::class, 'login'])
    ->name('auth.login');

Route::middleware(['auth:sanctum'])
    ->post('/auth/logout', [AuthController::class, 'logout'])
    ->name('auth.logout');

Route::middleware(['auth:sanctum'])
    ->post('/auth/user', [ProfileController::class, 'user'])
    ->name('auth.user');

Route::middleware(['auth:sanctum'])
    ->post('/auth/update', [ProfileController::class, 'profile'])
    ->name('user.profile');
