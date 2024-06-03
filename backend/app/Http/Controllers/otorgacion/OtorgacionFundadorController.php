<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Modificacion;
use App\Models\Otorgacion;
use App\Models\OtorgacionFundador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OtorgacionFundadorController extends Controller
{
    public function index(Otorgacion $otorgacion)
    {
        $fundadores = DB::table('otorgacion_fundadors')
            ->where('estado', 1)
            ->where('otorgacion_id', $otorgacion->id)
            ->get();

        return response()->json($fundadores);
    }

    public function store(Request $request)
    {
        $fundadores = $request->all();
        $nombre = '';
        $user_auth = auth()->user();

        foreach ($fundadores as $fundador) {
            $nombre = $fundador['nombre'] . ', ' . $nombre;
            $otorgacionId = $fundador['otorgacion_id'];

            OtorgacionFundador::create([
                'nombre_completo' => $fundador['nombre'],
                'ci' => $fundador['ci'],
                'otorgacion_id' => $fundador['otorgacion_id'],
                'create' => $user_auth->id,
            ]);

            $otorgacion = Otorgacion::find($otorgacionId);
            $otorgacion->miembros_fundador = $nombre;
            $otorgacion->save();
        }

        return response()->json([
            'data' => $otorgacion,
            'status' => true,
            'message' => 'Fundadores'
        ]);
    }

    public function create(Request $request)
    {
        $nombre = '';
        $user_auth = auth()->user();
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

        $fundador_otor = OtorgacionFundador::create([
            'nombre_completo' => $request->nombre_completo,
            'ci' => $request->ci,
            'otorgacion_id' => $request->otorgacion_id,
            'create' => $user_auth->id,
        ]);

        $modificacion = Modificacion::where('otorgacion_id', $request->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se añadio ' . $request->nombre_completo;
        $modificacion->save();

        $fundadores = OtorgacionFundador::where('otorgacion_id', $request->otorgacion_id)->get();
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

    public function update(OtorgacionFundador $otorgacion_fundador, Request $request)
    {
        $nombre = '';
        $user_auth = auth()->user();
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

        $otorgacion_fundador->nombre_completo = $request->nombre_completo;
        $otorgacion_fundador->ci = $request->ci;
        $otorgacion_fundador->update = $user_auth->id;
        $otorgacion_fundador->save();

        $fundadores = OtorgacionFundador::where('estado', 1)
            ->where('otorgacion_id', $request->otorgacion_id)
            ->get();

        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $modificacion = Modificacion::where('otorgacion_id', $request->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se actualizo ' . $otorgacion_fundador->nombre_completo . ' por ' . $request->nombre_completo;
        $modificacion->save();

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->miembros_fundador = $nombre;
        $otorgacion->save();


        return response([
            'fundador' => $otorgacion,
            'status' => true,
            'message' => 'Actualizado satisfactoriamente'
        ]);
    }

    public function destroy(OtorgacionFundador $otorgacion_fundador)
    {
        $nombre = '';
        $user_auth = auth()->user();
        $id = $otorgacion_fundador->otorgacion_id;

        $otorgacion_fundador->estado = 0;
        $otorgacion_fundador->delete = $user_auth->id;
        $otorgacion_fundador->save();

        $fundadores = OtorgacionFundador::where('estado', 1)
            ->where('otorgacion_id', $id)
            ->get();
        foreach ($fundadores as $fundador) {
            $nombre = $fundador->nombre_completo . ', ' . $nombre;
        }

        $modificacion = Modificacion::where('otorgacion_id', $otorgacion_fundador->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->miembros_fundador = $modificacion->miembros_fundador . ', se elimino ' . $otorgacion_fundador->nombre_completo;
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
