<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function user(Request $request)
    {
        $user_id = $request->id;
        $user_logueado = User::where('id', $user_id)
            ->select(
                'id',
                'name as nombre',
                'email as correo',
                'rol',
                'profile_photo_path as imagen'
            )
            ->first();

        return response()->json([
            'user' => $user_logueado,
        ]);
    }

    public function profile(Request $request)
    {

        $user_id = $request->user_id;
        $profile_photo_path = $request->file('profile_photo_path');
        $nombres = $request->nombres;
        $correo = $request->correo;

        if ($request->hasFile('profile_photo_path')) {
            $rules = array(
                'profile_photo_path' => 'required|file|max:3000|mimes:jpeg,jpg,png',
                'nombres' => 'required|string|max:255',
                'correo' => 'required|email|max:255|unique:users,email,' . $user_id,
                'user_id' => 'required',
            );
        } else {
            $rules = array(
                'nombres' => 'required|string|max:255',
                'correo' => 'required|email|max:255|unique:users,email,' . $user_id,
                'user_id' => 'required',
            );
        }

        $validator = Validator::make(
            array(
                'user_id' => $user_id,
                'profile_photo_path' => $profile_photo_path,
                'nombres' => $nombres,
                'correo' => $correo,
            ),
            $rules
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $user = User::find($user_id);

        if ($request->hasFile('profile_photo_path')) {
            $user->name = $nombres;
            $user->email = $correo;
            $user->profile_photo_path = $profile_photo_path->store('user', 'public');
            $user->save();
        } else {
            $user->name = $nombres;
            $user->email = $correo;
            $user->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Actualizado con exito',
            'data' => $user,
        ], 200);
    }
}
