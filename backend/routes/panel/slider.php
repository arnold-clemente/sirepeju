<?php

use App\Http\Controllers\Panel\SliderController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/slider', [SliderController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/slider/show/{slider}', [SliderController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/slider/store', [SliderController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/slider/update', [SliderController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/slider/destroy/{slider}', [SliderController::class, 'destroy']);