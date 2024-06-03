<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Iconos;
use App\Models\Redes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RedesController extends Controller
{
    public function index()
    {
        $redes = Redes::where('estado', 1)->get();

        return response()->json($redes);
    }

    public function show(Redes $redes)
    {
        $icons = Iconos::all();

        return response()->json([
            'redes' => $redes,
            'icons' => $icons
        ]);
    }

    public function icons()
    {
        $icons = Iconos::all();

        return response()->json($icons);
    }

    public function store(Request $request)
    {
        $nombre = $request->nombre;
        $url = $request->url;
        $icon = $request->icon;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'url' => $url,
                'icon' => $icon,
            ),
            array(
                'nombre' => 'required|string|max:250',
                'url' => 'required|string|max:250',
                'icon' => 'required',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $red = Redes::create([
            'nombre' => $request->nombre,
            'url' => $request->url,
            'icon' => $request->icon,
        ]);

        return response()->json([
            'red' => $red,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        $nombre = $request->nombre;
        $url = $request->url;
        $icon = $request->icon;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'url' => $url,
                'icon' => $icon,
            ),
            array(
                'nombre' => 'required|string|max:250',
                'url' => 'required|string|max:250',
                'icon' => 'required',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        
        $red = Redes::find($request->red_id);
        $red->nombre = $request->nombre;
        $red->url = $request->url;
        $red->icon = $request->icon;

        $red->save();

        return response()->json([
            'registro' => $red,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Redes $redes)
    {

        $redes->estado = 0;
        $redes->save();

        return response()->json([
            'registro' => $redes,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
