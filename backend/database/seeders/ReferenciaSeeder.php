<?php

namespace Database\Seeders;

use App\Models\Referencia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReferenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Referencia::create([
            'direccion' => 'Avenida Jose Carrasco N° 1391 (Miraflores)',
            'horario' => '08:30 a 12:30 - 14:30 a 18:30',
            'whatsapp' => '68106559',
            'telefono' => '2222333',
            'correo' => 'personalidades@viceministerio.gob.bo',
            'fax' => '2228885',
        ]);
    }
}
