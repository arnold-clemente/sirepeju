<?php

namespace App\Http\Controllers\reserva;

use App\Http\Controllers\Controller;
use App\Models\Administrativo;
use App\Models\ReservaOtorgacion;
use App\Models\UserAdministrativo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SolicitudReservaController extends Controller
{
    public function solicitudes()
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
            ->orderBy('id', 'desc')
            ->where('estado', 1)
            ->get();
        return response()->json($reserva);
    }

    public function show(ReservaOtorgacion $reserva_otorgacion)
    {
        return response()->json($reserva_otorgacion);
    }

    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'hr' => 'required|numeric|max:99999999',
            'entidad' => 'required|string|max:250',
            'sigla' => 'required|string|max:100',
            'persona_colectiva' => 'required',
            'naturaleza' => 'required',
            'obs' => 'required',
            'representante' => 'required',
            'ci_rep' => 'required',
            'ext_ci_rep' => 'required',
            'telefono' => 'required',
            'correo' => 'required',
            'user_id' => 'required',
        ];

        $messages = [
            'fecha_reg.required' => 'La fecha registro es obligatorio.',
            'hr.required' => 'La hoja de ruta es obligatorio.',
            'ci_rep.required' => 'El ci es obligatorio.',
            'ext_ci_rep.required' => 'La extensiòn registro es obligatorio.',
        ];

        $validator = Validator::make($request->input(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $ultimo = ReservaOtorgacion::select('id')->orderBy('id', 'desc')->first();
        $administrativo = UserAdministrativo::where('user_id', $request->user_id)->first();
        $numero = $ultimo->id + 200;
        $nro_certificado =  '00-0' . $numero;

        $reserva = ReservaOtorgacion::create([
            'fecha_reg' => $fecha,
            'hr' => $request->hr,
            'entidad' => $request->entidad,
            'sigla' => $request->sigla,
            'persona_colectiva' => $request->persona_colectiva,
            'nro_certificado' =>  $nro_certificado,
            'naturaleza' => $request->naturaleza,
            'obs' => $request->obs,
            'representante' => $request->representante,
            'ci_rep' => $request->ci_rep,
            'ext_ci_rep' => $request->ext_ci_rep,
            'telefono' => $request->telefono,
            'correo' => $request->correo,
            'create' => $request->user_id,
            'user_administrativo_id' => $administrativo->id,
        ]);

        return response()->json([
            'reserva' => $reserva,
            'status' => true,
            'message' => 'Reserva de nombre registrado satisfactoriamente'
        ]);
    }

    public function update(ReservaOtorgacion $reserva_otorgacion, Request $request)
    {
        $user_auth = auth()->user();

        $rules = [
            'fecha_reg' => 'required',
            'hr' => 'required',
            'entidad' => 'required|string|max:250',
            'sigla' => 'required|string|max:100',
            'persona_colectiva' => 'required',
            'nro_certificado' => 'required',
            'naturaleza' => 'required',
            'obs' => 'required',
            'representante' => 'required',
            'ci_rep' => 'required',
            'ext_ci_rep' => 'required',
            'telefono' => 'required|string|min:8|max:50',
            'correo' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $reserva_otorgacion->hr = $request->hr;
        $reserva_otorgacion->entidad = $request->entidad;
        $reserva_otorgacion->sigla = $request->sigla;
        $reserva_otorgacion->representante = $request->representante;
        $reserva_otorgacion->ci_rep = $request->ci_rep;
        $reserva_otorgacion->ext_ci_rep = $request->ext_ci_rep;
        $reserva_otorgacion->persona_colectiva = $request->persona_colectiva;
        $reserva_otorgacion->naturaleza = $request->naturaleza;
        $reserva_otorgacion->correo = $request->correo;
        $reserva_otorgacion->telefono = $request->telefono;
        $reserva_otorgacion->obs = $request->obs;
        $reserva_otorgacion->update = $user_auth->id;
        $reserva_otorgacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Reserva de nombre actualizado satisfactoriamente'
        ]);
    }

    public function entregar(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $reserva_otorgacion = ReservaOtorgacion::find($request->id);
        $reserva_otorgacion->fecha_entrega = $fecha;
        $reserva_otorgacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Fecha registrada satisfactoriamente'
        ]);
    }

}
