<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdecuacionRevocadoController extends Controller
{
    public function getrevocados()
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
                'resolucion_ministerial',
                'fecha_resolucion',
                'estado',
                'nota_revocatorio',
                'fecha_revocatoria',
                'revocatoria'
            )
            ->whereIn('estado', [5])
            ->get();

        return response()->json($adecuaciones);
    }

    public function revocar(Request $request)
    {
        $rules = [
            'nota_revocatorio' => 'required|string|max:100',
            'observacion' => 'required|string|max:255',
            'fecha_revocatoria' => 'required',
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
        $adecuacion->nota_revocatorio = $request->nota_revocatorio;
        $adecuacion->revocatoria = $request->observacion;
        $adecuacion->fecha_revocatoria = $request->fecha_revocatoria;
        $adecuacion->revocado = $user_auth->id;
        $adecuacion->estado = 5;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
