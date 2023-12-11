<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\Modificacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdecuacionInformeController extends Controller
{
    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'informe' => 'required|string|max:100',
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
        $mensaje = $request->informe . " en " . $request->fecha;

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->cite_informe_preliminar = $adecuacion->cite_informe_preliminar . ", " . $mensaje;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }

    public function modificacion_informe(Request $request)
    {
        $rules = [
            'informe' => 'required|string|max:100',
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
        $mensaje = $request->informe . " en " . $request->fecha;

        $modificacion = Modificacion::where('adecuacion_id', $request->adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->cite_informe_preliminar = $modificacion->cite_informe_preliminar . ", " . $mensaje;
        $modificacion->save();
       

        return response()->json([
            'status' => true,
            'data' => $modificacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
