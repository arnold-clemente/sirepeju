<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Administrador Administrador Administrador', 
            'email' => 'admin@admin.com', 
            'password' => bcrypt('Sirepeju#12345678'), 
            'rol' => 'superadmin'
        ])->assignRole('superadmin');
        User::create([
            'name' => 'Pamela Mamani Vallejos', 
            'email' => 'pamela2@admin.com', 
            'password' => bcrypt('administrativo_12345679'), 
            'rol' => 'ejecutivo'
        ])->assignRole('ejecutivo');
        User::create([
            'name' => 'Mario  Duran Choque', 
            'email' => 'mario 3@admin.com', 
            'password' => bcrypt('administrativo_12345680'), 
            'rol' => 'tecnico'
        ])->assignRole('tecnico');
        User::create([
            'name' => 'Noelia Velasquez Estrada', 
            'email' => 'noelia4@admin.com', 
            'password' => bcrypt('administrativo_12345681'), 
            'rol' => 'especialista'
        ])->assignRole('especialista');
        User::create([
            'name' => 'Luis Oblitas Rodas', 
            'email' => 'luis5@admin.com', 
            'password' => bcrypt('administrativo_12345682'), 
            'rol' => 'ejecutivo'
        ])->assignRole('ejecutivo');
        User::create([
            'name' => 'Luz Calle Poma', 
            'email' => 'luz6@admin.com', 
            'password' => bcrypt('administrativo_12345683'), 
            'rol' => 'operativo'
        ])->assignRole('operativo');
        User::create([
            'name' => 'Ivana Lazarte Pinto', 
            'email' => 'ivana7@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345683'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Belen Quispe Vhambi', 
            'email' => 'belen8@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345684'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Dan  Mamai Casa', 
            'email' => 'dan 9@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345685'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Pamela Velazquez Vallejos', 
            'email' => 'pamela10@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345686'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Yovana Calle Choque', 
            'email' => 'yovana11@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345687'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'victor Rodrigo Parker Hutieera', 
            'email' => 'victor rodrigo12@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345688'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Miguel Cantuta Perez', 
            'email' => 'miguel13@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345689'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Steve Pari Lopez', 
            'email' => 'steve14@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345690'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
        User::create([
            'name' => 'Jose Mamai Casas', 
            'email' => 'jose15@gobernacion.com', 
            'password' => bcrypt('gobernacion_12345691'), 
            'rol' => 'gobernacion'
        ])->assignRole('gobernacion');
    }
}
