<?php

namespace App\Http\Controllers\Pagina;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public function index()
    {
        $sliders = DB::table('sliders')
        ->whereIn('estado', [1])
        ->get();

        $videos = DB::table('videos')
        ->whereIn('estado', [1])
        ->get();

        $enlaces = DB::table('enlaces')
        ->whereIn('estado', [1])
        ->get();

        $noticias = DB::table('noticias')
        ->whereIn('estado', [1])
        ->get();

        return response()->json([
            'status' => true,
            'sliders' => $sliders,
            'videos' => $videos,
            'enlaces' => $enlaces,
            'noticias' => $noticias,
        ]);
    }
}
