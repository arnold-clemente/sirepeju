<?php

namespace App\Http\Controllers;

use App\Models\Otorgacion;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OtorgacionCaducadosController extends Controller
{
    public function getcaducados()
    {
        $archivados = Otorgacion::where('estado', 8)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($archivados);
    }

    public function caducar(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $otorgacion->fecha_envio = $fecha;
        $otorgacion->estado = 8;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Caducado satisfactoriamente'
        ]);
    }
}
