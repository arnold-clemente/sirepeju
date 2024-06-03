<?php

namespace App\Http\Controllers\Panel;

use App\Http\Controllers\Controller;
use App\Models\Reglamento;
use App\Models\Tramite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ReglamentoController extends Controller
{
    public function index(Tramite $tramite)
    {
        $reglamentos = Reglamento::where('tramite_id', $tramite->id)
            ->where('estado', 1)
            ->get();

        return response()->json([
            'tramite' => $tramite,
            'reglamentos' => $reglamentos
        ]);
    }

    public function show(Reglamento $reglamento)
    {
        return response()->json($reglamento);
    }

    public function store(Request $request)
    {
        $nombre = $request->nombre;
        $archivo = $request->archivo;
        $descripcion = $request->descripcion;
        $tramite_id = $request->tramite_id;
        $fecha = $request->fecha;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'archivo' => $archivo,
                'descripcion' => $descripcion,
                'tramite_id' => $tramite_id,
                'fecha' => $fecha,
            ),
            array(
                'nombre' => 'required|string|max:200',
                'descripcion' => 'required|string|max:250',
                'tramite_id' => 'required',
                'fecha' => 'required',
                'archivo' => 'required|file|max:5000|mimes:pdf,docx,doc',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $reglamento = Reglamento::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'fecha' => $request->fecha,
            'archivo' => $request->archivo->store('requisitos', 'public'),
            'tramite_id' => $request->tramite_id,
        ]);

        return response()->json([
            'reglamento' => $reglamento,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Request $request)
    {
        if ($request->hasFile('archivo')) {
            $rules = array(
                'nombre' => 'required|string|max:200',
                'descripcion' => 'required|string|max:250',
                'fecha' => 'required',
                'archivo' => 'required|file|max:5000|mimes:pdf,docx,doc',
            );
        } else {
            $rules = array(
                'nombre' => 'required|string|max:200',
                'fecha' => 'required',
                'descripcion' => 'required|string|max:250',
            );
        }

        $archivo = $request->file('archivo');
        $nombre = $request->nombre;
        $fecha = $request->fecha;
        $descripcion = $request->descripcion;
        $validator = Validator::make(
            array(
                'nombre' => $nombre,
                'archivo' => $archivo,
                'descripcion' => $descripcion,
                'fecha' => $fecha,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $reglamento = Reglamento::find($request->reglamento_id);
        if ($request->hasFile('archivo')) {
            Storage::disk('public')->delete($reglamento->archivo);
            $reglamento->archivo = $request->archivo->store('requisitos', 'public');
        }

        $reglamento->nombre = $request->nombre;
        $reglamento->descripcion = $request->descripcion;
        $reglamento->fecha = $request->fecha;

        $reglamento->save();

        return response()->json([
            'registro' => $reglamento,
            'status' => true,
            'message' => 'Registro actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Reglamento $reglamento)
    {
        $reglamento->estado = 0;
        $reglamento->save();

        return response()->json([
            'registro' => $reglamento,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
