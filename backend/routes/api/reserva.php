<?php

use App\Http\Controllers\reserva\CaducadoReservaController;
use App\Http\Controllers\reserva\HomonimiaReservaController;
use App\Http\Controllers\reserva\ReservadoReservaController;
use App\Http\Controllers\reserva\SolicitudReservaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'can:reservas.solicitudes'])
    ->get('/reservas/solicitudes', [SolicitudReservaController::class, 'solicitudes'])
    ->name('reservas.solicitudes');

Route::middleware(['auth:sanctum'])
    ->get('/reserva/show/{reserva_otorgacion}', [SolicitudReservaController::class, 'show'])
    ->name('reserva.show');

Route::middleware(['auth:sanctum', 'can:reserva.store'])
    ->post('/reserva/store', [SolicitudReservaController::class, 'store'])
    ->name('reserva.store');

Route::middleware(['auth:sanctum', 'can:reserva.update'])
    ->put('/reserva/update/{reserva_otorgacion}', [SolicitudReservaController::class, 'update'])
    ->name('reserva.update');

Route::middleware(['auth:sanctum', 'can:reservas.panel'])
    ->post('/reserva/entregar', [SolicitudReservaController::class, 'entregar'])
    ->name('reserva.entregar');

// rutas homonimia 
Route::middleware(['auth:sanctum', 'can:reservas.homonimias'])
    ->get('/reservas/homonimias', [HomonimiaReservaController::class, 'homonimias'])
    ->name('reservas.homonimias');

Route::middleware(['auth:sanctum', 'can:reserva.homonimo'])
    ->post('/reserva/homonimo', [HomonimiaReservaController::class, 'homonimo'])
    ->name('reserva.homonimo');

// rutas reservados  
Route::middleware(['auth:sanctum', 'can:reservas.reservados'])
    ->get('/reservas/reservados', [ReservadoReservaController::class, 'reservados'])
    ->name('reservas.reservados');

Route::middleware(['auth:sanctum', 'can:reserva.reservar'])
    ->post('/reserva/reservar', [ReservadoReservaController::class, 'reservar'])
    ->name('reserva.reservar');

// rutas caducados 
Route::middleware(['auth:sanctum', 'can:reservas.caducados'])
    ->get('/reservas/caducados', [CaducadoReservaController::class, 'caducados'])
    ->name('reservas.caducados');

Route::middleware(['auth:sanctum', 'can:reserva.caducar'])
    ->post('/reserva/caducar', [CaducadoReservaController::class, 'caducar'])
    ->name('reserva.caducar');
