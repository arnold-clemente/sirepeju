<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Enlace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class EnlaceController extends Controller
{
    public function index()
    {
        $enlaces = Enlace::where('estado', 1)->get();

        return response()->json($enlaces);
    }

    public function show(Enlace $enlace)
    {
        return response()->json($enlace);
    }

    public function store(Request $request)
    {
        $imagen = $request->file('imagen');
        $nombre = $request->nombre;
        $enlace = $request->enlace;
        $tipo = $request->tipo;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'enlace' => $enlace,
                'imagen' => $imagen,
                'tipo' => $tipo,
            ),
            array(
                'nombre' => 'required|string|max:250',
                'enlace' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                'tipo' => 'required',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $enlace = Enlace::create([
            'imagen' => $request->imagen->store('enlace', 'public'),
            'nombre' => $request->nombre,
            'enlace' => $request->enlace,
            'tipo' => $request->tipo,
        ]);

        return response()->json([
            'enlace' => $enlace,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        if ($request->hasFile('imagen')) {
            $rules = array(
                'nombre' => 'required|string|max:250',
                'enlace' => 'required|string|max:250',
                'imagen' => 'required|file|max:1000|mimes:jpeg,jpg,png',
                'tipo' => 'required',
            );
        } else {
            $rules = array(
                'nombre' => 'required|string|max:250',
                'enlace' => 'required|string|max:250',
                'tipo' => 'required',
            );
        }

        $imagen = $request->file('imagen');
        $nombre = $request->nombre;
        $enlace = $request->enlace;
        $tipo = $request->tipo;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'enlace' => $enlace,
                'imagen' => $imagen,
                'tipo' => $tipo,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $enlace = Enlace::find($request->enlace_id);
        if ($request->hasFile('imagen')) {
            Storage::disk('public')->delete($enlace->imagen);
            $enlace->imagen = $request->imagen->store('enlace', 'public');
        }

        $enlace->nombre = $request->nombre;
        $enlace->enlace = $request->enlace;
        $enlace->tipo = $request->tipo;

        $enlace->save();

        return response()->json([
            'registro' => $enlace,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Enlace $enlace)
    {
        $enlace->estado = 0;
        $enlace->save();

        return response()->json([
            'registro' => $enlace,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
