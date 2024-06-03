<?php

use App\Http\Controllers\Panel\NoticiaController;
use Illuminate\Support\Facades\Route;

// rutas para registrados
Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/noticia', [NoticiaController::class, 'index']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->get('/panel/noticia/show/{noticia}', [NoticiaController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/noticia/store', [NoticiaController::class, 'store']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->post('/panel/noticia/update', [NoticiaController::class, 'update']);

Route::middleware(['auth:sanctum', 'can:panel.pagina'])
    ->delete('/panel/noticia/destroy/{noticia}', [NoticiaController::class, 'destroy']);