<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Requisito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RequisitoController extends Controller
{
    public function index()
    {
        $requisitos = Requisito::where('estado', 1)->get();

        return response()->json($requisitos);
    }

    public function show(Requisito $requisito)
    {
        return response()->json($requisito);
    }

    public function store(Request $request)
    {
        $imagen = $request->file('imagen');
        $nombre = $request->nombre;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'imagen' => $imagen,
            ),
            array(
                'nombre' => 'required|string|max:200',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $requisito = Requisito::create([
            'imagen' => $request->imagen->store('requisitos', 'public'),
            'nombre' => $request->nombre,
        ]);

        return response()->json([
            'requisito' => $requisito,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        if ($request->hasFile('imagen')) {
            $rules = array(
                'nombre' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
            );
        } else {
            $rules = array(
                'nombre' => 'required|string|max:250',
            );
        }

        $imagen = $request->file('imagen');
        $nombre = $request->nombre;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'imagen' => $imagen,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $requisito = Requisito::find($request->requisito_id);
        if ($request->hasFile('imagen')) {
            Storage::disk('public')->delete($requisito->imagen);
            $requisito->imagen = $request->imagen->store('requisitos', 'public');
        }

        $requisito->nombre = $request->nombre;

        $requisito->save();

        return response()->json([
            'registro' => $requisito,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }


    public function destroy(Requisito $requisito)
    {

        $requisito->estado = 0;
        $requisito->save();

        return response()->json([
            'registro' => $requisito,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
