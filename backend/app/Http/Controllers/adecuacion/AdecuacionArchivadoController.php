<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use App\Models\Modificacion;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdecuacionArchivadoController extends Controller
{
    public function getarchivados()
    {
        $adecuaciones = DB::table('adecuacions')
            ->select(
                'id',
                'personalidad_juridica',
                'sigla',
                'representante',
                'ci_rep',
                'ext_ci_rep',
                'naturaleza',
                'persona_colectiva',
                'fecha_ingreso_tramite',
                'codigo_adecuacion',
                'domicilio_legal',
                'objeto',
                'seguimiento',
                'alfanumerico',
                'cite_informe_preliminar',
                'miembros_fundador',
                'resolucion_ministerial',
                'fecha_resolucion',
                'estado'
            )
            ->whereIn('estado', [2, 8])
            ->get();

        return response()->json($adecuaciones);
    }

    public function archivar(Adecuacion $adecuacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');
        $user_auth = auth()->user();

        if ($adecuacion->estado == 1) {
            $adecuacion->fecha_envio = $fecha;
            $adecuacion->estado = 2;
            $adecuacion->archivado = $user_auth->id;
            $adecuacion->save();
        }

        if ($adecuacion->estado == 7) {
            $adecuacion->estado = 8;
            $adecuacion->archivado = $user_auth->id;
            $adecuacion->save();
        }

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
        $adecuacion->estado = 1;
        $adecuacion->save();

        return response()->json([
            'adecuacion' => $adecuacion,
            'status' => true,
            'message' => 'Desarchivado satisfactoriamente'
        ]);
    }


    public function desarchivarModificacion(Adecuacion $adecuacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $adecuacion->fecha_modificacion = $fecha;
        $adecuacion->estado = 7;
        $adecuacion->save();

        $modificacion = Modificacion::where('adecuacion_id',  $adecuacion->id)
            ->orderBy('id', 'desc')
            ->first();

        $modificacion->personalidad_juridica = 'En modificacion';
        $modificacion->estatuto_organico = 'En modificacion';
        $modificacion->reglamento_interno = 'En modificacion';
        $modificacion->domicilio_legal = 'En modificacion';
        $modificacion->miembros_fundador = 'modificacion';
        $modificacion->save();

        return response()->json([
            'adecuacion' => $adecuacion,
            'status' => true,
            'message' => 'Desarchivado satisfactoriamente'
        ]);
    }
}
