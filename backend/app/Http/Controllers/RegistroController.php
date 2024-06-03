<?php

namespace App\Http\Controllers;

use App\Models\Registro;
use App\Models\UserAdministrativo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistroController extends Controller
{
    public function index()
    {
        $registros = Registro::where('estado', 1)->get();

        return response()->json($registros);
    }

    public function show(Registro $registro)
    {
        return response()->json($registro);
    }

    public function store(Request $request)
    {
        $rules = [
            'codigo' => 'required|string|max:150',
            'fecha' => 'required',
            'personalidad_juridica' => 'required|string|max:255',
            'sigla' => 'required|string|max:100',
            'naturaleza' => 'required',
            'observacion' => 'required|string|max:255',
            'estado' => 'required',
            'user_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $administrativo = UserAdministrativo::where('user_id', $request->user_id)->first();

        $registro = Registro::create([
            'fecha' => $request->fecha,
            'codigo' => $request->codigo,
            'personalidad_juridica' => $request->personalidad_juridica,
            'sigla' => $request->sigla,
            'naturaleza' => $request->naturaleza,
            'observacion' => $request->observacion,
            'estado' => 1,
            'user_administrativo_id' => $administrativo->id,
        ]);


        return response()->json([
            'registro' => $administrativo,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Registro $registro, Request $request)
    {
        $rules = [
            'codigo' => 'required|string|max:150',
            'fecha' => 'required',
            'personalidad_juridica' => 'required|string|max:255',
            'sigla' => 'required|string|max:100',
            'naturaleza' => 'required',
            'observacion' => 'required|string|max:255',
            'estado' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $registro->codigo = $request->codigo;
        $registro->fecha = $request->fecha;
        $registro->personalidad_juridica = $request->personalidad_juridica;
        $registro->sigla = $request->sigla;
        $registro->naturaleza = $request->naturaleza;
        $registro->observacion = $request->observacion;
        $registro->save();

        return response()->json([
            'registro' => $registro,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Registro $registro)
    {

        $registro->estado = 0;
        $registro->save();

        return response()->json([
            'registro' => $registro,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
