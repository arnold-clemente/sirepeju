<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VerificacionController extends Controller
{
    public function verificacion()
    {
        $reservas = DB::table('reserva_otorgacions')
            ->select(
                'id as reserva_id',
                'entidad',
                'sigla',
                'representante',
                'estado',
                'naturaleza',
                'tipo'
            )
            ->whereIn('estado', [1,2,3,4])
            ->orderBy('id', 'desc')
            ->get();

        $otorgaciones = DB::table('otorgacions')
            ->select(
                'id as otorgacion_id',
                'personalidad_juridica as entidad',
                'sigla',
                'miembros_fundador as representante',
                'estado',
                'naturaleza',
                'tipo'
            )
            ->whereIn('estado', [1, 2, 3, 4, 5, 6, 7, 8])
            ->orderBy('id', 'desc')
            ->get();

        $adecuaciones = DB::table('adecuacions')
            ->select(
                'id as adecuacion_id',
                'personalidad_juridica as entidad',
                'sigla',
                'miembros_fundador as representante',
                'estado',
                'naturaleza',
                'tipo'
            )
            ->whereIn('estado', [1, 2, 3, 4, 5, 6, 7, 8])
            ->orderBy('id', 'desc')
            ->get();

        $gobernaciones = DB::table('otorgacion_gobernacions')
            ->select(
                'id as gobernacion_id',
                'nombre_persona_colectiva as entidad',
                'sigla',
                'miembros_fundador as representante',
                'estado',
                'naturaleza',
                'tipo'
            )
            ->whereIn('estado', [1])
            ->orderBy('id', 'desc')
            ->get();

        $entidades = $reservas->concat($otorgaciones)->concat($adecuaciones)->concat($gobernaciones);

        return response()->json($entidades);
    }
}
