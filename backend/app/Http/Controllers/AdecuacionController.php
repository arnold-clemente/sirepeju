<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\Administrativo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdecuacionController extends Controller
{
    public function index()
    {
        $adecuaciones = Adecuacion::with('fundadores')
            ->whereIn('estado', [7, 8, 9])
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($adecuaciones);
    }

    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'personalidad_juridica' => 'required|string|max:255',
            'sigla' => 'required|string|max:100',
            'representante' => 'required|string|max:200',
            'ci_rep' => 'required|string|max:12',
            'ext_ci_rep' => 'required|string|max:3',
            'naturaleza' => 'required',
            'persona_colectiva' => 'required',
            'fecha_ingreso_tramite' => 'required',
            'codigo_adecuacion' => 'required|string|max:150',
            'domicilio_legal' => 'required|string|max:255',
            'objeto' => 'required|string|max:65535',
            'user_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        $administrativo = Administrativo::where('user_id', $request->user_id)->first();

        $adecuacion = Adecuacion::create([
            'personalidad_juridica' => $request->personalidad_juridica,
            'sigla' => $request->sigla,
            'representante' => $request->representante,
            'ci_rep' => $request->ci_rep,
            'ext_ci_rep' => $request->ext_ci_rep,
            'naturaleza' => $request->naturaleza,
            'persona_colectiva' => $request->persona_colectiva,
            'fecha_ingreso_tramite' => $request->fecha_ingreso_tramite,
            'codigo_adecuacion' => $request->codigo_adecuacion,
            'domicilio_legal' => $request->domicilio_legal,
            'objeto' => $request->objeto,
            'cite_informe_preliminar' => 'En tramite',
            'seguimiento' => $fecha . ' - En espera',
            'administrativo_id' => $administrativo->id,
        ]);

        // $adecuacion = $request->all();       

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }

    public function registro(Request $request)
    {
        $rules = [
            'adecuacion_id' => 'required',
            'nota_interna_final' => 'required|string|max:20',
            'numero_informe_final' => 'required|string|max:20',
            'fecha_envio' => 'required',
            'alfanumerico' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $registroFinal = $request->all();

        $registroFinal = Adecuacion::find($request->adecuacion_id);
        $registroFinal->fecha_envio = $request->fecha_envio;
        $registroFinal->numero_informe_final = $request->numero_informe_final;
        $registroFinal->nota_interna_final = $request->nota_interna_final;
        $registroFinal->alfanumerico = $request->alfanumerico;
        $registroFinal->save();

        return response()->json([
            'status' => true,
            'data' => $registroFinal
        ]);
    }

    public function personalidades()
    {
        $personalidades = Adecuacion::with('fundadores', 'registro_persona_adecuacion')
            ->where('estado', 10)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($personalidades);
    }

    public function getrevocatorias()
    {
        $revocatorias = Adecuacion::with('fundadores', 'registro_persona_adecuacion')
            ->where('estado', 0)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($revocatorias);
    }

    public function revocatoria(Request $request)
    {
        $rules = [
            'nota_revocatorio' => 'required|string|max:100',
            'observacion' => 'required|string|max:255',
            'fecha_revocatoria' => 'required',
            'adecuacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        // $adecuacion = $request->all();

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->nota_revocatorio = $request->nota_revocatorio;
        $adecuacion->observacion = $request->observacion;
        $adecuacion->fecha_revocatoria = $request->fecha_revocatoria;
        $adecuacion->estado = 0;
        $adecuacion->save();

        return response()->json([
            'status' => true,
            'data' => $adecuacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
