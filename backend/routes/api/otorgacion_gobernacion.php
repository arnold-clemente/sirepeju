<?php

use App\Http\Controllers\gobernacion\OtorgacionGobernacionController;
use App\Http\Controllers\gobernacion\OtorgacionGobernacionFundadorController;
use Illuminate\Support\Facades\Route;


// para las otorgaciones gobernacions
Route::middleware(['auth:sanctum'])
->get('/otorgacion-gobernacions', [OtorgacionGobernacionController::class, 'index'])
    ->name('otorgacion.gobernaciones');

Route::middleware(['auth:sanctum'])
->get('/otorgacion-gobernacion/show/{otorgacion_gobernacion}', [OtorgacionGobernacionController::class, 'show'])
    ->name('otorgacion.gobernacion.show');

Route::middleware(['auth:sanctum'])
->post('/otorgacion-gobernacion/store', [OtorgacionGobernacionController::class, 'store'])
    ->name('otorgacion.gobernacion.store');

Route::middleware(['auth:sanctum'])
->put('/otorgacion-gobernacion/update/{otorgacion_gobernacion}', [OtorgacionGobernacionController::class, 'update'])
    ->name('otorgacion.gobernacion.update');

Route::middleware(['auth:sanctum'])
->delete('/otorgacion-gobernacion/destroy/{otorgacion_gobernacion}', [OtorgacionGobernacionController::class, 'destroy'])
    ->name('otorgacion.gobernacion.destroy');

// para los fundadores goberancion otorgacion
Route::middleware(['auth:sanctum'])
->post('/otorgacion-gobernacion-fundador/store', [OtorgacionGobernacionFundadorController::class, 'store'])
    ->name('gobernacion.fundador.store');

Route::middleware(['auth:sanctum'])
->put('/otorgacion-gobernacion-fundador/update/{gobernacion_fundador}', [OtorgacionGobernacionFundadorController::class, 'update'])
    ->name('gobernacion.fundador.update');

Route::middleware(['auth:sanctum'])
->delete('/otorgacion-gobernacion-fundador/destroy/{gobernacion_fundador}', [OtorgacionGobernacionFundadorController::class, 'destroy'])
    ->name('gobernacion.fundador.destroy');