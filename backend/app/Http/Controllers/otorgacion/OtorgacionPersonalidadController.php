<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Otorgacion;
use App\Models\OtorgacionPersonalidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OtorgacionPersonalidadController extends Controller
{

    public function getpersonalidades()
    {
        $otorgaciones = DB::table('otorgacions')
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
                'codigo_otorgacion',
                'domicilio_legal',
                'objeto',
                'alfanumerico',
                'seguimiento',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado'
            )
            ->whereIn('estado', [4])
            ->get();

        return response()->json($otorgaciones);
    }

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
                'estatuto_organico' => 'required|file|max:6000|mimes:pdf,docx,doc',
                'reglamento_interno' => 'required|file|max:6000|mimes:pdf,docx,doc',
                'informe_final' => 'required|file|max:6000|mimes:pdf,docx,doc',
                'nota_final' => 'required|file|max:6000|mimes:pdf,docx,doc',
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
        $user_auth = auth()->user();

        $registro = OtorgacionPersonalidad::create([
            'otorgacion_id' => $otorgacion_id,
            'resolucion_ministerial' => $resolucion_ministerial,
            'fecha_resolucion' => $fecha_resolucion,
            'estatuto_organico' => $estatuto_organico->store('otorgacion_estatuto_organico', 'public'),
            'reglamento_interno' => $reglamento_interno->store('otorgacion_reglamento_interno', 'public'),
            'informe_final' => $informe_final->store('otorgacion_informe_final', 'public'),
            'nota_final' => $nota_final->store('otorgacion_nota_final', 'public'),
        ]);

        $otorgacion = Otorgacion::find($otorgacion_id);
        $otorgacion->estado = 4;
        $otorgacion->personalidad = $user_auth->id;
        $otorgacion->save();


        return response()->json([
            'status' => true,
            'data' => $registro
        ]);
    }
}
