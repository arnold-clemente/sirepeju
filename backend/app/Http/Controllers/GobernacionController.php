<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\UserGobernacion;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class GobernacionController extends Controller
{
    public function index()
    {
        $user_gobernacions = DB::table('user_gobernacions')
            ->join('users', 'users.id', '=', 'user_gobernacions.user_id')
            ->join('institucions', 'institucions.id', '=', 'user_gobernacions.institucion_id')
            ->selectRaw('
                    user_gobernacions.id as id, 
                    user_gobernacions.nombres as nombres, 
                    user_gobernacions.paterno as paterno,
                    user_gobernacions.materno as materno, 
                    user_gobernacions.cargo as cargo, 
                    user_gobernacions.ci as ci, 
                    user_gobernacions.ext_ci as ext_ci, 
                    user_gobernacions.user_id as user_id, 
                    user_gobernacions.estado as estado, 
                    users.rol as usuario, 
                    users.email as email,
                    institucions.nombre as institucion,
                    institucions.departamento as departamento
                ')
            ->whereIn('user_gobernacions.estado', [1])
            ->whereNotIn('users.id', [1])
            ->get();


        return response()->json($user_gobernacions);
    }

    public function show(UserGobernacion $gobernacion)
    {
        $gobernacion_show = DB::table('user_gobernacions')
            ->join('users', 'users.id', '=', 'user_gobernacions.user_id')
            ->join('institucions', 'institucions.id', '=', 'user_gobernacions.institucion_id')
            ->selectRaw('
                    user_gobernacions.id as id, 
                    user_gobernacions.nombres as nombres, 
                    user_gobernacions.paterno as paterno,
                    user_gobernacions.materno as materno, 
                    user_gobernacions.cargo as cargo, 
                    user_gobernacions.ci as ci, 
                    user_gobernacions.ext_ci as ext_ci, 
                    user_gobernacions.user_id as user_id, 
                    user_gobernacions.institucion_id as institucion_id, 
                    users.rol as usuario, 
                    users.email as email,
                    institucions.nombre as institucion,
                    institucions.departamento as departamento
                ')
            ->where('user_gobernacions.id', $gobernacion->id)
            ->first();

        return response()->json($gobernacion_show);
    }

    public function store(Request $request)
    {
        $user_auth = auth()->user();
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'ci' => 'required|string|max:12|unique:user_gobernacions,ci',
            'ext_ci' => 'required',
            'email' => 'required|email|unique:users,email',
            'institucion_id' => 'required',
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
            'password' => Hash::make($request->ci),
        ])->assignRole('gobernacion');

        $gobernacion = UserGobernacion::create([
            'nombres' => $request->nombres,
            'paterno' => $request->paterno,
            'materno' => $request->materno,
            'cargo' => $request->cargo,
            'ci' =>  $request->ci,
            'ext_ci' => $request->ext_ci,
            'institucion_id' => $request->institucion_id,
            'user_id' => $user->id,
            'create' => $user_auth->id,
        ]);

        return response([
            'user' => $user,
            'gobernacion' => $gobernacion,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }



    public function update(UserGobernacion $gobernacion, Request $request)
    {
        $user_auth = auth()->user();
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'ci' => 'required|string|max:12|unique:user_gobernacions,ci,' . $gobernacion->id,
            'ext_ci' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->user_id,
            'institucion_id' => 'required',
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
        $gobernacion->institucion_id = $request->institucion_id;
        $gobernacion->update = $user_auth->id;
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

    public function destroy(UserGobernacion $gobernacion)
    {
        $user_auth = auth()->user();

        $caracteres_permitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&/()?-+{}[]_${}*';
        $longitud = 20;
        $random = substr(str_shuffle($caracteres_permitidos), 0, $longitud);
        $usuario = $gobernacion->user_id . $random;

        // cambiar el usuario 
        $user = User::find($gobernacion->user_id);
        $user->password =  Hash::make($usuario);
        $user->save();

        $gobernacion->estado = 0;
        $gobernacion->delete = $user_auth->id;
        $gobernacion->save();

        return response([
            'message' => 'Gobernacion Eliminado'
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
