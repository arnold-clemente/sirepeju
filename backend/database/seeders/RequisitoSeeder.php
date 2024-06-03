<?php

namespace Database\Seeders;

use App\Models\Requisito;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RequisitoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Requisito::create([
            'nombre' => 'Modificación de estatuto orgánico y reglamento interno',
            'imagen' => 'requisitos/icon_user.png',
        ]);
        Requisito::create([
            'nombre' => 'Reserva y verificación de nombre - para personas colectivas que no cuentan con personalidad jurídica',
            'imagen' => 'requisitos/icon_editar.png',
        ]);
        Requisito::create([
            'nombre' => 'Reserva y verificacion de nombre nivel departamental',
            'imagen' => 'requisitos/icon_good.png',
        ]);
        Requisito::create([
            'nombre' => 'Trámite de otorgación de personalidad jurídica conformada por personas colectivas',
            'imagen' => 'requisitos/icon_justicia.png',
        ]);
        Requisito::create([
            'nombre' => 'Trámite de otorgación de personalidad jurídica conformada por personas naturales',
            'imagen' => 'requisitos/icon_partenon.png',
        ]);
    }
}
