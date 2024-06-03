<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run()
    {
        $role1 = Role::create(['name' => 'superadmin']); // no modifica
        $role2 = Role::create(['name' => 'ejecutivo']);
        $role3 = Role::create(['name' => 'tecnico']);
        $role4 = Role::create(['name' => 'especialista']);
        $role5 = Role::create(['name' => 'operativo']);  //--> este tienes mas permisos 
        $role6 = Role::create(['name' => 'gobernacion']); /// no modifica

        // panel de la pagina web 
        $permission = Permission::create(['type' => 6, 'name' => 'panel.pagina', 'description' => 'Vista de Pagina Web'])->syncRoles([$role1, $role2, $role3]);

        // permisos de type 1 = usuarios panel en frontend 
        //rutas usuarios administrativos - usuarios gobernacion
        $permission = Permission::create(['type' => 6, 'name' => 'inicio.panel', 'description' => 'vista inicio'])->syncRoles([$role1, $role2, $role3, $role4, $role5, $role6]);
        $permission = Permission::create(['type' => 6, 'name' => 'usuarios.panel', 'description' => 'vista usuarios'])->syncRoles([$role1, $role2]);

        $permission = Permission::create(['type' => 6, 'name' => 'administrativos', 'description' => 'vista administrativos'])->syncRoles([$role1, $role2]);
        $permission = Permission::create(['type' => 1, 'name' => 'administrativo.store', 'description' => 'crear administrativo'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 1, 'name' => 'administrativo.update', 'description' => 'actualizar administrativo'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 1, 'name' => 'administrativo.destroy', 'description' => 'eliminar administrativo'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 1, 'name' => 'administrativo.password', 'description' => 'contraseña administrativo'])->syncRoles([$role1]);

        $permission = Permission::create(['type' => 6, 'name' => 'gobernacions', 'description' => 'vista gobernaciones'])->syncRoles([$role1, $role2]);
        $permission = Permission::create(['type' => 1, 'name' => 'gobernacion.store', 'description' => 'crear gobernacion'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 1, 'name' => 'gobernacion.update', 'description' => 'actualizar gobernacion'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 1, 'name' => 'gobernacion.destroy', 'description' => 'eliminar gobernacion'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 1, 'name' => 'gobernacion.password', 'description' => 'contraseña gobernacion'])->syncRoles([$role1]);

        // permisos de type 2 = reserva de nombre en el panel de frontend 
        //rutas solcicirud de reserva - homonimia reserva - reservas de otorgacion - reservas caducados
        $permission = Permission::create(['type' => 6, 'name' => 'reservas.panel', 'description' => 'vista reservas'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'verificacion.entidades', 'description' => 'vista verificacion'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 6, 'name' => 'reservas.solicitudes', 'description' => 'vista solicitudes'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 2, 'name' => 'reserva.store', 'description' => 'crear reserva'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 2, 'name' => 'reserva.update', 'description' => 'actualizar reserva'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'reservas.homonimias', 'description' => 'vista homonimias'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 2, 'name' => 'reserva.homonimo', 'description' => 'efectuar homonimia'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'reservas.reservados', 'description' => 'vista reservados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 2, 'name' => 'reserva.reservar', 'description' => 'efectuar reservado'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'reservas.caducados', 'description' => 'vista caducados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 2, 'name' => 'reserva.caducar', 'description' => 'caducar reservad2'])->syncRoles([$role1, $role5]);

        // permisos de type 3 = otorgacion personalidad juridica en el panel de frontend 
        //rutas otorgacion: proceso - archivado - caducados - personalidad - modificacion - revocados - extinguidas
        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.panel', 'description' => 'vista otorgaciones'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones', 'description' => 'vista en procesos'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.store', 'description' => 'crear otorgacion'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.informe', 'description' => 'informe otorgacion'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.seguimiento', 'description' => 'seguimiento otorgacion'])->syncRoles([$role1, $role5]);

        // $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.fundadores.store', 'description' => 'crear fundador'])->syncRoles([$role1, $role5]);
        // $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.fundadores.update', 'description' => 'actualizar fundador'])->syncRoles([$role1, $role5]);
        // $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.fundadores.destroy', 'description' => 'eliminar fundador'])->syncRoles([$role1, $role5]);
        // $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.registro', 'description' => 'registro final'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.personalidades', 'description' => 'vista personalidades'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.personalidad', 'description' => 'personalidad juridica'])->syncRoles([$role1, $role5]);


        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.archivados', 'description' => 'vista archivados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.archivar', 'description' => 'archivar otorgacion'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.desarchivar', 'description' => 'desarchivar otorgacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.caducados', 'description' => 'vista caducados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.caducar', 'description' => 'caducar otorgacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.revocatorias', 'description' => 'vista revocados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.revocar', 'description' => 'revocar otorgacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.extinguidas', 'description' => 'vista extinguidas'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.extinguir', 'description' => 'extinguir otorgacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'otorgaciones.modificaciones', 'description' => 'vista modificaciones'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 3, 'name' => 'otorgacion.modificar', 'description' => 'modificar otorgacion'])->syncRoles([$role1, $role5]);


        // permisos de type 4 = adecuacion personalidad juridica en el panel de frontend 
        //rutas adecuacion: proceso - archivado - caducados - personalidad - modificacion - revocados - extinguidas
        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.panel', 'description' => 'vista adecuaciones'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones', 'description' => 'vista en procesos'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.store', 'description' => 'crear adecuacion'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.informe', 'description' => 'informe adecuacion'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.seguimiento', 'description' => 'seguimiento adecuacion'])->syncRoles([$role1, $role5]);

        // $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.fundadores.store', 'description' => 'crear fundador'])->syncRoles([$role1, $role5]);
        // $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.fundadores.update', 'description' => 'actualizar fundador'])->syncRoles([$role1, $role5]);
        // $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.fundadores.destroy', 'description' => 'eliminar fundador'])->syncRoles([$role1, $role5]);
        // $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.registro', 'description' => 'registro final'])->syncRoles([$role1, $role5]);;

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.personalidades', 'description' => 'vista personalidades'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.personalidad', 'description' => 'personalidad juridica'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.archivados', 'description' => 'vista archivados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.archivar', 'description' => 'archivar adecuacion'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.desarchivar', 'description' => 'desarchivar adecuacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.caducados', 'description' => 'vista caducados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.caducar', 'description' => 'caducar adecuacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.revocatorias', 'description' => 'vista revocados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.revocar', 'description' => 'revocar adecuacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.extinguidas', 'description' => 'vista extinguidas'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.extinguir', 'description' => 'extinguir adecuacion'])->syncRoles([$role1, $role5]);

        $permission = Permission::create(['type' => 6, 'name' => 'adecuaciones.modificaciones', 'description' => 'vista modificaciones'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 4, 'name' => 'adecuacion.modificar', 'description' => 'modificar adecuacion'])->syncRoles([$role1, $role5]);

        // permisos de type 5 = registros reservados panel en frontend 
        //rutas registros reservados

        $permission = Permission::create(['type' => 6, 'name' => 'registrados', 'description' => 'vista registrados'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 5, 'name' => 'registrado.store', 'description' => 'crear registrado'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 5, 'name' => 'registrado.update', 'description' => 'actualizar registrado'])->syncRoles([$role1, $role5]);
        $permission = Permission::create(['type' => 5, 'name' => 'registrado.destroy', 'description' => 'eliminar registrado'])->syncRoles([$role1, $role5]);

        // permisos de type 6 = otors para el panel panel en frontend 
        //rutas registros reservados


        $permission = Permission::create(['type' => 6, 'name' => 'modificaciones', 'description' => 'vista modificaciones'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);
        $permission = Permission::create(['type' => 6, 'name' => 'modificacion.caducados', 'description' => 'modificaiones caducadas'])->syncRoles([$role1, $role2, $role3, $role4, $role5]);

        // permisos de type 7 = otorgacion gobernaciones panel en frontend 
        //rutas otorgacion gobernaciones 

        $permission = Permission::create(['type' => 6, 'name' => 'otorgacion.gobernaciones', 'description' => 'otorgaciones gobernacion'])->syncRoles([$role1, $role2, $role3, $role4, $role5, $role6]);
        $permission = Permission::create(['type' => 7, 'name' => 'otorgacion.gobernacion.store', 'description' => 'crear otorgacion'])->syncRoles([$role1, $role6]);
        $permission = Permission::create(['type' => 7, 'name' => 'otorgacion.gobernacion.update', 'description' => 'actualizar otorgacion'])->syncRoles([$role1, $role6]);
        $permission = Permission::create(['type' => 7, 'name' => 'otorgacion.gobernacion.destroy', 'description' => 'eliminar otorgacion'])->syncRoles([$role1, $role6]);

        // permisos de type 10 
        //rutas roles de usuarios
        $permission = Permission::create(['type' => 8, 'name' => 'roles', 'description' => 'vista roles'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 8, 'name' => 'rol.store', 'description' => 'crear rol'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 8, 'name' => 'rol.update', 'description' => 'actualizar rol'])->syncRoles([$role1]);
        $permission = Permission::create(['type' => 8, 'name' => 'rol.destroy', 'description' => 'eliminar rol'])->syncRoles([$role1]);
    }
}
