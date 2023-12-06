<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\Registro;
use App\Models\Reservanombre;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistroController extends Controller
{
    public function index()
    {
        $registro = Registro::whereIn('estado',[4,5])->get();
        return response()->json($registro);
    }

    public function store(Request $request)
    {
         $rules = [
                  'fecha_reg' => 'required',
                    'hr' => 'required',
                   'entidad' => 'required',
                    'sigla' => 'required',
                     'obs'=> 'required',
                    'fecha_entrega' => 'required',
                    'estado'=>'required',
                    'representante'=>'required',
                    'telefono' => 'required',
                     'correo' => 'required',
                    //'estado'=> 'required',
                    'reserva_nombre_id' => 'required',
                    'user_id' => 'required'
                ];
        $validator = Validator::make($request->input(),$rules);
        if($validator->fails()){
            return response()->json([
                'status'=> false,
                'errors'=>$validator->errors()->all()
            ],400);
        }
        /*$registro = new Registro($request->input());
        $registro->save();*/
        $ultimo = Reservanombre::select('id')->orderBy('id', 'desc')->first();
        $administrativo = Administrativo::where('user_id', $request->user_id)->first();
        $numero = $ultimo->id + 200;
        $nro_certificado =  '00-0' . $numero; 

        $reserva = Registro::create([
            'fecha_reg' => $request->fecha_reg,
            'hr' => $request->hr,
            'entidad' => $request->entidad,
            'sigla' => $request->sigla,
            'persona_colectiva' => $request->persona_colectiva,
            'nro_certificado' =>  $nro_certificado,
            'naturaleza' => $request->naturaleza,
            'obs' => $request->obs,
            'representante' => $request->representante,
            'telefono' => $request->telefono,
            'correo' => $request->correo,
            'reserva_nombre_id' => $request->reserva_nombre_id,
            'administrativo_id' => $administrativo->id,
            'create_admin' => $request->user_id,
            'update_admin' => 1
            //'estado' => 1,
        ]);
        return response()->json([
            'status' => true,
            'message'=> 'Registro creado satisfactoriamente'
        ],400);

    }

    public function show(Registro $registro)
    {
        return response()->json([
            'status'=>true,
            'data'=> $registro
        ]);
    }

    public function update(Request $request, Registro $registro)
    {
        $rules = [
            'fecha_reg'=>'required',
            'hr'=> 'required',
            'entidad'=>'required|string|max:250',
            'sigla'=>'required|string|max:100',
             'persona_colectiva'=> 'required',
            // 'nro_certificado'=> 'required',
              'naturaleza'=> 'required',
              'obs'=>'required',
              //'fecha_entrega'=>'required',
             'representante'=>'required',
             //'ci_rep'=>'required',
             //'ext_ci_rep'=>'required',
             'telefono'=>'required|string|min:8|max:50',
             'correo'=>'required',
          ];
 
         $validator = Validator::make($request->input(),$rules);
         if($validator->fails()){
             return response()->json([
                 'status'=> false,
                 'errors'=>$validator->errors()->all()
             ],200);
         }
 
         $registro->hr = $request->hr;
         $registro->entidad = $request->entidad;
         $registro->sigla = $request->sigla;
         $registro->representante = $request->representante;
         $registro->persona_colectiva = $request->persona_colectiva;
         $registro->naturaleza = $request->naturaleza;
         $registro->correo = $request->correo;
         $registro->telefono = $request->telefono;
         $registro->obs = $request->obs;
         $registro->update_admin = $request->user_id;
         $registro->save();
         //$reservanombre->update($request->input());
         return response()->json([
             'status' => true,
             'message'=> 'Reserva de nombre actualizado satisfactoriamente'
             ],400);
    }

    public function entregar(Registro $registro)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $registro->fecha_entrega = $fecha;       
        $registro->save();

        return response()->json([
            'status' => true,
            'message'=> 'Fecha registrada satisfactoriamente'
            ]);
   }

    public function destroy(Registro $registro)
    {
        //
    }
}
