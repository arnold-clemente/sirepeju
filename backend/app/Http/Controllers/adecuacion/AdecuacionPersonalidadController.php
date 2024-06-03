<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AdecuacionPersonalidadController extends Controller
{

    public function getpersonalidades()
    {
        $adecuaciones = DB::table('adecuacions')
            ->select(
                'id',
                'personalidad_juridica',
                'sigla',
                'representante',
                'ci_rep',
                'ext_ci_rep',
                'naturaleza',
                'persona_colectiva',
                'fecha_ingreso_tramite',
                'codigo_adecuacion',
                'domicilio_legal',
                'resolucion_ministerial',
                'fecha_resolucion',
                'objeto',
                'seguimiento',
                'alfanumerico',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado'
            )
            ->whereIn('estado', [4])
            ->get();

        return response()->json($adecuaciones);
    }

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

        $user_auth = auth()->user();

        $adecuacion = DB::table('adecuacions') //DEBE MOSTRARME TABLAS UNIDAS 
        ->where('id', '=', $adecuacion_id)
        ->update([
            'resolucion_ministerial' => $resolucion_ministerial,
            'fecha_resolucion' => $fecha_resolucion,
            'estatuto_organico' => $estatuto_organico->store('otorgacion_estatuto_organico', 'public'),
            'reglamento_interno' => $reglamento_interno->store('otorgacion_reglamento_interno', 'public'),
            'informe_final' => $informe_final->store('otorgacion_informe_final', 'public'),
            'nota_final' => $nota_final->store('otorgacion_nota_final', 'public'),
            'estado' => 4,
            'personalidad' => $user_auth->id,
        ]);

        $user_auth = auth()->user();

        return response()->json([
            'status' => true,
            'data' => $adecuacion
        ]);
    }
}
