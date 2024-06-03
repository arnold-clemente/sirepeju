<?php

namespace App\Http\Controllers\Pagina;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    public function index()
    {
        $referencias = DB::table('referencias')
            ->first();

        $redes = DB::table('redes')
            ->whereIn('estado', [1])
            ->get();

        return response()->json([
            'status' => true,
            'referencias' => $referencias,
            'redes' => $redes
        ]);
    }
}
