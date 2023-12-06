<?php

namespace App\Http\Controllers;

use App\Models\FundadoresOtorgacion;
use App\Models\Modificacion;
use App\Models\Otorgacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FundadoresOtorgacionController extends Controller
{
    public function index(Otorgacion $otorgacion)
    {
        // $otorgacion_id = $request->otorgacion_id;
        $fundadores = FundadoresOtorgacion::where('estado', 1)
            ->where('otorgacion_id', $otorgacion->id)
            ->get();

        return response()->json($fundadores);
    }

    public function store(Request $request)
    {
        $fundadores = $request->all();
        $nombre = '';

        foreach ($fundadores as $fundador) {
            $nombre = $fundador['nombre'] . ', ' . $nombre;
            $otorgacionId = $fundador['otorgacion_id'];

            FundadoresOtorgacion::create([
                'nombre_completo' => $fundador['nombre'],
                'ci' => $fundador['ci'],
                'otorgacion_id' => $fundador['otorgacion_id'],
            ]);

            $otorgacion = Otorgacion::find($otorgacionId);
            $otorgacion->miembros_fundador = $nombre;
            $otorgacion->save();
        }

        return response()->json([
            'data' => $otorgacion,
            'status' => true,
            'message' => 'se creo los fundadores'
        ]);
    }

    public function create(Request $request)
    {
        $nombre = '';
        if ($request->ci) {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'otorgacion_id' => 'required',
                'ci' => 'string|max:12'
            ];
        } else {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'otorgacion_id' => 'required',
            ];
        }

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $fundador_otor = FundadoresOtorgacion::create([
            'nombre_completo' => $request->nombre_completo,
            'ci' => $request->ci,
            'otorgacion_id' => $request->otorgacion_id,
        ]);

        $modificacion = Modificacion::where('otorgacion_id', $request->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se añadio ' . $request->nombre_completo;
        $modificacion->save();

        $fundadores = FundadoresOtorgacion::where('otorgacion_id', $request->otorgacion_id)->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        return response([
            'fundador' => $fundador_otor,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(FundadoresOtorgacion $fundador_Otorgacion, Request $request)
    {
        $nombre = '';
        if ($request->ci) {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'otorgacion_id' => 'required',
                'ci' => 'string|max:12'
            ];
        } else {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'otorgacion_id' => 'required',
            ];
        }

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $fundadores = FundadoresOtorgacion::where('estado', 1)
            ->where('otorgacion_id', $request->otorgacion_id)
            ->get();

        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }
        
        $modificacion = Modificacion::where('otorgacion_id', $request->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se actualizo ' . $fundador_Otorgacion->nombre_completo . ' por ' . $request->nombre_completo;
        $modificacion->save();

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        $fundador_Otorgacion->nombre_completo = $request->nombre_completo;
        $fundador_Otorgacion->ci = $request->ci;
        $fundador_Otorgacion->save();


        return response([
            'fundador' => $otorgacion,
            'status' => true,
            'message' => 'Actualizado satisfactoriamente'
        ]);
    }

    public function destroy(FundadoresOtorgacion $fundador_Otorgacion)
    {
        $nombre = '';
        $id = $fundador_Otorgacion->otorgacion_id;
        $fundador_Otorgacion->delete();

        $fundadores = FundadoresOtorgacion::where('estado', 1)
            ->where('otorgacion_id', $id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $modificacion = Modificacion::where('otorgacion_id', $fundador_Otorgacion->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se elimino ' . $fundador_Otorgacion->nombre_completo;
        $modificacion->save();

        $otorgacion = Otorgacion::find($id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();

        return response([
            'fundador' => $otorgacion,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
