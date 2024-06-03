<?php

use App\Http\Controllers\Pagina\BusquedaController;
use App\Http\Controllers\Pagina\FooterController;
use App\Http\Controllers\Pagina\IndexController;
use App\Http\Controllers\Pagina\NormativaController;
use App\Http\Controllers\pagina\RequisitoController;
use Illuminate\Support\Facades\Route;


//footer 
Route::get('/inicio', [IndexController::class, 'index']);

Route::get('/tramites', [BusquedaController::class, 'tramites']);
Route::get('/finalizados', [BusquedaController::class, 'finalizados']);

Route::get('/tramites/otorgacion/{otorgacion}', [BusquedaController::class, 'show_otorgacion']);
Route::get('/tramites/adecuacion/{adecuacion}', [BusquedaController::class, 'show_adecuacion']);
Route::get('/tramites/gobernacion/{gobernacion}', [BusquedaController::class, 'show_gobernacion']);

// Requisitos 
Route::get('/requisitos', [RequisitoController::class, 'index']);
Route::get('/requisitos/{requisito}', [RequisitoController::class, 'show_requisito']);

//normativas 
Route::get('/normativas', [NormativaController::class, 'index']);

//footer 
Route::get('/footer', [FooterController::class, 'index']);
