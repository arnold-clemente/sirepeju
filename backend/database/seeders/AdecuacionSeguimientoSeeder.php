<?php

namespace Database\Seeders;

use App\Models\AdecuacionInforme;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdecuacionSeguimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'REALIZO SEGUIMIENTO ',            
            'estado' => 1,
            'adecuacion_id' => 1,
        ]);
        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'ENTREGARON SU SUBSANACION ',            
            'estado' => 1,
            'adecuacion_id' => 2,
        ]);
        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'REALIZO SEGUIMIENTO 3 ',            
            'estado' => 1,
            'adecuacion_id' => 3,
        ]);
        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'ENTREGARON SU SUBSANACION 4',            
            'estado' => 1,
            'adecuacion_id' => 4,
        ]);
        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'REALIZO SEGUIMIENTO 5 ',            
            'estado' => 1,
            'adecuacion_id' => 5,
        ]);
    }
}
