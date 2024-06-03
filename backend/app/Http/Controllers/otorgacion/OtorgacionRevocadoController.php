<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Otorgacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OtorgacionRevocadoController extends Controller
{
    public function getrevocados()
    {
        $otorgaciones = DB::table('otorgacions')
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
                'codigo_otorgacion',
                'domicilio_legal',
                'objeto',
                'alfanumerico',
                'seguimiento',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado',
                'nota_revocatorio',
                'fecha_revocatoria',
                'resolucion_ministerial',
                'fecha_resolucion',
                'revocatoria'
            )
            ->whereIn('estado', [5])
            ->get();

        return response()->json($otorgaciones);
    }

    public function revocar(Request $request)
    {
        $rules = [
            'nota_revocatorio' => 'required|string|max:100',
            'observacion' => 'required|string|max:255',
            'fecha_revocatoria' => 'required',
            'otorgacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $user_auth = auth()->user();

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->nota_revocatorio = $request->nota_revocatorio;
        $otorgacion->revocatoria = $request->observacion;
        $otorgacion->fecha_revocatoria = $request->fecha_revocatoria;
        $otorgacion->revocado = $user_auth->id;
        $otorgacion->estado = 5;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'data' => $otorgacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
