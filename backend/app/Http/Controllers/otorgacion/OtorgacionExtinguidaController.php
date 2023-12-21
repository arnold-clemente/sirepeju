<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Otorgacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OtorgacionExtinguidaController extends Controller
{
    public function getextinguidas()
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
                'nota_extincion',
                'fecha_extenion',
                'extincion'
            )
            ->whereIn('estado', [6])
            ->get();

        return response()->json($otorgaciones);
    }

    public function extinguir(Request $request)
    {
        $rules = [
            'nota_extincion' => 'required|string|max:100',
            'observacion' => 'required|string|max:255',
            'fecha_extenion' => 'required',
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
        $otorgacion->nota_extincion = $request->nota_extincion;
        $otorgacion->fecha_extenion = $request->fecha_extenion;
        $otorgacion->extincion = $request->observacion;
        $otorgacion->extinguido = $user_auth->id;
        $otorgacion->estado = 6;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'data' => $otorgacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
