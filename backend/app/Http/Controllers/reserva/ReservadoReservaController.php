<?php

namespace App\Http\Controllers\reserva;

use App\Http\Controllers\Controller;
use App\Models\ReservaOtorgacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservadoReservaController extends Controller
{
    public function reservados()
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
            ->where('estado', 3)
            ->get();
        return response()->json($reserva);
    }
    

    public function reservar(Request $request)
    {
        $user_auth = auth()->user();
        $reserva_otorgacion = ReservaOtorgacion::find($request->reserva_id);
        $reserva_otorgacion->estado = 3;
        $reserva_otorgacion->reserva = $user_auth->id;
        $reserva_otorgacion->save();

        return response()->json([
            'data' => $reserva_otorgacion,
            'message' => 'Reservado'
        ]);
    }
}
