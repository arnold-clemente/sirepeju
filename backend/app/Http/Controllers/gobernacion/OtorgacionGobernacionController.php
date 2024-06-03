<?php

namespace App\Http\Controllers\gobernacion;

use App\Http\Controllers\Controller;
use App\Models\Gobernacion;
use App\Models\GobernacionFundador;
use App\Models\UserGobernacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OtorgacionGobernacionController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->rol == 'superadmin') {
            $otorgaciones = Gobernacion::selectRaw('gobernacions.*, user_gobernacions.nombres as nombres, 
            user_gobernacions.paterno as paterno, user_gobernacions.materno as materno, institucions.departamento as departamento, institucions.nombre as institucion')
                ->join('user_gobernacions', 'user_gobernacions.id', '=', 'gobernacions.user_gobernacion_id')
                ->join('institucions', 'user_gobernacions.institucion_id', '=', 'institucions.id')
                ->where('gobernacions.estado', 1)
                ->get();
        } else {
            if ($user->rol == 'gobernacion') {
                $otorgaciones = Gobernacion::selectRaw('gobernacions.*, user_gobernacions.nombres as nombres, 
                    user_gobernacions.paterno as paterno, user_gobernacions.materno as materno, institucions.departamento as departamento, institucions.nombre as institucion')
                    ->join('user_gobernacions', 'user_gobernacions.id', '=', 'gobernacions.user_gobernacion_id')
                    ->join('institucions', 'user_gobernacions.institucion_id', '=', 'institucions.id')
                    ->where('user_gobernacions.user_id', $user->id)
                    ->where('gobernacions.estado', 1)
                    ->get();
            } else {
                $otorgaciones = Gobernacion::selectRaw('gobernacions.*, user_gobernacions.nombres as nombres, 
                    user_gobernacions.paterno as paterno, user_gobernacions.materno as materno, institucions.departamento as departamento, institucions.nombre as institucion')
                    ->join('user_gobernacions', 'user_gobernacions.id', '=', 'gobernacions.user_gobernacion_id')
                    ->join('institucions', 'user_gobernacions.institucion_id', '=', 'institucions.id')
                    ->where('gobernacions.estado', 1)
                    ->get();
            }
        }

        return response()->json($otorgaciones);
    }

    public function show(Gobernacion $gobernacion)
    {
        $fundadores = GobernacionFundador::where('estado', 1)
            ->where('gobernacion_id', $gobernacion->id)
            ->get();

        return response()->json([
            'otorgacion' =>  $gobernacion,
            'fundadores' => $fundadores,
        ]);
    }

    public function store(Request $request)
    {
        $fundadores = $request->arrayFundadores;
        $nombre = '';
        $user_auth = auth()->user();

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

        $gobernacion = UserGobernacion::where('user_id', $request->user_id)->first();

        $otorgacion = Gobernacion::create([
            'nombre_persona_colectiva' => $request->nombre_persona_colectiva,
            'resolucion' => $request->resolucion,
            'fecha_resolucion' => $request->fecha_resolucion,
            'sigla' => $request->sigla,
            'miembros_fundador' => $nombre,
            'objeto' => $request->objeto,
            'naturaleza' => $request->naturaleza,
            'domicilio_legal' => $request->domicilio_legal,
            'user_gobernacion_id' => $gobernacion->id,
            'institucion_id' => $gobernacion->institucion_id,
            'create' => $user_auth->id,
        ]);

        foreach ($fundadores as $fundador) {
            GobernacionFundador::create([
                'nombre_completo' => $fundador['nombre'],
                'ci' => $fundador['ci'],
                'gobernacion_id' => $otorgacion->id,
                'create' => $user_auth->id,
            ]);
        }

        return response([
            'otorgacion' => $otorgacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function update(Gobernacion $gobernacion, Request $request)
    {
        $user_auth = auth()->user();
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

        $gobernacion->nombre_persona_colectiva = $request->nombre_persona_colectiva;
        $gobernacion->resolucion = $request->resolucion;
        $gobernacion->fecha_resolucion = $request->fecha_resolucion;
        $gobernacion->sigla = $request->sigla;
        $gobernacion->naturaleza = $request->naturaleza;
        $gobernacion->domicilio_legal = $request->domicilio_legal;
        $gobernacion->objeto = $request->objeto;
        $gobernacion->update = $user_auth->id;
        $gobernacion->save();

        return response([
            'otorgacion' => $gobernacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function destroy(Gobernacion $gobernacion)
    {
        $user_auth = auth()->user();
        $gobernacion->estado = 0;
        $gobernacion->delete = $user_auth->id;
        $gobernacion->save();

        return response([
            'otorgacion' => $gobernacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }
}
