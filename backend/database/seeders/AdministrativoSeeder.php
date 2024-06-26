<?php

namespace Database\Seeders;

use App\Models\UserAdministrativo;
use Illuminate\Database\Seeder;

class AdministrativoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {       
        UserAdministrativo::create([ 'nombres' => 'Administrador', 'paterno' => 'Administrador', 'materno' => 'Administrador', 'cargo' => 'Administrador', 'ci' => '123341', 'ext_ci' => 'LP', 'estado' => '1',  'user_id' => '1']);
        UserAdministrativo::create([ 'nombres' => 'Pamela', 'paterno' => 'Mamani', 'materno' => 'Vallejos', 'cargo' => 'Profesional', 'ci' => '432534', 'ext_ci' => 'LP', 'estado' => '1',  'user_id' => '2']);
        UserAdministrativo::create([ 'nombres' => 'Mario ', 'paterno' => 'Duran', 'materno' => 'Choque', 'cargo' => 'Tecnico', 'ci' => '234232', 'ext_ci' => 'LP', 'estado' => '1',  'user_id' => '3']);
        UserAdministrativo::create([ 'nombres' => 'Noelia', 'paterno' => 'Velasquez', 'materno' => 'Estrada', 'cargo' => 'Tecnico', 'ci' => '4234235', 'ext_ci' => 'LP', 'estado' => '1',  'user_id' => '4']);
        UserAdministrativo::create([ 'nombres' => 'Luis', 'paterno' => 'Oblitas', 'materno' => 'Rodas', 'cargo' => 'Director', 'ci' => '324678', 'ext_ci' => 'LP', 'estado' => '1',  'user_id' => '5']);
        UserAdministrativo::create([ 'nombres' => 'Luz', 'paterno' => 'Calle', 'materno' => 'Poma', 'cargo' => 'Vicerrector', 'ci' => '987744', 'ext_ci' => 'LP', 'estado' => '1',  'user_id' => '6']);
       
    }
}
