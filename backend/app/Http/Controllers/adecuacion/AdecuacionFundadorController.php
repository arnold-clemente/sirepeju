<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use App\Models\AdecuacionFundador;
use App\Models\Modificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdecuacionFundadorController extends Controller
{
    public function index(Adecuacion $adecuacion)
    {
        $fundadores = AdecuacionFundador::where('estado', 1)
            ->where('adecuacion_id', $adecuacion->id)
            ->get();

        return response()->json($fundadores);
    }

    public function store(Request $request)
    {
        
        $user_auth = auth()->user();
        $fundadores = $request->all();
        $nombre = '';

        foreach ($fundadores as $fundador) {
            $nombre = $fundador['nombre'] . ', ' . $nombre;
            $adecuacionId = $fundador['adecuacion_id'];

            AdecuacionFundador::create([
                'nombre_completo' => $fundador['nombre'],
                'ci' => $fundador['ci'],
                'adecuacion_id' => $fundador['adecuacion_id'],
                'create' => $user_auth->id,
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
        $user_auth = auth()->user();
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

        $fundador_ade = AdecuacionFundador::create([
            'nombre_completo' => $request->nombre_completo,
            'ci' => $request->ci,
            'adecuacion_id' => $request->adecuacion_id,
            'create' => $user_auth->id,
        ]);

        $modificacion = Modificacion::where('adecuacion_id', $request->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se añadio ' . $request->nombre_completo;
        $modificacion->save();

        $fundadores = AdecuacionFundador::where('adecuacion_id', $request->adecuacion_id)->get();
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

    public function update(AdecuacionFundador $adecuacion_fundador, Request $request)
    {
        $nombre = '';
        $user_auth = auth()->user();
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

        $adecuacion_fundador->nombre_completo = $request->nombre_completo;
        $adecuacion_fundador->ci = $request->ci;
        $adecuacion_fundador->update = $user_auth->id;
        $adecuacion_fundador->save();

        $fundadores = AdecuacionFundador::where('estado', 1)
            ->where('adecuacion_id', $request->adecuacion_id)
            ->get();

        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }
        
        $modificacion = Modificacion::where('adecuacion_id', $request->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se actualizo ' . $adecuacion_fundador->nombre_completo . ' por ' . $request->nombre_completo;
        $modificacion->save();

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->miembros_fundador = $nombre;
        $adecuacion->save();

        


        return response([
            'fundador' => $nombre,
            'status' => true,
            'message' => 'Actualizado satisfactoriamente'
        ]);
    }

    public function destroy(AdecuacionFundador $adecuacion_fundador)
    {
        $user_auth = auth()->user();
        $nombre = '';
        $id = $adecuacion_fundador->adecuacion_id;
        $adecuacion_fundador->estado = 0;
        $adecuacion_fundador->delete = $user_auth->id;
        $adecuacion_fundador->save();

        $fundadores = AdecuacionFundador::where('estado', 1)
            ->where('adecuacion_id', $id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $modificacion = Modificacion::where('adecuacion_id', $adecuacion_fundador->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se elimino ' . $adecuacion_fundador->nombre_completo;
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
