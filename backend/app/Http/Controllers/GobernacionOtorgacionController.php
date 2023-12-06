<?php

namespace App\Http\Controllers;

use App\Models\FundadoresGobernacion;
use App\Models\Gobernacion;
use App\Models\OtorgacionGobernacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GobernacionOtorgacionController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->rol == 'superadmin') {
            $otorgaciones = Gobernacion::selectRaw('otorgacion_gobernacions.*, gobernacions.nombres as nombres, 
            gobernacions.paterno as paterno, gobernacions.materno as materno, departamentos.nombre as departamento, departamentos.institucion as institucion')
                ->join('otorgacion_gobernacions', 'gobernacions.id', '=', 'otorgacion_gobernacions.gobernacion_id')
                ->join('departamentos', 'gobernacions.departamento_id', '=', 'departamentos.id')
                ->where('otorgacion_gobernacions.estado', 11)
                ->get();
        } else {
            if ($user->rol == 'gobernacion') {
                $otorgaciones = Gobernacion::selectRaw('otorgacion_gobernacions.*, gobernacions.nombres as nombres, 
                    gobernacions.paterno as paterno, gobernacions.materno as materno, departamentos.nombre as departamento, departamentos.institucion as institucion')
                    ->join('otorgacion_gobernacions', 'gobernacions.id', '=', 'otorgacion_gobernacions.gobernacion_id')
                    ->join('departamentos', 'gobernacions.departamento_id', '=', 'departamentos.id')
                    ->where('gobernacions.user_id', $user->id)
                    ->where('otorgacion_gobernacions.estado', 11)
                    ->get();
            } else {
                $otorgaciones = Gobernacion::selectRaw('otorgacion_gobernacions.*, gobernacions.nombres as nombres, 
                    gobernacions.paterno as paterno, gobernacions.materno as materno, departamentos.nombre as departamento, departamentos.institucion as institucion')
                    ->join('otorgacion_gobernacions', 'gobernacions.id', '=', 'otorgacion_gobernacions.gobernacion_id')
                    ->join('departamentos', 'gobernacions.departamento_id', '=', 'departamentos.id')
                    ->where('otorgacion_gobernacions.estado', 11)
                    ->get();
            }
        }

        return response()->json($otorgaciones);
    }

    public function show(OtorgacionGobernacion $otorgacion_gobernacion)
    {
        $fundadores = FundadoresGobernacion::where('estado', 1)
            ->where('otorgacion_gobernacion_id', $otorgacion_gobernacion->id)
            ->get();

        return response()->json([
            'otorgacion' =>  $otorgacion_gobernacion,
            'fundadores' => $fundadores,
        ]);
    }

    public function store(Request $request)
    {
        $fundadores = $request->arrayFundadores;
        $nombre = '';

        $rules = [
            'nombre_persona_colectiva' => 'required|string|max:200',
            'resolucion' => 'required|string|max:150',
            'fecha_resolucion' => 'required',
            'sigla' => 'required|string|max:100',
            'naturaleza' => 'required',
            'domicilio_legal' => 'required|string|max:250',
            'objeto' => 'required|string|max:65535',
            'user_id' => 'required',
            'arrayFundadores' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        foreach ($fundadores as $fundador) {
            $nombre = $fundador['nombre'] . ', ' . $nombre;
        }

        $gobernacion = Gobernacion::where('user_id', $request->user_id)->first();

        $otorgacion = OtorgacionGobernacion::create([
            'nombre_persona_colectiva' => $request->nombre_persona_colectiva,
            'resolucion' => $request->resolucion,
            'fecha_resolucion' => $request->fecha_resolucion,
            'sigla' => $request->sigla,
            'miembros_fundador' => $nombre,
            'objeto' => $request->objeto,
            'naturaleza' => $request->naturaleza,
            'domicilio_legal' => $request->domicilio_legal,
            'gobernacion_id' => $gobernacion->id,
            'departamento_id' => $gobernacion->departamento_id,
        ]);

        foreach ($fundadores as $fundador) {
            FundadoresGobernacion::create([
                'nombre_completo' => $fundador['nombre'],
                'ci' => $fundador['ci'],
                'otorgacion_gobernacion_id' => $otorgacion->id,
            ]);
        }

        return response([
            'otorgacion' => $otorgacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(OtorgacionGobernacion $otorgacion_gobernacion, Request $request)
    {
        $rules = [
            'nombre_persona_colectiva' => 'required|string|max:200',
            'resolucion' => 'required|string|max:150',
            'fecha_resolucion' => 'required',
            'sigla' => 'required|string|max:100',
            'naturaleza' => 'required',
            'domicilio_legal' => 'required|string|max:250',
            'objeto' => 'required|string|max:65535',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $otorgacion_gobernacion->nombre_persona_colectiva = $request->nombre_persona_colectiva;
        $otorgacion_gobernacion->resolucion = $request->resolucion;
        $otorgacion_gobernacion->fecha_resolucion = $request->fecha_resolucion;
        $otorgacion_gobernacion->sigla = $request->sigla;
        $otorgacion_gobernacion->naturaleza = $request->naturaleza;
        $otorgacion_gobernacion->domicilio_legal = $request->domicilio_legal;
        $otorgacion_gobernacion->objeto = $request->objeto;
        $otorgacion_gobernacion->save();

        return response([
            'otorgacion' => $otorgacion_gobernacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function destroy(OtorgacionGobernacion $otorgacion_gobernacion)
    {
        $otorgacion_gobernacion->estado = 12;
        $otorgacion_gobernacion->save();

        return response([
            'otorgacion' => $otorgacion_gobernacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }
}
