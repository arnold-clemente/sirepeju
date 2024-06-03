<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Requisito;
use App\Models\Tramite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TramiteController extends Controller
{
    public function index(Requisito $requisito)
    {
        $tramites = Tramite::where('requisito_id', $requisito->id)
            ->where('estado', 1)
            ->get();

        return response()->json([
            'tramites' => $tramites,
            'requisito' => $requisito
        ]);
    }

    public function show(Tramite $tramite)
    {
        return response()->json($tramite);
    }

    public function store(Request $request)
    {
        $nombre = $request->nombre;
        $requisito_id = $request->requisito_id;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'requisito_id' => $requisito_id,
            ),
            array(
                'nombre' => 'required|string|max:200',
                'requisito_id' => 'required'
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $tramite = Tramite::create([
            'nombre' => $request->nombre,
            'requisito_id' => $request->requisito_id,
        ]);

        return response()->json([
            'tramite' => $tramite,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        $rules = array(
            'nombre' => 'required|string|max:200',
        );

        $nombre = $request->nombre;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $tramite = Tramite::find($request->tramite_id);
        $tramite->nombre = $request->nombre;
        $tramite->save();

        return response()->json([
            'registro' => $tramite,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Tramite $tramite)
    {

        $tramite->estado = 0;
        $tramite->save();

        return response()->json([
            'registro' => $tramite,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
