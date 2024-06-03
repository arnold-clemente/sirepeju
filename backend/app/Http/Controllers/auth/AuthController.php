<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
        ];
        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json([
            'status' => true,
            'message' => 'user created successfully',
            'token' => $user->createToken('API TOKEN')->plainTextToken,
        ], 200);
        // return response()->json([
        //     'status' => true,
        //     'requeest' => $request->input()
        // ], 300);
    }

    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|string|email|max:100',
            'password' => 'required|string',
        ];
        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'errors' => ['El correo y la contraseña no concuerdan']
            ], 200);
        }
        $user = User::where('email', $request->email)->first();

        $user_logueado = User::where('id', $user->id)
            ->select(
                'id',
                'name as nombre',
                'email as correo',
                'rol',
                'profile_photo_path as imagen'
            )
            ->first();

        $roles = $user->getRoleNames();
        $permission = $user->getPermissionsViaRoles()->pluck('name');

        return response()->json([
            'status' => true,
            'message' => 'inicio de sesión con éxito',
            'data' => $user,
            'token' => $user->createToken('API TOKEN')->plainTextToken,
            'user' => $user_logueado,
            'roles' => $roles,
            'permission' => $permission,
        ], 200);
    }

    public function logout()
    {
        $user = auth()->user()->tokens()->delete();
        return response()->json([
            'user' => $user,
            'status' => true,
            'message' => 'Desconectó con éxito',
        ], 200);
    }
}
