<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdecuacionExtinguidoController extends Controller
{
    public function getextinguidas()
    {
        $adecuaciones = DB::table('adecuacions')
            ->select(
                'id',
                'personalidad_juridica',
                'sigla',
                'representante',
                'ci_rep',
                'ext_ci_rep',
                'naturaleza',
                'persona_colectiva',
                'fecha_ingreso_tramite',
                'codigo_adecuacion',
                'domicilio_legal',
                'objeto',
                'alfanumerico',
                'seguimiento',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado',
                'nota_extincion',
                'fecha_extenion',
                'extincion'
            )
            ->whereIn('estado', [6])
            ->get();

        return response()->json($adecuaciones);
    }

    public function extinguir(Request $request)
    {
        $rules = [
            'nota_extincion' => 'required|string|max:100',
            'observacion' => 'required|string|max:255',
            'fecha_extenion' => 'required',
            'adecuacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $user_auth = auth()->user();

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->nota_extincion = $request->nota_extincion;
        $adecuacion->fecha_extenion = $request->fecha_extenion;
        $adecuacion->extincion = $request->observacion;
        $adecuacion->extinguido = $user_auth->id;
        $adecuacion->estado = 6;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
