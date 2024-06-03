<?php

namespace App\Http\Controllers\Pagina;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use App\Models\AdecuacionPersonalidad;
use App\Models\Gobernacion;
use App\Models\Otorgacion;
use App\Models\OtorgacionGobernacion;
use App\Models\OtorgacionPersonalidad;
use App\Models\OtorgacionSeguimiento;
use Illuminate\Support\Facades\DB;

class BusquedaController extends Controller
{
    public function tramites()
    {
        $otorgaciones = DB::table('otorgacions')
            ->select(
                '.id as otorgacion_id',
                'personalidad_juridica as entidad',
                'sigla as sigla',
                'estado as estado',
                'codigo_otorgacion as codigo',
                'objeto as objeto',
                'tipo as tipo',
            )
            ->whereIn('estado', [1])
            ->orderBy('id', 'desc')
            ->get();

        $adecuaciones = DB::table('adecuacions')
            ->select(
                'id as adecuacion_id',
                'personalidad_juridica as entidad',
                'sigla as sigla',
                'estado as estado',
                'codigo_adecuacion as codigo',
                'objeto as objeto',
                'tipo as tipo',
            )
            ->whereIn('estado', [1])
            ->orderBy('id', 'desc')
            ->get();

        $entidades = $otorgaciones->concat($adecuaciones);

        return response()->json($entidades);
    }

    public function finalizados()
    {
        $otorgaciones = DB::table('otorgacions')
            ->select(
                '.id as otorgacion_id',
                'personalidad_juridica as entidad',
                'sigla as sigla',
                'estado as estado',
                'codigo_otorgacion as codigo',
                'resolucion_ministerial as resolucion',
                'objeto as objeto',
                'tipo as tipo',
            )
            ->whereIn('estado', [5])
            ->orderBy('id', 'desc')
            ->get();

        $adecuaciones = DB::table('adecuacions')
            ->select(
                'id as adecuacion_id',
                'personalidad_juridica as entidad',
                'sigla as sigla',
                'estado as estado',
                'codigo_adecuacion as codigo',
                'resolucion_ministerial as resolucion',
                'objeto as objeto',
                'tipo as tipo',
            )
            ->whereIn('estado', [5])
            ->orderBy('id', 'desc')
            ->get();

        $gobernaciones = DB::table('gobernacions')
            ->select(
                'id as gobernacion_id',
                'nombre_persona_colectiva as entidad',
                'sigla as sigla',
                'resolucion as codigo',
                'resolucion as resolucion',
                'estado as estado',
                'objeto as objeto',
                'tipo as tipo',
            )
            ->whereIn('estado', [1])
            ->orderBy('id', 'desc')
            ->get();

        $entidades = $otorgaciones->concat($adecuaciones)->concat($gobernaciones);

        return response()->json($entidades);
    }

    public function show_otorgacion(Otorgacion $otorgacion)
    {
        $seguimientos = DB::table('otorgacion_seguimientos')
            ->whereIn('estado', [1])
            ->where('otorgacion_id', $otorgacion->id)
            ->orderBy('id', 'desc')
            ->first();

        $informes = DB::table('otorgacion_informes')
            ->whereIn('estado', [1])
            ->where('otorgacion_id', $otorgacion->id)
            ->orderBy('id', 'desc')
            ->first();

        return response()->json([
            'otorgacion' => $otorgacion,
            'seguimientos' => $seguimientos,
            'informes' => $informes
        ]);
    }

    public function show_adecuacion(Adecuacion $adecuacion)
    {
        $seguimientos = DB::table('adecuacion_seguimientos')
            ->whereIn('estado', [1])
            ->where('adecuacion_id', $adecuacion->id)
            ->orderBy('id', 'desc')
            ->first();

        $informes = DB::table('adecuacion_informes')
            ->whereIn('estado', [1])
            ->where('adecuacion_id', $adecuacion->id)
            ->orderBy('id', 'desc')
            ->first();

        return response()->json([
            'adecuacion' => $adecuacion,
            'seguimientos' => $seguimientos,
            'informes' => $informes
        ]);
    }

    public function show_gobernacion(Gobernacion $gobernacion)
    {
        return response()->json([
            'otorgacion' =>  $gobernacion,
        ]);
    }
}
