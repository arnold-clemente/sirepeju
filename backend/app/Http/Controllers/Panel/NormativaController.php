<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Normativa;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class NormativaController extends Controller
{
    public function index()
    {
        $normativa = Normativa::where('estado', 1)->get();

        return response()->json($normativa);
    }

    public function show(Normativa $normativa)
    {
        return response()->json($normativa);
    }

    public function store(Request $request)
    {
        $archivo = $request->file('archivo');
        $nombre = $request->nombre;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'archivo' => $archivo,
            ),
            array(
                'nombre' => 'required|string|max:250',
                'archivo' => 'required|file|max:5000|mimes:pdf,docx,doc',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $normativa = Normativa::create([
            'archivo' => $request->archivo->store('normativa', 'public'),
            'nombre' => $request->nombre,
        ]);

        return response()->json([
            'normativa' => $normativa,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        if ($request->hasFile('archivo')) {
            $rules = array(
                'nombre' => 'required|string|max:250',
                'archivo' => 'required|file|max:5000|mimes:pdf,docx,doc',
            );
        } else {
            $rules = array(
                'nombre' => 'required|string|max:250',
            );
        }

        $archivo = $request->file('archivo');
        $nombre = $request->nombre;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'archivo' => $archivo,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $normativa = Normativa::find($request->normativa_id);
        if ($request->hasFile('archivo')) {
            Storage::disk('public')->delete($normativa->archivo);
            $normativa->archivo = $request->archivo->store('normativa', 'public');
        }

        $normativa->nombre = $request->nombre;

        $normativa->save();

        return response()->json([
            'registro' => $normativa,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }


    public function destroy(Normativa $normativa)
    {

        $normativa->estado = 0;
        $normativa->save();

        return response()->json([
            'registro' => $normativa,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
