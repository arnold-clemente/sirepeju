<?php

namespace App\Http\Controllers\otorgacion;

use App\Http\Controllers\Controller;
use App\Models\Administrativo;
use App\Models\Otorgacion;
use App\Models\OtorgacionFundador;
use App\Models\OtorgacionPersonalidad;
use App\Models\ReservaOtorgacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OtorgacionController extends Controller
{
    public function index()
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
                'seguimiento',
                'alfanumerico',
                'cite_informe_preliminar',
                'miembros_fundador',
                'estado'
            )
            ->whereIn('estado', [1])
            ->get();

        return response()->json($otorgaciones);
    }

    public function show(Otorgacion $otorgacion)
    {
        $fundadores = OtorgacionFundador::where('otorgacion_id', $otorgacion->id)
            ->where('estado', 1)
            ->get();

        $personalidades = OtorgacionPersonalidad::where('otorgacion_id', $otorgacion->id)
            ->orderBy('id', 'desc')
            ->first();

        return response()->json([
            'otorgacion' => $otorgacion,
            'fundadores' => $fundadores,
            'personalidad' => $personalidades
        ]);
    }

    public function store(Request $request)
    {
        $date = Carbon::now();
        $user_auth = auth()->user();
        $fecha = $date->format('Y-m-d');
        $rules = [
            'id' => 'required',
            'codigo_otorgacion' => 'required|string|max:150|unique:otorgacions,codigo_otorgacion',
            'fecha' => 'required',
            'objeto' => 'required|string|max:65535',
            'domicilio' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $registro = ReservaOtorgacion::find($request->id);
        $administrativo = Administrativo::where('user_id', $request->user_id)->first();

        $otorgacion = Otorgacion::create([
            'reserva_otorgacion_id' => $request->id,
            'personalidad_juridica' => $registro->entidad,
            'sigla' => $registro->sigla,
            'representante' => $registro->representante,
            'ci_rep' => $registro->ci_rep,
            'ext_ci_rep' => $registro->ext_ci_rep,
            'naturaleza' => $registro->naturaleza,
            'persona_colectiva' => $registro->persona_colectiva,
            'fecha_ingreso_tramite' => $request->fecha,
            'codigo_otorgacion' => $request->codigo_otorgacion,
            'domicilio_legal' => $request->domicilio,
            'objeto' => $request->objeto,
            'miembros_fundador' => 'sin agregar',
            'cite_informe_preliminar' => 'En tramite',
            'seguimiento' => $fecha . ' - En espera',
            'administrativo_id' => $administrativo->id,
            'create' => $user_auth->id,
        ]);

        $registro->estado = 5;
        $registro->save();

        return response()->json([
            'status' => true,
            'data' => $otorgacion,
            'message' => 'Reserva de nombre actualizado satisfactoriamente'
        ]);
    }

    public function registro(Request $request)
    {
        $rules = [
            'otorgacion_id' => 'required',
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

        $registroFinal = Otorgacion::find($request->otorgacion_id);
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
