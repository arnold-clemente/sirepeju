<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\RegistroPersonaAdecuacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdecuacionPersonaColectivaController extends Controller
{
    public function store(Request $request)
    {
        // return response($request->all());
        // if($request->hasFile('estatuto_organico')){
        //     return response('funciono');
        // }else{
        //     return response('no dio');
        // }

        $estatuto_organico = $request->file('estatuto_organico');
        $reglamento_interno = $request->file('reglamento_interno');
        $informe_final = $request->file('informe_final');
        $nota_final = $request->file('nota_final');
        $resolucion_ministerial = $request->resolucion_ministerial;
        $fecha_resolucion = $request->fecha_resolucion;
        $adecuacion_id = $request->adecuacion_id;
        $validator = Validator::make(
            array(
                'estatuto_organico' => $estatuto_organico,
                'reglamento_interno' => $reglamento_interno,
                'informe_final' => $informe_final,
                'nota_final' => $nota_final,
                'adecuacion_id' => $adecuacion_id,
                'fecha_resolucion' => $fecha_resolucion,
                'resolucion_ministerial' => $resolucion_ministerial,
            ),
            array(
                'estatuto_organico' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'reglamento_interno' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'informe_final' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'nota_final' => 'required|file|max:5000|mimes:pdf,docx,doc',
                'adecuacion_id' => 'required',
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

        $adecuacion = RegistroPersonaAdecuacion::create([
            'adecuacion_id' => $adecuacion_id,
            'resolucion_ministerial' => $resolucion_ministerial,
            'fecha_resolucion' => $fecha_resolucion,
            'estatuto_organico' => $estatuto_organico->store('adecuacion_estatuto_organico', 'public'),
            'reglamento_interno' => $reglamento_interno->store('adecuacion_reglamento_interno', 'public'),
            'informe_final' => $informe_final->store('adecuacion_informe_final', 'public'),
            'nota_final' => $nota_final->store('adecuacion_nota_final', 'public'),
        ]);

        $adecuacion = Adecuacion::find($adecuacion_id);
        $adecuacion->estado = 10;
        $adecuacion->save();


        return response()->json([
            'status' => true,
            'data' => $adecuacion
        ]);
    }
}
