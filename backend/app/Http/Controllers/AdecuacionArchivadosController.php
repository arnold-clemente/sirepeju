<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdecuacionArchivadosController extends Controller
{
    public function getarchivados()
    {
        $archivados = Adecuacion::where('estado', 9)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($archivados);
    }

    public function archivar(Adecuacion $adecuacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $adecuacion->fecha_envio = $fecha;
        $adecuacion->estado = 9;
        $adecuacion->save();

        return response()->json([
            'adecuacion' => $adecuacion,
            'status' => true,
            'message' => 'Archivado satisfactoriamente'
        ]);
    }


    public function desarchivar(Adecuacion $adecuacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $adecuacion->fecha_envio = $fecha;
        $adecuacion->estado = 7;
        $adecuacion->save();

        return response()->json([
            'adecuacion' => $adecuacion,
            'status' => true,
            'message' => 'Desarchivado satisfactoriamente'
        ]);
    }

}
