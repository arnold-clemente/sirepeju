<?php

namespace App\Http\Controllers;

use App\Models\FundadoresGobernacion;
use App\Models\OtorgacionGobernacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FundadoresGobernacionController extends Controller
{
    public function store(Request $request)
    {
        $nombre = '';
        $rules = [
            'nombre_completo' => 'required|string|max:100',
            'otorgacion_gobernacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $fundador_gob = FundadoresGobernacion::create([
            'nombre_completo' => $request->nombre_completo,
            'ci' => $request->ci,
            'otorgacion_gobernacion_id' => $request->otorgacion_gobernacion_id,
        ]);

        $fundadores = FundadoresGobernacion::where('otorgacion_gobernacion_id', $request->otorgacion_gobernacion_id)->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $otorgacion = OtorgacionGobernacion::find($request->otorgacion_gobernacion_id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        return response([
            'fundador' => $fundador_gob,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(FundadoresGobernacion $fundadores_gobernacion, Request $request)
    {
        $nombre = '';
        $rules = [
            'nombre_completo' => 'required|string|max:100',
            'otorgacion_gobernacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $fundadores = FundadoresGobernacion::where('estado', 1)
            ->where('otorgacion_gobernacion_id', $request->otorgacion_gobernacion_id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $otorgacion = OtorgacionGobernacion::find($request->otorgacion_gobernacion_id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        $fundadores_gobernacion->nombre_completo = $request->nombre_completo;
        $fundadores_gobernacion->ci = $request->ci;
        $fundadores_gobernacion->save();

        return response([
            'fundador' => $fundadores_gobernacion,
            'status' => true,
            'message' => 'Actualizado satisfactoriamente'
        ]);
    }

    public function destroy(FundadoresGobernacion $fundadores_gobernacion)
    {
        $nombre = '';
        $id = $fundadores_gobernacion->otorgacion_gobernacion_id;
        $fundadores_gobernacion->delete();

        $fundadores = FundadoresGobernacion::where('estado', 1)
            ->where('otorgacion_gobernacion_id', $id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $otorgacion = OtorgacionGobernacion::find($id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        return response([
            'fundador' => $otorgacion,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
