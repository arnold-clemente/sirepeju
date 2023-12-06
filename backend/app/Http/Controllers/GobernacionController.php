<?php

namespace App\Http\Controllers;

use App\Models\Gobernacion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class GobernacionController extends Controller
{
    public function index()
    {
        $gobernacions = Gobernacion::with('user', 'departamento')->whereIn('estado', [1])->get();
        return response()->json($gobernacions);
    }

    public function store(Request $request)
    {
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'ci' => 'required|string|max:12|unique:gobernacions,ci',
            'ext_ci' => 'required',
            'email' => 'required|email|unique:users,email',
            'departamento_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $user = User::create([
            'name' => $request->nombres . " " . $request->paterno . " " . $request->materno,
            'email' => $request->email,
            'rol' => 'gobernacion',
            'password' => Hash::make($request->password),
        ]);

        $gobernacion = Gobernacion::create([
            'nombres' => $request->nombres,
            'paterno' => $request->paterno,
            'materno' => $request->materno,
            'cargo' => $request->cargo,
            'ci' =>  $request->ci,
            'ext_ci' => $request->ext_ci,
            'departamento_id' => $request->departamento_id,
            'user_id' => $user->id
        ]);

        return response([
            'user' => $user,
            'gobernacion' => $gobernacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function show(Gobernacion $gobernacion)
    {
        $user_gobernacion = Gobernacion::selectRaw('gobernacions.id as id, gobernacions.nombres as nombres, gobernacions.paterno as paterno,
        gobernacions.materno as materno, users.email as email, gobernacions.cargo as cargo, gobernacions.ci as ci, gobernacions.ext_ci as ext_ci,
        gobernacions.departamento_id as departamento_id, gobernacions.user_id as user_id')
            ->join('users', 'gobernacions.user_id', '=', 'users.id')
            ->where('gobernacions.id', $gobernacion->id)
            ->first();

        return response()->json($user_gobernacion);
    }

    public function update(Gobernacion $gobernacion, Request $request)
    {
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'ci' => 'required|string|max:12|unique:gobernacions,ci,' . $gobernacion->id,
            'ext_ci' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->user_id,
            'departamento_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $gobernacion->nombres = $request->nombres;
        $gobernacion->paterno = $request->paterno;
        $gobernacion->materno = $request->materno;
        $gobernacion->cargo = $request->cargo;
        $gobernacion->ci = $request->ci;
        $gobernacion->ext_ci = $request->ext_ci;
        $gobernacion->departamento_id = $request->departamento_id;
        $gobernacion->save();

        $user = User::find($request->user_id);
        $user->email = $request->email;
        $user->name = $request->nombres . " " . $request->paterno . " " . $request->materno;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Actualizado satisfactoriamente',
            'gobernacion' => $gobernacion,
        ]);
    }

    public function destroy(Gobernacion $gobernacion)
    {
        $caracteres_permitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&/()?-+{}[]_${}*';
        $longitud = 20;
        $random = substr(str_shuffle($caracteres_permitidos), 0, $longitud);
        $usuario = $gobernacion->user_id . $random;


        // cambiar el usuario 
        $user = User::find($gobernacion->user_id);
        $user->password =  Hash::make($usuario);
        $user->save();

        $gobernacion->estado = 0;
        $gobernacion->save();

        return response([
            'message' => 'Administrativo Eliminado'
        ]);
    }

    public function password(Request $request)
    {
        $user = User::find($request->user_id);
        $user->password =  Hash::make($request->ci);
        $user->save();

        return response([
            'message' => 'Contraseña Actualizado'
        ]);
    }
}
