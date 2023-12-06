<?php

namespace App\Http\Controllers;

use App\Models\Otorgacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PersonaliadJuridicaController extends Controller
{
    public function index()
    {
        $personalidades = DB::table('otorgacions')
        ->join('registro_persona_colectivas', 'otorgacions.id', '=', 'registro_persona_colectivas.otorgacion_id')
        ->whereIn('otorgacions.estado', [10, 0])
        ->get();

        return response()->json($personalidades);

    }
}
