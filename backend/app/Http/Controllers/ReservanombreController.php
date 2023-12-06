<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\Reservanombre;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservanombreController extends Controller
{

    public function index()
    {
        // para las solicituddes 
        $reserva_nombre = Reservanombre::where('estado', 1)->get();
        return response()->json($reserva_nombre);
    }

    public function homonimias()
    {
        $reserva_nombre = Reservanombre::where('estado', 2)->get();
        return response()->json($reserva_nombre);
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

        $ultimo = ReservaNombre::select('id')->orderBy('id', 'desc')->first();
        $administrativo = Administrativo::where('user_id', $request->user_id)->first();
        $numero = $ultimo->id + 200;
        $nro_certificado =  '00-0' . $numero;

        $reserva = Reservanombre::create([
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
            'create_admin' => $request->user_id,
            'update_admin' => 1,
            'administrativo_id' => $administrativo->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Reserva de nombre registrado satisfactoriamente'
        ]);
    }


    public function show(Reservanombre $reserva_nombre)
    {
        return response()->json($reserva_nombre);
    }

    public function update(Reservanombre $reserva_nombre, Request $request)
    {
        $rules = [
            'fecha_reg' => 'required',
            'hr' => 'required',
            'entidad' => 'required|string|max:250',
            'sigla' => 'required|string|max:100',
            'persona_colectiva' => 'required',
            'nro_certificado' => 'required',
            'naturaleza' => 'required',
            'obs' => 'required',
            //'fecha_entrega'=>'required',
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

        $reserva_nombre->hr = $request->hr;
        $reserva_nombre->entidad = $request->entidad;
        $reserva_nombre->sigla = $request->sigla;
        $reserva_nombre->representante = $request->representante;
        $reserva_nombre->ci_rep = $request->ci_rep;
        $reserva_nombre->ext_ci_rep = $request->ext_ci_rep;
        $reserva_nombre->persona_colectiva = $request->persona_colectiva;
        $reserva_nombre->naturaleza = $request->naturaleza;
        $reserva_nombre->correo = $request->correo;
        $reserva_nombre->telefono = $request->telefono;
        $reserva_nombre->obs = $request->obs;
        $reserva_nombre->update_admin = $request->user_id;
        $reserva_nombre->save();

        return response()->json([
            'status' => true,
            'message' => 'Reserva de nombre actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Reservanombre $reservanombre)
    {
        /* $reservanombre->delete();
        return response()->json([
       'status'=>true,
       'message'=> 'registro de reservanombre eliminado satisfactoriamente'
     ],200);*/
    }

    public function entregar(Reservanombre $reserva_nombre)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $reserva_nombre->fecha_entrega = $fecha;
        $reserva_nombre->save();

        return response()->json([
            'status' => true,
            'message' => 'Fecha registrada satisfactoriamente'
        ]);
    }
}
