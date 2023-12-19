<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use App\Models\Modificacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdecuacionCaducadoController extends Controller
{
    public function getcaducados()
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
                'alfanumerico',
                'seguimiento',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado'
            )
            ->whereIn('estado', [3])
            ->get();

        return response()->json($adecuaciones);
    }


    public function caducar(Adecuacion $adecuacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');
        $user_auth = auth()->user();

        if ($adecuacion->estado == 1) {
            $adecuacion->fecha_envio = $fecha;
            $adecuacion->estado = 3;
            $adecuacion->caducado = $user_auth->id; 
            $adecuacion->save();
        }

        if ($adecuacion->estado == 7) {
            $adecuacion->estado = 4;
            $adecuacion->save();

            $modificacion = Modificacion::where('adecuacion_id',  $adecuacion->id)
                ->orderBy('id', 'desc')
                ->first();

            $modificacion->personalidad_juridica = 'Modificacion Caducada';
            $modificacion->estatuto_organico = 'Modificacion Caducada';
            $modificacion->reglamento_interno = 'Modificacion Caducada';
            $modificacion->domicilio_legal = 'Modificacion Caducada';
            $modificacion->miembros_fundador = 'Modificacion Caducada';
            $modificacion->caducado = $user_auth->id; 
            $modificacion->estado = 0;
            $modificacion->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Caducado satisfactoriamente'
        ]);
    }
}
