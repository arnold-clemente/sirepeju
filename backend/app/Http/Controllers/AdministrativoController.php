<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAdministrativo;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AdministrativoController extends Controller
{
    public function index()
    {
        $user_administrativos = DB::table('user_administrativos')
            ->join('users', 'users.id', '=', 'user_administrativos.user_id')
            ->selectRaw('
                    user_administrativos.id as id, 
                    user_administrativos.nombres as nombres, 
                    user_administrativos.paterno as paterno,
                    user_administrativos.materno as materno, 
                    user_administrativos.cargo as cargo, 
                    user_administrativos.ci as ci, 
                    user_administrativos.ext_ci as ext_ci,
                    user_administrativos.estado as estado,
                    users.rol as usuario, 
                    user_administrativos.user_id as user_id, 
                    users.email as email
                ')
            ->whereIn('user_administrativos.estado', [1])
            ->whereNotIn('users.id', [1])
            ->get();


        return response()->json($user_administrativos);
    }

    public function show(UserAdministrativo $administrativo)
    {
        $adminitrativo_show = DB::table('user_administrativos')
            ->join('users', 'users.id', '=', 'user_administrativos.user_id')
            ->selectRaw('
                    user_administrativos.id as id, 
                    user_administrativos.nombres as nombres, 
                    user_administrativos.paterno as paterno,
                    user_administrativos.materno as materno, 
                    user_administrativos.cargo as cargo, 
                    user_administrativos.ci as ci, 
                    user_administrativos.ext_ci as ext_ci, 
                    users.rol as usuario, 
                    user_administrativos.user_id as user_id, 
                    users.email as email
                ')
            ->where('user_administrativos.id', $administrativo->id)
            ->first();

        return response()->json($adminitrativo_show);
    }


    public function store(Request $request)
    {
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'usuario' => 'required',
            'email' => 'required|email|unique:users,email',
            'ci' => 'required|string|max:12|unique:user_administrativos,ci',
            'ext_ci' => 'required',
            'user_id' => 'required',
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
            'rol' => $request->usuario,
            'password' => Hash::make($request->ci),
        ])->assignRole($request->usuario);

        $administrativo = UserAdministrativo::create([
            'nombres' => $request->nombres,
            'paterno' => $request->paterno,
            'materno' => $request->materno,
            'cargo' => $request->cargo,
            'ci' =>  $request->ci,
            'ext_ci' => $request->ext_ci,
            'user_id' => $user->id,
            'create' => $request->user_id,
        ]);


        return response([
            'user' => $user,
            'administrativo' => $administrativo,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function edit(UserAdministrativo $administrativo)
    {
        $adminitrativo_show = DB::table('user_administrativos')
            ->join('users', 'users.id', '=', 'user_administrativos.user_id')
            ->selectRaw('
                user_administrativos.id as id, 
                user_administrativos.nombres as nombres, 
                user_administrativos.paterno as paterno,
                user_administrativos.materno as materno, 
                user_administrativos.cargo as cargo, 
                user_administrativos.ci as ci, 
                user_administrativos.ext_ci as ext_ci, 
                users.rol as usuario, 
                user_administrativos.user_id as user_id, 
                users.email as email
            ')
            ->where('user_administrativos.id', $administrativo->id)
            ->first();

        $roles = Role::whereNotIn('id', [1, 6])
            ->where('state', 1)
            ->get();

        return response()->json([
            'administrativo' => $adminitrativo_show,
            'roles' => $roles,
        ]);
    }

    public function update(UserAdministrativo $administrativo, Request $request)
    {
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'usuario' => 'required',
            'ci' => 'required|string|max:12|unique:user_administrativos,ci,' . $administrativo->id,
            'ext_ci' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->user_id,
            'auth_id' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $administrativo->nombres = $request->nombres;
        $administrativo->paterno = $request->paterno;
        $administrativo->materno = $request->materno;
        $administrativo->cargo = $request->cargo;
        $administrativo->ci = $request->ci;
        $administrativo->ext_ci = $request->ext_ci;
        $administrativo->update = $request->auth_id;
        $administrativo->save();


        $user = User::find($request->user_id);
        if ($user->rol == $request->usuario) {
            $user->email = $request->email;
            $user->rol = $request->usuario;
            $user->name = $request->nombres . " " . $request->paterno . " " . $request->materno;
            $user->save();
        } else {
            $user->removeRole($user->rol);
            $user->email = $request->email;
            $user->rol = $request->usuario;
            $user->name = $request->nombres . " " . $request->paterno . " " . $request->materno;
            $user->assignRole($request->usuario);
            $user->save();
        }



        return response()->json([
            'status' => true,
            'message' => 'Administrativo actualizado satisfactoriamente'
        ]);
    }

    public function destroy(UserAdministrativo $administrativo)
    {
        $user_auth = auth()->user();

        $caracteres_permitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&/()?-+{}[]_${}*';
        $longitud = 20;
        $random = substr(str_shuffle($caracteres_permitidos), 0, $longitud);
        $usuario = $administrativo->user_id . $random;

        // cambiar el usuario 
        $user = User::find($administrativo->user_id);
        $user->password =  Hash::make($usuario);
        $user->save();

        $administrativo->estado = 0;
        $administrativo->delete =  $user_auth->id;
        $administrativo->save();

        return response([
            'message' => 'Administrativo Eliminado'
        ]);
    }

    public function password(Request $request)
    {
        $user_auth = auth()->user();

        $user = User::find($request->user_id);
        $user->password =  Hash::make($request->ci);
        $user->save();

        return response([
            'user' => $user_auth,
            'message' => 'Contraseña Actualizado'
        ]);
    }
}
