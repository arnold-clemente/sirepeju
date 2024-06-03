<?php

namespace Database\Seeders;

use App\Models\Tramite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TramiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tramite::create([
            'nombre' => 'Modificación de estatuto orgánico y reglamento interno',
            'requisito_id' => 1,
        ]);
        Tramite::create([
            'nombre' => 'Entidad civil sin',
            'requisito_id' => 2,
        ]);
        Tramite::create([
            'nombre' => 'Fundacion',
            'requisito_id' => 2,
        ]);
        Tramite::create([
            'nombre' => 'ONG',
            'requisito_id' => 2,
        ]);
        Tramite::create([
            'nombre' => 'Organizacion Socia',
            'requisito_id' => 2,
        ]);
        Tramite::create([
            'nombre' => 'Fundacion',
            'requisito_id' => 3,
        ]);
        Tramite::create([
            'nombre' => 'ong',
            'requisito_id' => 3,
        ]);
        Tramite::create([
            'nombre' => 'Trámite de otorgación de personalidad jurídica conformada por personas colectivas',
            'requisito_id' => 4,
        ]);
        Tramite::create([
            'nombre' => 'Trámite de otorgación de personalidad jurídica conformada por personas naturales',
            'requisito_id' => 5,
        ]);

    }
}
