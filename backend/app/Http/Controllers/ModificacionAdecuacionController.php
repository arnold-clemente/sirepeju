<?php

namespace App\Http\Controllers;

use App\Models\Adecuacion;
use App\Models\Administrativo;
use App\Models\Modificacion;
use App\Models\RegistroPersonaAdecuacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModificacionAdecuacionController extends Controller
{
    public function index()
    {
        $modificaciones = Adecuacion::with('registro_persona_adecuacion', 'fundadores')
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
            'domicilio_legal' => 'required',
            'miembros_fundador' => 'required',
            'seguimiento' => 'required',
            'cite_informe_preliminar' => 'required',
            'adecuacion_id' => 'required',
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
            'codigo_modificacion' => $request->codigo_modificacion,
            'personalidad_juridica' => 'En modificacion',
            'estatuto_organico' => 'En modificacion',
            'reglamento_interno' => 'En modificacion',
            'domicilio_legal' => 'En modificacion',
            'miembros_fundador' => 'modificacion:',
            'seguimiento' => 'En modificacion el ' . $request->fecha,
            'cite_informe_preliminar' => 'En modificacion el ' . $request->fecha,
            'tipo' => 'adecuacion',
            'adecuacion_id' => $request->adecuacion_id,
            'administrativo_id' => $administrativo->id,
        ]);

        $adecuacion = Adecuacion::find($request->adecuacion_id);
        $adecuacion->seguimiento = $adecuacion->seguimiento . 'En modificacion el ' . $request->fecha;
        $adecuacion->cite_informe_preliminar = $adecuacion->cite_informe_preliminar . 'En Modificacion el' . $request->fecha;
        $adecuacion->estado = 13;
        $adecuacion->save();

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
        $adecuacion_id = $request->adecuacion_id;

        if ($request->hasFile('estatuto_organico')) {
            if ($request->hasFile('reglamento_interno')) {
                $rules = array(
                    'estatuto_organico' => 'required|file|max:5000|mimes:pdf,docx,doc',
                    'reglamento_interno' => 'required|file|max:5000|mimes:pdf,docx,doc',
                    'personalidad_juridica' => 'required|string|max:255',
                    'domicilio_legal' => 'required|string|max:255',
                    'adecuacion_id' => 'required',
                );
            } else {
                $rules = array(
                    'estatuto_organico' => 'required|file|max:5000|mimes:pdf,docx,doc',
                    'personalidad_juridica' => 'required|string|max:255',
                    'domicilio_legal' => 'required|string|max:255',
                    'adecuacion_id' => 'required',
                );
            }
        } else {
            $rules = array(
                'personalidad_juridica' => 'required|string|max:255',
                'domicilio_legal' => 'required|string|max:255',
                'adecuacion_id' => 'required',
            );
        }

        $validator = Validator::make(
            array(
                'estatuto_organico' => $estatuto_organico,
                'reglamento_interno' => $reglamento_interno,
                'personalidad_juridica' => $personalidad_juridica,
                'domicilio_legal' => $domicilio_legal,
                'adecuacion_id' => $adecuacion_id,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $modificacion = Modificacion::where('adecuacion_id', $adecuacion_id)
            ->orderBy('id', 'desc')
            ->first();

        $adecuacion = Adecuacion::find($adecuacion_id);

        $personalidad = RegistroPersonaAdecuacion::where('adecuacion_id', $adecuacion_id)->first();

        if ($request->hasFile('estatuto_organico')) {
            $modificacion->estatuto_organico = $personalidad->estatuto_organico;
            $personalidad->estatuto_organico = $estatuto_organico->store('adecuacion_estatuto_organico', 'public');

        }else{
            $modificacion->estatuto_organico = 'No Modificado';
        }

        if ($request->hasFile('reglamento_interno')) {
            $modificacion->reglamento_interno = $personalidad->reglamento_interno;
            $personalidad->reglamento_interno = $estatuto_organico->store('adecuacion_reglamento_interno', 'public');

        }else{
            $modificacion->reglamento_interno = 'No Modificado';
        }

        if($personalidad_juridica == $adecuacion->personalidad_juridica){
            $modificacion->personalidad_juridica = 'No Modificado';
        }else{
            $modificacion->personalidad_juridica = $adecuacion->personalidad_juridica;
            $adecuacion->personalidad_juridica = $personalidad_juridica;
        }

        if($domicilio_legal == $adecuacion->domicilio_legal){
            $modificacion->domicilio_legal = 'No Modificado';
        }else{
            $modificacion->domicilio_legal =$adecuacion->domicilio_legal;
            $adecuacion->domicilio_legal = $domicilio_legal;
        }

        $modificacion->estado = 2;
        $modificacion->save();
        $adecuacion->estado = 10;
        $adecuacion->save();
        $personalidad->save();

        return response()->json([
            'status' => true,
            'data' => $personalidad,
        ]);
    }
}
