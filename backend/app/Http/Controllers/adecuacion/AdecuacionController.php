<?php

namespace App\Http\Controllers\adecuacion;

use App\Http\Controllers\Controller;
use App\Models\Adecuacion;
use App\Models\AdecuacionFundador;
use App\Models\AdecuacionPersonalidad;
use App\Models\Administrativo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AdecuacionController extends Controller
{
    public function index()
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
                'objeto',
                'seguimiento',
                'alfanumerico',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado'
            )
            ->whereIn('estado', [1])
            ->get();

        return response()->json($adecuaciones);
    }


    public function show(Adecuacion $adecuacion)
    {
        $fundadores = AdecuacionFundador::where('adecuacion_id', $adecuacion->id)
            ->where('estado', 1)
            ->get();

        $personalidades = AdecuacionPersonalidad::where('adecuacion_id', $adecuacion->id)
            ->orderBy('id', 'desc')
            ->first();

        return response()->json([
            'adecuacion' => $adecuacion,
            'fundadores' => $fundadores,
            'personalidad' => $personalidades
        ]);
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
            'codigo_adecuacion' => 'required|string|max:150|unique:adecuacions,codigo_adecuacion',
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
            'miembros_fundador' => 'sin asignar',
            'cite_informe_preliminar' => 'En tramite',
            'seguimiento' => $fecha . ' - En espera',
            'administrativo_id' => $administrativo->id,
            'create' => $request->user_id,
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
}
