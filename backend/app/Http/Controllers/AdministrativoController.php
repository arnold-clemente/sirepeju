<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdministrativoController extends Controller
{
    public function index()
    {
        $administrativos = Administrativo::with('user')->whereIn('estado', [1])->get();
        return response()->json($administrativos);
    }

    public function show(Administrativo $administrativo)
    {
        $administrativoEdit = Administrativo::selectRaw('administrativos.id as id, administrativos.nombres as nombres, administrativos.paterno as paterno,
        administrativos.materno as materno, administrativos.cargo as cargo, administrativos.ci as ci, administrativos.ext_ci as ext_ci, 
        users.rol as usuario, administrativos.user_id as user_id, users.email as email')
            ->join('users', 'users.id', '=', 'administrativos.user_id')
            ->where('administrativos.id', $administrativo->id)
            ->first();
        return response()->json($administrativoEdit);
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
            'ci' => 'required|string|max:12|unique:administrativos,ci',
            'ext_ci' => 'required',
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
            'password' => Hash::make($request->password),
        ]);

        $administrativo = Administrativo::create([
            'nombres' => $request->nombres,
            'paterno' => $request->paterno,
            'materno' => $request->materno,
            'cargo' => $request->cargo,
            'ci' =>  $request->ci,
            'ext_ci' => $request->ext_ci,
            'user_id' => $user->id
        ]);
     

        return response([
            'user' => $user,
            'administrativo' => $administrativo,
            'status' => true,
            'message' => 'Creado satisfactoriamente'
        ]);
    }
   
    public function update(Administrativo $administrativo, Request $request)
    {
        $rules = [
            'nombres' => 'required|string|max:100',
            'paterno' => 'required|string|max:100',
            'materno' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'usuario' => 'required',
            'ci' => 'required|string|max:12|unique:administrativos,ci,' . $administrativo->id,
            'ext_ci' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->user_id,
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
        $administrativo->save();

        $user = User::find($request->user_id);
        $user->email = $request->email;
        $user->rol = $request->usuario;
        $user->name = $request->nombres . " " . $request->paterno . " " . $request->materno;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Administrativo actualizado satisfactoriamente'
        ]);
    }

    public function destroy(Administrativo $administrativo)
    {
        $caracteres_permitidos = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&/()?-+{}[]_${}*';
        $longitud = 20;
        $random = substr(str_shuffle($caracteres_permitidos), 0, $longitud);
        $usuario = $administrativo->user_id . $random;


        // cambiar el usuario 
        $user = User::find($administrativo->user_id);
        $user->password =  Hash::make($usuario);
        $user->save();

        $administrativo->estado = 0;
        $administrativo->save();

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
