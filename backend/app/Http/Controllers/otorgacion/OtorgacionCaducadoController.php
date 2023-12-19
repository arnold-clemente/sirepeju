<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Modificacion;
use App\Models\Otorgacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OtorgacionCaducadoController extends Controller
{
    public function getcaducados()
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
            ->whereIn('estado', [3])
            ->get();

        return response()->json($otorgaciones);
    }


    public function caducar(Otorgacion $otorgacion)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');
        $user_auth = auth()->user();

        if ($otorgacion->estado == 1) {
            $otorgacion->fecha_envio = $fecha;
            $otorgacion->estado = 3;
            $otorgacion->caducado = $user_auth->id; 
            $otorgacion->save();
        }

        if ($otorgacion->estado == 7) {
            $otorgacion->estado = 4;
            $otorgacion->save();

            $modificacion = Modificacion::where('otorgacion_id',  $otorgacion->id)
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
