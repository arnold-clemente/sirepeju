<?php

use App\Http\Controllers\VerificacionController;
use Illuminate\Support\Facades\Route;

// ruta de dashboard
require('api/dashboard.php');

// rutas para administrativo y gobernacion 
require('api/roles.php');

// rutas para la autenticacion y profile
require('api/auth.php');

// rutas para administrativo y gobernacion 
require('api/users.php');

//rutas reserva de nombre otorgacion 
require('api/reserva.php');

// ruta de verificacion
Route::middleware(['auth:sanctum', 'can:verificacion.entidades'])
    ->get('/entidades', [VerificacionController::class, 'verificacion'])
    ->name('verficacion.entidades');

//rutas para otorgaciones 
require('api/otorgacion.php');

//rutas para adecuaciones 
require('api/adecuacion.php');


// rutas para las otorgacion gobernaciones 
require('api/otorgacion_gobernacion.php');

//rutas para los registrados 
require('api/registros.php');

//rutas modificaciones 
require('api/modificacion.php');


//rutas pagina 
require('api/pagina.php');

//rutas panel de pagina 
require('panel/slider.php');
require('panel/video.php');
require('panel/enlace.php');
require('panel/noticia.php');
require('panel/requisito.php');
require('panel/normativa.php');
require('panel/redes.php');
require('panel/referencia.php');