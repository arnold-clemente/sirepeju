<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\Otorgacion;
use App\Models\Registro;
use App\Models\RegistroPersonaColectiva;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OtorgacionController extends Controller
{
    public function index()
    {
        $otorgaciones = Otorgacion::with('fundadores')
            ->whereIn('estado', [7, 8, 9])
            ->get();

        return response()->json($otorgaciones);
    }

    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'id' => 'required',
            'codigo' => 'required|string|max:150',
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

        $registro = Registro::find($request->id);
        $administrativo = Administrativo::where('user_id', $request->user_id)->first();

        $otorgacion = Otorgacion::create([
            'registro_id' => $request->id,
            'personalidad_juridica' => $registro->entidad,
            'sigla' => $registro->sigla,
            'representante' => $registro->representante,
            'ci_rep' => $registro->ci_rep,
            'ext_ci_rep' => $registro->ext_ci_rep,
            'naturaleza' => $registro->naturaleza,
            'persona_colectiva' => $registro->persona_colectiva,
            'fecha_ingreso_tramite' => $request->fecha,
            'codigo_otorgacion' => $request->codigo,
            'domicilio_legal' => $request->domicilio,
            'objeto' => $request->objeto,
            'cite_informe_preliminar' => 'En tramite',
            'seguimiento' => $fecha . ' - En espera',
            'administrativo_id' => $administrativo->id,
        ]);

        $registro->estado = 6;
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

   

    public function destroy(Otorgacion $otorgacion)
    {
        //
    }

    public function personalidades()
    {
        $personalidades = Otorgacion::with('fundadores', 'registro_persona_colectiva')
            ->where('estado', 10)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($personalidades);
    }

    public function getrevocatorias()
    {
        $revocatorias = Otorgacion::with('fundadores', 'registro_persona_colectiva')
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
            'otorgacion_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        // $otorgacion = $request->all();

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->nota_revocatorio = $request->nota_revocatorio;
        $otorgacion->observacion = $request->observacion;
        $otorgacion->fecha_revocatoria = $request->fecha_revocatoria;
        $otorgacion->estado = 0;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'data' => $otorgacion,
            'message' => 'Guardado con exito'
        ]);
    }
}
