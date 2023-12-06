<?php

namespace App\Http\Controllers;

use App\Models\Modificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModificacionController extends Controller
{
    public function index()
    {
        $modificaciones = DB::table('modificacions')->get();

        return response()->json($modificaciones);
    }

    public function getOtorgacion(Request $request)
    {
        // return response()->json($request->all());
        $modificacion_id = $request->modificacion_id;
        $otorgacion_id = $request->otorgacion_id;

        $otorgacion = DB::table('otorgacions')
        ->join('modificacions', 'otorgacions.id', '=', 'modificacions.otorgacion_id')
        ->join('registro_persona_colectivas', 'otorgacions.id', '=', 'registro_persona_colectivas.otorgacion_id')
        ->selectRaw('registro_persona_colectivas.*, otorgacions.*')
        ->where('modificacions.id', $modificacion_id )
            ->first();

            $fundadores = DB::table('fundadores_otorgacions')
            ->where('fundadores_otorgacions.otorgacion_id', $otorgacion_id)
            ->where('fundadores_otorgacions.estado', 1 )
            ->get();

        return response()->json([
            'otorgacion' => $otorgacion,
            'fundadores' => $fundadores,
        ]);
    }
}
