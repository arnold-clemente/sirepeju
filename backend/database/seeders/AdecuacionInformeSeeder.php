<?php

namespace Database\Seeders;

use App\Models\AdecuacionInforme;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdecuacionInformeSeeder extends Seeder
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
            'descripcion' => 'QUINTO INFORME P/ENTREGA ',            
            'estado' => 1,
            'adecuacion_id' => 1,
        ]);

        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'EN TRAMITE ',            
            'estado' => 1,
            'adecuacion_id' => 2,
        ]);

        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'SUBSANA OBSERVACIONES HR 26879',            
            'estado' => 1,
            'adecuacion_id' => 3,
        ]);

        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'NOTA REITERATORIA DE OBSERVACIONES CUARTO INFORME NOTIFICADO 22/07/2022. SUBSANA OBSERVACIONES HR  24800 ',            
            'estado' => 1,
            'adecuacion_id' => 4,
        ]);

        AdecuacionInforme::create([
            'fecha' => '2024-07-24',
            'descripcion' => 'INFORME FINAL',            
            'estado' => 1,
            'adecuacion_id' => 5,
        ]);
    }
}
