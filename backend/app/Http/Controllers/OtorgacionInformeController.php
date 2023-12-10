<?php

namespace App\Http\Controllers;

use App\Models\Modificacion;
use App\Models\Otorgacion;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class OtorgacionInformeController extends Controller
{
    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'informe' => 'required|string|max:100',
            'fecha' => 'required',
            'otorgacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $mensaje = $request->informe . " en " . $request->fecha;

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->cite_informe_preliminar = $otorgacion->cite_informe_preliminar . ", " . $mensaje;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'data' => $otorgacion,
            'message' => 'Guardado con exito'
        ]);
    }

    public function modificacion_informe(Request $request)
    {
        $rules = [
            'informe' => 'required|string|max:100',
            'fecha' => 'required',
            'otorgacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $mensaje = $request->informe . " en " . $request->fecha;

        $modificacion = Modificacion::where('otorgacion_id', $request->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->cite_informe_preliminar = $modificacion->cite_informe_preliminar . ", " . $mensaje;
        $modificacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Guardado con exito'
        ]);
    }
}
