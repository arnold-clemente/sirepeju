<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdecuacionCaducadosController extends Controller
{
    public function getcaducados()
    {
        $caducados = Adecuacion::where('estado', 8)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($caducados);
    }


    public function caducar(Adecuacion $adecuacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $adecuacion->fecha_envio = $fecha;
        $adecuacion->estado = 8;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Caducado satisfactoriamente'
        ]);
    }
}
