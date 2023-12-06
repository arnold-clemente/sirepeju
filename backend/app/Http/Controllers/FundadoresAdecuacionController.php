<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\FundadoresAdecuacion;
use App\Models\Modificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FundadoresAdecuacionController extends Controller
{
    public function index(Adecuacion $adecuacion)
    {
        $fundadores = FundadoresAdecuacion::where('estado', 1)
            ->where('adecuacion_id', $adecuacion->id)
            ->get();

        return response()->json($fundadores);
    }

    public function store(Request $request)
    {
        $fundadores = $request->all();
        $nombre = '';

        foreach ($fundadores as $fundador) {
            $nombre = $fundador['nombre'] . ', ' . $nombre;
            $adecuacionId = $fundador['adecuacion_id'];

            FundadoresAdecuacion::create([
                'nombre_completo' => $fundador['nombre'],
                'ci' => $fundador['ci'],
                'adecuacion_id' => $fundador['adecuacion_id'],
            ]);

            $adecuacion = Adecuacion::find($adecuacionId);
            $adecuacion->miembros_fundador = $nombre;
            $adecuacion->save();
        }

        return response()->json([
            'data' => $adecuacion,
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
                'adecuacion_id' => 'required',
                'ci' => 'string|max:12'
            ];
        } else {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'adecuacion_id' => 'required',
            ];
        }

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $fundador_ade = FundadoresAdecuacion::create([
            'nombre_completo' => $request->nombre_completo,
            'ci' => $request->ci,
            'adecuacion_id' => $request->adecuacion_id,
        ]);

        $modificacion = Modificacion::where('adecuacion_id', $request->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se añadio ' . $request->nombre_completo;
        $modificacion->save();

        $fundadores = FundadoresAdecuacion::where('adecuacion_id', $request->adecuacion_id)->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->miembros_fundador = $nombre;
        $adecuacion->save();

        return response([
            'fundador' => $fundador_ade,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(FundadoresAdecuacion $fundador_adecuacion, Request $request)
    {
        $nombre = '';
        if ($request->ci) {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'adecuacion_id' => 'required',
                'ci' => 'string|max:12'
            ];
        } else {
            $rules = [
                'nombre_completo' => 'required|string|max:100',
                'adecuacion_id' => 'required',
            ];
        }

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $fundadores = FundadoresAdecuacion::where('estado', 1)
            ->where('adecuacion_id', $request->adecuacion_id)
            ->get();

        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }
        
        $modificacion = Modificacion::where('adecuacion_id', $request->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se actualizo ' . $fundador_adecuacion->nombre_completo . ' por ' . $request->nombre_completo;
        $modificacion->save();

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->miembros_fundador = $nombre;
        $adecuacion->save();

        $fundador_adecuacion->nombre_completo = $request->nombre_completo;
        $fundador_adecuacion->ci = $request->ci;
        $fundador_adecuacion->save();


        return response([
            'fundador' => $adecuacion,
            'status' => true,
            'message' => 'Actualizado satisfactoriamente'
        ]);
    }

    public function destroy(FundadoresAdecuacion $fundador_adecuacion)
    {
        $nombre = '';
        $id = $fundador_adecuacion->adecuacion_id;
        $fundador_adecuacion->delete();

        $fundadores = FundadoresAdecuacion::where('estado', 1)
            ->where('adecuacion_id', $id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $modificacion = Modificacion::where('adecuacion_id', $fundador_adecuacion->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se elimino ' . $fundador_adecuacion->nombre_completo;
        $modificacion->save();

        $adecuacion = Adecuacion::find($id);
        $adecuacion->miembros_fundador = $nombre;
        $adecuacion->save();

        return response([
            'fundador' => $adecuacion,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }

}
