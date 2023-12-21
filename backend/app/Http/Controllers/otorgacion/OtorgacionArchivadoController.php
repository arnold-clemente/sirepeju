<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Modificacion;
use App\Models\Otorgacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OtorgacionArchivadoController extends Controller
{
    public function getarchivados()
    {
        $otorgaciones = DB::table('otorgacions')
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
                'codigo_otorgacion',
                'domicilio_legal',
                'objeto',
                'alfanumerico',
                'seguimiento',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado'
            )
            ->whereIn('estado', [2, 8])
            ->get();

        return response()->json($otorgaciones);
    }


    public function archivar(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $user_auth = auth()->user();

        if ($otorgacion->estado == 1) {
            $otorgacion->fecha_envio = $fecha;
            $otorgacion->estado = 2;
            $otorgacion->archivado = $user_auth->id;
            $otorgacion->save();
        }

        if ($otorgacion->estado == 7) {
            $otorgacion->estado = 8;
            $otorgacion->archivado = $user_auth->id;
            $otorgacion->save();

            $modificacion = Modificacion::where('otorgacion_id',  $otorgacion->id)
                ->orderBy('id', 'desc')
                ->first();

            $modificacion->personalidad_juridica = 'Modificacion Archivada';
            $modificacion->estatuto_organico = 'Modificacion Archivada';
            $modificacion->reglamento_interno = 'Modificacion Archivada';
            $modificacion->domicilio_legal = 'Modificacion Archivada';
            $modificacion->miembros_fundador = 'Modificacion Archivada';
            $modificacion->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Archivado satisfactoriamente'
        ]);
    }

    public function desarchivar(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');
        $user_auth = auth()->user();

        $otorgacion->fecha_envio = $fecha;
        $otorgacion->estado = 1;
        $otorgacion->archivado = $user_auth->id;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Desarchivado satisfactoriamente'
        ]);
    }


    public function desarchivarModificacion(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $otorgacion->fecha_modificacion = $fecha;
        $otorgacion->estado = 7;
        $otorgacion->save();

        $modificacion = Modificacion::where('otorgacion_id',  $otorgacion->id)
            ->orderBy('id', 'desc')
            ->first();

        $modificacion->personalidad_juridica = 'En modificacion';
        $modificacion->estatuto_organico = 'En modificacion';
        $modificacion->reglamento_interno = 'En modificacion';
        $modificacion->domicilio_legal = 'En modificacion';
        $modificacion->miembros_fundador = 'modificacion';
        $modificacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Desarchivado satisfactoriamente'
        ]);
    }
}
