<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\Modificacion;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class AdecuacionSeguimientoController extends Controller
{
    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'seguimiento' => 'required|string|max:100',
            'fecha' => 'required',
            'adecuacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $mensaje = $request->seguimiento . " en " . $request->fecha;

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->seguimiento = $adecuacion->seguimiento . ", " . $mensaje;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }


    public function modificacion_seguimiento(Request $request)
    {
        $rules = [
            'seguimiento' => 'required|string|max:100',
            'fecha' => 'required',
            'adecuacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $mensaje = $request->seguimiento . " en " . $request->fecha;

        $modificacion = Modificacion::where('adecuacion_id', $request->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->seguimiento = $modificacion->seguimiento . ", " . $mensaje;
        $modificacion->save();

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->seguimiento = $adecuacion->seguimiento . ", " . $mensaje;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }

}
