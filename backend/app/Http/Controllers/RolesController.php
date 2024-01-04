<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::whereNotIn('id', [1, 6])
            ->where('state', 1)
            ->get();

        return response()->json($roles);
    }

    public function show(Role $role)
    {
        $consulta_permisos = DB::table('role_has_permissions')
            ->join('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
            ->where('role_id', $role->id)
            ->select(
                'permissions.id', 
                'permissions.name', 
                'permissions.description',
                'permissions.type'
                )
            ->groupBy(
                'permissions.id', 
                'permissions.name', 
                'permissions.description',
                'permissions.type'
                )
            ->get();

        return response()->json([
            'rol' => $role,
            'permisos' => $consulta_permisos,
        ]);
    }

    public function getpermisos()
    {
        $permissions = Permission::whereNotIn('type', [7, 8])
            ->get();

        return response()->json($permissions);
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:150|unique:roles,name',
            'permisos' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $role = Role::create([
            'name' => $request->name,
            'guard_name' => 'web',
        ]);

        $role->permissions()->sync($request->permisos);

        return response()->json([
            'status' => true,
            'data' => $request->all()
        ]);
    }

    public function edit(Role $role)
    {
        $consulta_permisos = DB::table('role_has_permissions')
            ->join('permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
            ->where('role_id', $role->id)
            ->select('permissions.id', 'permissions.name')
            ->groupBy('permissions.id', 'permissions.name')
            ->get();

        $permisos = $consulta_permisos->pluck("id")->toArray();

        $permissions = Permission::whereNotIn('type', [7, 8])
            ->get();

        return response()->json([
            'rol' => $role,
            'permisos' => $permisos,
            'permissions' => $permissions,
        ]);
    }

    public function update(Role $role, Request $request)
    {
        $rules = [
            'name' => 'required|string|max:150|unique:roles,name,' . $role->id,
            'permisos' => 'required',
        ];

        $validator = Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $role->name = $request->name;
        $role->guard_name = 'web';
        $role->save();

        $role->permissions()->sync($request->permisos);

        return response([
            'status' => true,
            'role' => $role,
            'message' => 'Creado satisfactoriamente'
        ]);
    }

    public function destroy(Role $role)
    {
        $role->state = 0;
        $role->save();

        return response()->json([
            'role' => $role,
            'status' => true,
            'message' => 'Eliminado satisfactoriamente'
        ]);
    }
}
