<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\Registrado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistradosController extends Controller
{
    public function index()
    {
        $registrados = Registrado::where('estado', 1)->get();

        return response()->json($registrados);
    }

    public function show(Registrado $registrado)
    {
        return response()->json($registrado);
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

        $administrativo = Administrativo::where('user_id', $request->user_id)->first();

        $registrado = Registrado::create([
            'fecha' => $request->fecha,
            'codigo' => $request->codigo,
            'personalidad_juridica' => $request->personalidad_juridica,
            'sigla' => $request->sigla,
            'naturaleza' => $request->naturaleza,
            'observacion' => $request->observacion,
            'estado' => 1,
            'administrativo_id' => $administrativo->id,
        ]);


        return response()->json([
            'registrado' => $administrativo,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Registrado $registrado, Request $request)
    {
        $rules = [
            'codigo' => 'required|string|max:150',
            'fecha' => 'required',
            'personalidad_juridica' => 'required|string|max:255',
            'sigla' => 'required|string|max:100',
            'naturaleza' => 'required',
            'observacion' => 'required|string|max:255',
            'estado' => 'required',
            'administrativo_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $registrado->codigo = $request->codigo;
        $registrado->fecha = $request->fecha;
        $registrado->personalidad_juridica = $request->personalidad_juridica;
        $registrado->sigla = $request->sigla;
        $registrado->naturaleza = $request->naturaleza;
        $registrado->observacion = $request->observacion;
        $registrado->save();

        return response()->json([
            'registrado' => $registrado,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Registrado $registrado)
    {

        $registrado->estado = 0;
        $registrado->save();

        return response()->json([
            'registrado' => $registrado,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
