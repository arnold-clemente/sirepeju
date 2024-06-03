<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Referencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReferenciaController extends Controller
{
    public function index()
    {
        $referencia = Referencia::find(1);

        return response()->json($referencia);
    }

    public function update(Request $request)
    {
        $direccion = $request->direccion;
        $horario = $request->horario;
        $whatsapp = $request->whatsapp; 
        $correo = $request->correo;
        $telefono = $request->telefono;
        $fax = $request->fax;
        $validator = Validator::make(
            array(
                'direccion' => $direccion,
                'horario' => $horario,
                'whatsapp' => $whatsapp,
                'correo' => $correo,
                'telefono' => $telefono,
                'fax' => $fax,
            ),
            array(
                'direccion' => 'required|string|max:250',
                'horario' => 'required|string|max:250',
                'whatsapp' => 'required|string|max:250',
                'correo' => 'required|string|max:250',
                'telefono' => 'required|string|max:250',
                'fax' => 'required|string|max:250',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        
        $referencia = Referencia::find(1);
        $referencia->direccion = $request->direccion;
        $referencia->horario = $request->horario;
        $referencia->whatsapp = $request->whatsapp;
        $referencia->correo = $request->correo;
        $referencia->telefono = $request->telefono;
        $referencia->fax = $request->fax;

        $referencia->save();

        return response()->json([
            'registro' => $referencia,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }
}
