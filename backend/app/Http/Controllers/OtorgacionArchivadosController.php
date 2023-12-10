<?php

namespace App\Http\Controllers;
use App\Models\Otorgacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class OtorgacionArchivadosController extends Controller
{
    public function getarchivados()
    {
        $archivados = Otorgacion::where('estado', 9)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($archivados);
    }

    public function archivar(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $otorgacion->fecha_envio = $fecha;
        $otorgacion->estado = 9;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Archivado satisfactoriamente'
        ]);
    }

    public function desarchivar(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $otorgacion->fecha_envio = $fecha;
        $otorgacion->estado = 7;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Desarchivado satisfactoriamente'
        ]);
    }
}
