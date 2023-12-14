<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\Administrativo;
use App\Models\Otorgacion;
use App\Models\OtorgacionGobernacion;
use App\Models\Registro;
use App\Models\Reservanombre;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerificacionController extends Controller
{

    public function verificacion()
    {
        $reservas = Reservanombre::select(
            'id as reserva_id',
            'entidad',
            'sigla',
            'representante',
            'estado',
            'naturaleza'
        )
            ->whereIn('estado', [1])
            ->orderBy('id', 'desc')
            ->get();
        $registros = Registro::select(
            'id as registro_id',
            'entidad',
            'sigla',
            'representante',
            'estado',
            'naturaleza'
        )
            ->whereIn('estado', [4])
            ->orderBy('id', 'desc')
            ->get();

        $otorgaciones = Otorgacion::select(
            'id as otorgacion_id',
            'personalidad_juridica as entidad',
            'sigla',
            'miembros_fundador as representante',
            'estado',
            'naturaleza'
        )
            ->whereIn('estado', [7, 9, 10, 0, 13])
            ->orderBy('id', 'desc')
            ->get();

        $adecuaciones = Adecuacion::select(
            'id as adecuacion_id',
            'personalidad_juridica as entidad',
            'sigla',
            'miembros_fundador as representante',
            'estado',
            'naturaleza'
        )
            ->whereIn('estado', [7, 9, 10, 0, 13])
            ->orderBy('id', 'desc')
            ->get();

        $gobernaciones = OtorgacionGobernacion::select(
            'id as gobernacion_id',
            'nombre_persona_colectiva as entidad',
            'sigla',
            'miembros_fundador as representante',
            'estado',
            'naturaleza'
        )
            ->whereIn('estado', [11])
            ->orderBy('id', 'desc')
            ->get();

        $entidades = $reservas->concat($registros)->concat($otorgaciones)->concat($adecuaciones)->concat($gobernaciones);

        return response()->json($entidades);
    }


    public function homonimia(Reservanombre $reserva_nombre)
    {
        $reserva_nombre->estado = 2;
        $reserva_nombre->save();

        return response()->json([
            'data' => $reserva_nombre,
            'message' => 'Homonimia'
        ]);
    }

    public function registro(Reservanombre $reserva_nombre, Request $request)
    {

        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $user_id = $request->user_id;

        $reserva_nombre->estado = 3;
        $reserva_nombre->save();

        $administrativo = Administrativo::where('user_id', $user_id)->first()->id;

        $regsitro = Registro::create([
            'fecha_reg' => $fecha,
            'hr' => $reserva_nombre->hr,
            'entidad' => $reserva_nombre->entidad,
            'sigla' => $reserva_nombre->sigla,
            'persona_colectiva' => $reserva_nombre->persona_colectiva,
            'nro_certificado' => $reserva_nombre->nro_certificado,
            'naturaleza' => $reserva_nombre->naturaleza,
            'obs' => $reserva_nombre->obs,
            'representante' => $reserva_nombre->representante,
            'ci_rep' => $reserva_nombre->ci_rep,
            'ext_ci_rep' => $reserva_nombre->ext_ci_rep,
            'telefono' => $reserva_nombre->telefono,
            'correo' => $reserva_nombre->correo,
            'estado' => 4,
            'reserva_nombre_id' => $reserva_nombre->id,
            'administrativo_id' => $administrativo,
            'create_admin' => $user_id,
            'update_admin' => $user_id,
        ]);

        return response()->json([
            'data' => $regsitro,
            'message' => 'Reserva de entidad'
        ]);
    }

    public function show($id)
    {
    }


    public function edit($id)
    {
    }


    public function update(Request $request, $id)
    {
    }


    public function destroy($id)
    {
    }
}
