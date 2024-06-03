<?php

namespace Database\Seeders;

use App\Models\Registro;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegistroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Registro::create([
            'fecha' => '2023-01-01',
            'codigo' => '0001',
            'personalidad_juridica' => 'COCA COLA',
            'sigla' => 'COKE',
            'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO',
            'observacion' => 'Sin Observacion',
            'estado' => 1,
            'user_administrativo_id' => 1,
        ]);

        Registro::create([
            'fecha' => '2022-10-11',
            'codigo' => '0002',
            'personalidad_juridica' => 'DATALAND',
            'sigla' => 'DAT',
            'naturaleza' => 'FUNDACION',
            'observacion' => 'Sin Observacion',
            'estado' => 1,
            'user_administrativo_id' => 1,
        ]);

        Registro::create([
            'fecha' => '2022-08-08',
            'codigo' => '0003',
            'personalidad_juridica' => 'FEDERACION DE BOXEADORES AMATEURS',
            'sigla' => 'FEBA',
            'naturaleza' => 'ONG',
            'observacion' => 'Sin Observacion',
            'estado' => 1,
            'user_administrativo_id' => 1,
        ]);

        Registro::create([
            'fecha' => '2022-12-12',
            'codigo' => '0004',
            'personalidad_juridica' => 'AFRUPACION LA INFIELES',
            'sigla' => 'POMBA',
            'naturaleza' => 'ORGANIZACIÓN SOCIAL',
            'observacion' => 'Sin Observacion',
            'estado' => 1,
            'user_administrativo_id' => 1,
        ]);

        Registro::create([
            'fecha' => '2022-12-12',
            'codigo' => '0005',
            'personalidad_juridica' => 'ORGANIZACION SOCIAL DE ENTRENADORES MMA',
            'sigla' => 'OSEMMA',
            'naturaleza' => 'ORGANIZACIÓN SOCIAL',
            'observacion' => 'Sin Observacion',
            'estado' => 1,
            'user_administrativo_id' => 1,
        ]);
    }
}
