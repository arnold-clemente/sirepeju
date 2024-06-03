<?php

namespace App\Http\Controllers\reserva;

use App\Http\Controllers\Controller;
use App\Models\ReservaOtorgacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CaducadoReservaController extends Controller
{
    public function caducados()
    {
        $reserva = DB::table('reserva_otorgacions')
            ->select(
                'id',
                'fecha_reg',
                'hr',
                'entidad',
                'sigla',
                'persona_colectiva',
                'nro_certificado',
                'naturaleza',
                'obs',
                'fecha_entrega',
                'representante',
                'ci_rep',
                'ext_ci_rep',
                'telefono',
                'correo',
                'estado'
            )
            ->where('estado', 4)
            ->get();
        return response()->json($reserva);
    }


    public function caducar(Request $request)
    {
        $user_auth = auth()->user();
        $reserva_otorgacion = ReservaOtorgacion::find($request->id);
        $reserva_otorgacion->estado = 4;
        $reserva_otorgacion->caducado = $user_auth->id;
        $reserva_otorgacion->save();

        return response()->json([
            'data' => $reserva_otorgacion,
            'message' => 'Reservado'
        ]);
    }
}
