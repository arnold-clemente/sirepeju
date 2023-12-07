<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\Modificacion;
use App\Models\Otorgacion;
use App\Models\RegistroPersonaColectiva;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModificacionOtorgacionController extends Controller
{
    public function index()
    {
        $modificaciones = Otorgacion::with('fundadores', 'registro_persona_colectiva')
            ->where('estado', 13)
            ->get();

        return response()->json($modificaciones);
    }

    public function store(Request $request)
    {
        $date = Carbon::now();
        $fecha = $date->format('Y-m-d');

        $rules = [
            'fecha' => 'required',
            'codigo_modificacion' => 'required|string|max:150|unique:modificacions,codigo_modificacion',
            'personalidad_juridica' => 'required',
            'estatuto_organico' => 'required',
            'reglamento_interno' => 'required',
            'domicilio_legal' => 'required',
            'miembros_fundador' => 'required',
            'seguimiento' => 'required',
            'cite_informe_preliminar' => 'required',
            'otorgacion_id' => 'required',
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


        $modificacion = Modificacion::create([
            'fecha' => $request->fecha,
            'codigo_modificacion' => 'APN - ' . $request->codigo_modificacion,
            'personalidad_juridica' => 'En modificacion',
            'estatuto_organico' => 'En modificacion',
            'reglamento_interno' => 'En modificacion',
            'domicilio_legal' => 'En modificacion',
            'miembros_fundador' => 'modificacion:',
            'seguimiento' => 'En modificacion el ' . $request->fecha,
            'cite_informe_preliminar' => 'En modificacion el ' . $request->fecha,
            'tipo' => 'otorgacion',
            'otorgacion_id' => $request->otorgacion_id,
            'administrativo_id' => $administrativo->id,
        ]);

        $otorgacion = Otorgacion::find($request->otorgacion_id);
        $otorgacion->seguimiento = $otorgacion->seguimiento . 'En modificacion el ' . $request->fecha;
        $otorgacion->cite_informe_preliminar = $otorgacion->cite_informe_preliminar . 'En Modificacion el' . $request->fecha;
        $otorgacion->estado = 13;
        $otorgacion->save();

        return response()->json([
            'status' => true,
            'data' => $modificacion
        ]);
    }

    public function update(Request $request)
    {
        $estatuto_organico = $request->file('estatuto_organico');
        $reglamento_interno = $request->file('reglamento_interno');
        $personalidad_juridica = $request->personalidad_juridica;
        $domicilio_legal = $request->domicilio_legal;
        $otorgacion_id = $request->otorgacion_id;

        if ($request->hasFile('estatuto_organico')) {
            if ($request->hasFile('reglamento_interno')) {
                $rules = array(
                    'estatuto_organico' => 'required|file|max:5000|mimes:pdf,docx,doc',
                    'reglamento_interno' => 'required|file|max:5000|mimes:pdf,docx,doc',
                    'personalidad_juridica' => 'required|string|max:255',
                    'domicilio_legal' => 'required|string|max:255',
                    'otorgacion_id' => 'required',
                );
            } else {
                $rules = array(
                    'estatuto_organico' => 'required|file|max:5000|mimes:pdf,docx,doc',
                    'personalidad_juridica' => 'required|string|max:255',
                    'domicilio_legal' => 'required|string|max:255',
                    'otorgacion_id' => 'required',
                );
            }
        } else {
            $rules = array(
                'personalidad_juridica' => 'required|string|max:255',
                'domicilio_legal' => 'required|string|max:255',
                'otorgacion_id' => 'required',
            );
        }

        $validator = Validator::make(
            array(
                'estatuto_organico' => $estatuto_organico,
                'reglamento_interno' => $reglamento_interno,
                'personalidad_juridica' => $personalidad_juridica,
                'domicilio_legal' => $domicilio_legal,
                'otorgacion_id' => $otorgacion_id,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $modificacion = Modificacion::where('otorgacion_id', $otorgacion_id)
            ->orderBy('id', 'desc')
            ->first();

        $otorgacion = Otorgacion::find($otorgacion_id);

        $personalidad = RegistroPersonaColectiva::where('otorgacion_id', $otorgacion_id)->first();

        if ($request->hasFile('estatuto_organico')) {
            $modificacion->estatuto_organico = $personalidad->estatuto_organico;
            $personalidad->estatuto_organico = $estatuto_organico->store('otorgacion_estatuto_organico', 'public');

        }else{
            $modificacion->estatuto_organico = 'No Modificado';
        }

        if ($request->hasFile('reglamento_interno')) {
            $modificacion->reglamento_interno = $personalidad->reglamento_interno;
            $personalidad->reglamento_interno = $estatuto_organico->store('otorgacion_reglamento_interno', 'public');

        }else{
            $modificacion->reglamento_interno = 'No Modificado';
        }

        if($personalidad_juridica == $otorgacion->personalidad_juridica){
            $modificacion->personalidad_juridica = 'No Modificado';
        }else{
            $modificacion->personalidad_juridica = $otorgacion->personalidad_juridica;
            $otorgacion->personalidad_juridica = $personalidad_juridica;
        }

        if($domicilio_legal == $otorgacion->domicilio_legal){
            $modificacion->domicilio_legal = 'No Modificado';
        }else{
            $modificacion->domicilio_legal =$otorgacion->domicilio_legal;
            $otorgacion->domicilio_legal = $domicilio_legal;
        }

        $modificacion->estado = 2;
        $modificacion->save();
        $otorgacion->estado = 10;
        $otorgacion->save();
        $personalidad->save();

        return response()->json([
            'status' => true,
            'data' => $personalidad,
        ]);
    }
}