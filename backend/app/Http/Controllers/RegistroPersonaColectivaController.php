<?php

namespace App\Http\Controllers;

use App\Models\Otorgacion;
use App\Models\RegistroPersonaColectiva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistroPersonaColectivaController extends Controller
{
    public function store(Request $request)
    {
        $estatuto_organico = $request->file('estatuto_organico');
        $reglamento_interno = $request->file('reglamento_interno');
        $informe_final = $request->file('informe_final');
        $nota_final = $request->file('nota_final');
        $resolucion_ministerial = $request->resolucion_ministerial;
        $fecha_resolucion = $request->fecha_resolucion;
        $otorgacion_id = $request->otorgacion_id;
        $validator = Validator::make(
            array(
                'estatuto_organico' => $estatuto_organico,
                'reglamento_interno' => $reglamento_interno,
                'informe_final' => $informe_final,
                'nota_final' => $nota_final,
                'otorgacion_id' => $otorgacion_id,
                'fecha_resolucion' => $fecha_resolucion,
                'resolucion_ministerial' => $resolucion_ministerial,
            ),
            array(
                'estatuto_organico' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'reglamento_interno' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'informe_final' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'nota_final' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'otorgacion_id' => 'required',
                'fecha_resolucion' => 'required',
                'resolucion_ministerial' => 'required|string|max:255',
            )
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $registro = RegistroPersonaColectiva::create([
            'otorgacion_id' => $otorgacion_id,
            'resolucion_ministerial' => $resolucion_ministerial,
            'fecha_resolucion' => $fecha_resolucion,
            'estatuto_organico' => $estatuto_organico->store('otorgacion_estatuto_organico', 'public'),
            'reglamento_interno' => $reglamento_interno->store('otorgacion_reglamento_interno', 'public'),
            'informe_final' => $informe_final->store('otorgacion_informe_final', 'public'),
            'nota_final' => $nota_final->store('otorgacion_nota_final', 'public'),
        ]);

        $otorgacion = Otorgacion::find($otorgacion_id);
        $otorgacion->estado = 10;
        $otorgacion->save();


        return response()->json([
            'status' => true,
            'data' => $registro
        ]);
    }
}
