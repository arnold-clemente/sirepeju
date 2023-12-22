<?php

namespace App\Http\Controllers\gobernacion;

use App\Http\Controllers\Controller;
use App\Models\GobernacionFundador;
use App\Models\OtorgacionGobernacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OtorgacionGobernacionFundadorController extends Controller
{
    public function store(Request $request)
    {
        $nombre = '';
        $user_auth = auth()->user();
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

        $fundador_gob = GobernacionFundador::create([
            'nombre_completo' => $request->nombre_completo,
            'ci' => $request->ci,
            'otorgacion_gobernacion_id' => $request->otorgacion_gobernacion_id,
            'create' => $user_auth->id,
        ]);

        $fundadores = GobernacionFundador::where('otorgacion_gobernacion_id', $request->otorgacion_gobernacion_id)->get();
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

    public function update(GobernacionFundador $gobernacion_fundador, Request $request)
    {
        $nombre = '';
        $user_auth = auth()->user();
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

        $fundadores = GobernacionFundador::where('estado', 1)
            ->where('otorgacion_gobernacion_id', $request->otorgacion_gobernacion_id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $otorgacion = OtorgacionGobernacion::find($request->otorgacion_gobernacion_id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        $gobernacion_fundador->nombre_completo = $request->nombre_completo;
        $gobernacion_fundador->ci = $request->ci;
        $gobernacion_fundador->update = $user_auth->id;
        $gobernacion_fundador->save();

        return response([
            'fundador' => $gobernacion_fundador,
            'status' => true,
            'message' => 'Actualizado satisfactoriamente'
        ]);
    }

    public function destroy(GobernacionFundador $gobernacion_fundador)
    {
        $nombre = '';
        $user_auth = auth()->user();
        $id = $gobernacion_fundador->otorgacion_gobernacion_id;
        $gobernacion_fundador->estado = 0;
        $gobernacion_fundador->delete = $user_auth->id;
        $gobernacion_fundador->save();

        $fundadores = GobernacionFundador::where('estado', 1)
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
