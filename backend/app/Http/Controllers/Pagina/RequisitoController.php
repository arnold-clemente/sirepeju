<?php

namespace App\Http\Controllers\pagina;

use App\Http\Controllers\Controller;
use App\Models\Requisito;
use App\Models\Tramite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RequisitoController extends Controller
{
    public function index()
    {
        $requisitos = DB::table('requisitos')
            ->whereIn('estado', [1])
            ->get();

        return response()->json($requisitos);
    }

    public function show_requisito(Requisito $requisito)
    {
        // $tramites = DB::table('tramites')
        // ->with('reglamentos')                
        // ->where('requisito_id',  $requisito->id)
        // ->get();

        $tramites = Tramite::with(['reglamentos' => function ($query) {
            $query->where('estado', 1);
        }])
            ->where('requisito_id',  $requisito->id)
            ->where('estado', 1)
            ->get();

        return response()->json([
            'tramites' => $tramites,
        ]);
    }
}
