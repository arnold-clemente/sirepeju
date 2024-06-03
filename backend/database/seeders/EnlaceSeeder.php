<?php

namespace Database\Seeders;

use App\Models\Enlace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Enlace::create([
            'nombre' => 'Gaceta Oficial de Bolivia',
            'enlace' => 'https://va.presidencia.gob.bo/',
            'imagen' => 'enlace/enlace_1.png',
            'tipo' => 1
        ]);
        Enlace::create([
            'nombre' => 'Unidad de Investigaciones Financieras',
            'enlace' => 'https://va.presidencia.gob.bo/',
            'imagen' => 'enlace/enlace_2.jpg',
            'tipo' => 1
        ]);
        Enlace::create([
            'nombre' => 'Viceministerio de Aútonomias',
            'enlace' => 'https://va.presidencia.gob.bo/',
            'imagen' => 'enlace/enlace_3.jpg',
            'tipo' => 1
        ]);


        Enlace::create([
            'nombre' => 'Beni',
            'enlace' => 'https://www.beni.gob.bo/',
            'imagen' => 'enlace/beni.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'chuquisaca',
            'enlace' => 'https://www.chuquisaca.gob.bo/',
            'imagen' => 'enlace/chuquisaca.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'cochabamba',
            'enlace' => 'https://gobernaciondecochabamba.bo/',
            'imagen' => 'enlace/cochabamba.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'La Paz',
            'enlace' => 'https://www.gobernacionlapaz.gob.bo/',
            'imagen' => 'enlace/lapaz.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'Oruro',
            'enlace' => 'https://www.oruro.gob.bo/',
            'imagen' => 'enlace/oruro.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'pando',
            'enlace' => 'https://pando.gob.bo/',
            'imagen' => 'enlace/pando.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'Potosi',
            'enlace' => 'https://www.potosi.gob.bo/',
            'imagen' => 'enlace/potosi.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'Santa Cruz',
            'enlace' => 'https://www.santacruz.gob.bo/',
            'imagen' => 'enlace/santacruz.png',
            'tipo' => 2
        ]);
        Enlace::create([
            'nombre' => 'Tarija',
            'enlace' => 'https://www.tarija.gob.bo/',
            'imagen' => 'enlace/tarija.png',
            'tipo' => 2
        ]);
    }
}
