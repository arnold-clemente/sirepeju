<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])
    ->get('/dashboard/{year}', [DashboardController::class, 'index'])
    ->name('dashboard');

Route::middleware(['auth:sanctum'])
    ->get('/dashboard/gobernacion/{year}', [DashboardController::class, 'gobernacion'])
    ->name('dash');
