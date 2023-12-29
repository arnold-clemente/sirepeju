<?php

use App\Http\Controllers\reportes\ReservaNombreController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PamelaVista;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/reporte/homonimia/{reserva_nombre}', [ReservaNombreController::class, 'homonimia'])
//     ->name('reporte.homonimia');

// Route::get('/reporte/reserva/{registro}', [ReservaNombreController::class, 'reserva'])
//     ->name('reporte.reserva');


Route::get('/homonimia', [PamelaVista::class, 'homonimia']);

Route::get('/reserva', [PamelaVista::class, 'reserva']);
