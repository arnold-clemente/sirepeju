<?php

namespace App\Http\Controllers\Pagina;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NormativaController extends Controller
{
    public function index() 
    {
        $normativas = DB::table('normativas')
        ->whereIn('estado', [1])
        ->get();

        return response()->json($normativas);
    }
}
