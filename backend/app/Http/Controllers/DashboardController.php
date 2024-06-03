<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // $date = Carbon::now();
        $year = $request->year;


        $reservas = DB::table('reserva_otorgacions')
            ->selectRaw('
                    count(id) as cantidad,
                    MONTH(fecha_reg) as mes
                ')
            ->whereIn('estado', [1, 2, 3, 4])
            ->whereYear('fecha_reg', $year)
            ->groupBy('mes')
            ->orderBy('mes', 'asc')
            ->get();

        $otorgaciones = DB::table('otorgacions')
            ->selectRaw('
                    count(id) as cantidad,
                    MONTH(fecha_ingreso_tramite) as mes
                ')
            ->whereYear('fecha_ingreso_tramite', $year)
            ->groupBy('mes')
            ->orderBy('mes', 'asc')
            ->get();

        $adecuaciones = DB::table('adecuacions')
            ->selectRaw('
                count(id) as cantidad,
                MONTH(fecha_ingreso_tramite) as mes              
            ')
            ->groupBy('mes')
            ->whereYear('fecha_ingreso_tramite', $year)
            ->orderBy('mes', 'asc')
            ->get();

        $gobernaciones = DB::table('gobernacions')
            ->selectRaw('
                count(id) as cantidad,
                MONTH(fecha_resolucion) as mes
            ')
            ->whereYear('fecha_resolucion', $year)
            ->where('estado', 1)
            ->groupBy('mes')
            ->orderBy('mes', 'asc')
            ->get();

        $consulta_year = DB::table('reserva_otorgacions')
            ->selectRaw('YEAR(fecha_reg) as year')
            ->groupBy('year')
            ->get();

            $years_array = $consulta_year->pluck("year")->toArray();

        return response()->json([
            'reservas' => $reservas,
            'otorgaciones' => $otorgaciones,
            'adecuaciones' => $adecuaciones,
            'gobernaciones' => $gobernaciones,
            'year' => $years_array,
        ]);
    }


    public function gobernacion(Request $request)
    {
        $year = $request->year;
        $user_auth = auth()->user();
        $gobernacion = DB::table('gobernacions')
        ->where('user_id', $user_auth->id)
        ->first();

        $institucion = DB::table('institucions')
        ->where('id', $gobernacion->institucion_id)
        ->first();

        $otorgaciones = DB::table('gobernacions')
        ->selectRaw('
            count(id) as cantidad,
            MONTH(fecha_resolucion) as mes
        ')
        ->whereYear('fecha_resolucion', $year)
        ->where('institucion_id', $gobernacion->institucion_id )
        ->where('estado', 1)
        ->groupBy('mes')
        ->orderBy('mes', 'asc')
        ->get();

        $consulta_year = DB::table('gobernacions')
        ->selectRaw('YEAR(fecha_resolucion) as year')
        ->groupBy('year')
        ->get();

        $years_array = $consulta_year->pluck("year")->toArray();

        return response()->json([
            'gobernacion' => $gobernacion,
            'otorgaciones' => $otorgaciones,
            'institucion' => $institucion,
            'year' => $years_array,
        ]);
    }

    

    public function prueba()
    {
        $reservas = DB::table('reserva_otorgacions')
            ->selectRaw('
                    count(id) as cantidad,
                    estado,
                    tipo
                ')
            ->whereIn('estado', [1, 2, 3, 4])
            ->groupBy('estado', 'tipo')
            ->get();

        $otorgaciones = DB::table('otorgacions')
            ->selectRaw('
                    count(id) as cantidad,
                    estado,
                    tipo
                ')
            ->groupBy('estado', 'tipo')
            ->get();

        $adecuaciones = DB::table('adecuacions')
            ->selectRaw('
                count(id) as cantidad,
                estado,
                tipo
            ')
            ->groupBy('estado', 'tipo')
            ->get();

        $gobernaciones = DB::table('gobernacions')
            ->join('institucions', 'gobernacions.institucion_id', '=', 'institucions.id')
            ->selectRaw('
                count(gobernacions.institucion_id) as cantidad,
                institucions.nombre as institucion,
                institucions.departamento as departamento,
                gobernacions.tipo as tipo
            ')
            ->whereIn('gobernacions.estado', [1])
            ->groupBy('institucions.nombre', 'institucions.departamento', 'gobernacions.tipo')
            ->get();

        $registros = DB::table('registros')
            ->selectRaw('
                count(id) as cantidad,
                estado as estado,
                tipo
            ')
            ->groupBy('estado', 'tipo')
            ->whereIn('estado', [1])
            ->get();

        return response()->json([
            'reservas' => $reservas,
            'otorgaciones' => $otorgaciones,
            'adecuaciones' => $adecuaciones,
            'gobernaciones' => $gobernaciones,
            'registros' => $registros,
        ]);
    }
}
