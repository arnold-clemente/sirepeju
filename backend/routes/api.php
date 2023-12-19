<?php

use App\Http\Controllers\VerificacionController;
use Illuminate\Support\Facades\Route;

// rutas para la autenticacion y profile
require('api/auth.php');

// rutas para administrativo y gobernacion 
require('api/users.php');

//rutas reserva de nombre otorgacion 
require('api/reserva.php');

// ruta de verificacion
Route::middleware(['auth:sanctum'])
    ->get('/entidades', [VerificacionController::class, 'verificacion'])
    ->name('entidades');

//rutas para otorgaciones 
require('api/otorgacion.php');

//rutas para adecuaciones 
require('api/adecuacion.php');


// rutas para las otorgacion gobernaciones 
require('api/otorgacion_gobernacion.php');

//rutas para los registrados 
require('api/registros.php');
