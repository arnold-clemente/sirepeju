<?php

namespace Database\Seeders;

use App\Models\Institucion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitucionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Institucion::create(['nombre' => 'SIREPEJU', 'departamento' => 'La Paz']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Beni', 'departamento' => 'Beni']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Chuquisaca', 'departamento' => 'Chuquisaca']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Cochabamba', 'departamento' => 'Cochabamba']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de La Paz', 'departamento' => 'La Paz']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Oruro', 'departamento' => 'Oruro']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Pando', 'departamento' => 'Pando']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Potosi', 'departamento' => 'Potosi']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Santa Cruz', 'departamento' => 'Santa Cruz']);
        Institucion::create(['nombre' => 'Gobierno Autonomo Departamental de Tarija', 'departamento' => 'Tarija']);
    }
}
