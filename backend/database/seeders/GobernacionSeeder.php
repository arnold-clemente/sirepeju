<?php

namespace Database\Seeders;

use App\Models\UserGobernacion;
use Illuminate\Database\Seeder;

class GobernacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        UserGobernacion::create(['nombres' => 'Administrador', 'paterno' => 'Administrador', 'materno' => 'Administrador', 'cargo' => 'Administrador', 'institucion_id' => '1', 'ci' => '11111111', 'ext_ci' => 'LP',  'estado' => '1', 'user_id' => 1]);
        UserGobernacion::create(['nombres' => 'Ivana', 'paterno' => 'Lazarte', 'materno' => 'Pinto', 'cargo' => 'Tecnico', 'institucion_id' => '1', 'ci' => '564439', 'ext_ci' => 'BN',  'estado' => '1', 'user_id' => 7]);
        UserGobernacion::create(['nombres' => 'Belen', 'paterno' => 'Quispe', 'materno' => 'Vhambi', 'cargo' => 'Tecnico', 'institucion_id' => '2', 'ci' => '907642', 'ext_ci' => 'CH',  'estado' => '1', 'user_id' => 8]);
        UserGobernacion::create(['nombres' => 'Dan ', 'paterno' => 'Mamai', 'materno' => 'Casa', 'cargo' => 'Tecnico', 'institucion_id' => '3', 'ci' => '888888', 'ext_ci' => 'CB',  'estado' => '1', 'user_id' => 9]);
        UserGobernacion::create(['nombres' => 'Pamela', 'paterno' => 'Velazquez', 'materno' => 'Vallejos', 'cargo' => 'Tecnico', 'institucion_id' => '4', 'ci' => '644889', 'ext_ci' => 'LP',  'estado' => '1', 'user_id' => 10]);
        UserGobernacion::create(['nombres' => 'Yovana', 'paterno' => 'Calle', 'materno' => 'Choque', 'cargo' => 'Tecnico', 'institucion_id' => '5', 'ci' => '762312', 'ext_ci' => 'OR',  'estado' => '1', 'user_id' => 11]);
        UserGobernacion::create(['nombres' => 'victor Rodrigo', 'paterno' => 'Parker', 'materno' => 'Hutieera', 'cargo' => 'Tecnico', 'institucion_id' => '6', 'ci' => '987744', 'ext_ci' => 'PA',  'estado' => '1', 'user_id' => 12]);
        UserGobernacion::create(['nombres' => 'Miguel', 'paterno' => 'Cantuta', 'materno' => 'Perez', 'cargo' => 'Tecnico', 'institucion_id' => '7', 'ci' => '655437', 'ext_ci' => 'PT',  'estado' => '1', 'user_id' => 13]);
        UserGobernacion::create(['nombres' => 'Steve', 'paterno' => 'Pari', 'materno' => 'Lopez', 'cargo' => 'Tecnico', 'institucion_id' => '8', 'ci' => '903280', 'ext_ci' => 'SC',  'estado' => '1', 'user_id' => 14]);
        UserGobernacion::create(['nombres' => 'Jose', 'paterno' => 'Mamai', 'materno' => 'Casas', 'cargo' => 'Tecnico', 'institucion_id' => '9', 'ci' => '909212', 'ext_ci' => 'TJ',  'estado' => '1', 'user_id' => 15]);
    
    }
}
