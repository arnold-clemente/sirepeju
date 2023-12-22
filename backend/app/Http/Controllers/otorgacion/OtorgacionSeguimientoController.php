<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Modificacion;
use App\Models\Otorgacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OtorgacionSeguimientoController extends Controller
{
    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'seguimiento' => 'required|string|max:100',
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
        $mensaje = $request->seguimiento . " en " . $request->fecha;

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->seguimiento = $otorgacion->seguimiento . ", " . $mensaje;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'data' => $otorgacion,
            'message' => 'Guardado con exito'
        ]);
    }

    public function modificacion_seguimiento(Request $request)
    {
        $rules = [
            'seguimiento' => 'required|string|max:100',
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
        $mensaje = $request->seguimiento . " en " . $request->fecha;

        $modificacion = Modificacion::where('otorgacion_id', $request->otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();
        $modificacion->seguimiento = $modificacion->seguimiento . ", " . $mensaje;
        $modificacion->save();

        return response()->json([
            'status' => true,
            'message' => 'Guardado con exito'
        ]);
    }
}
