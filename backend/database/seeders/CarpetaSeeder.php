<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CarpetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // eliminar 
        Storage::deleteDirectory('public/adecuacion_estatuto_organico');
        Storage::deleteDirectory('public/adecuacion_informe_final');
        Storage::deleteDirectory('public/adecuacion_nota_final');
        Storage::deleteDirectory('public/adecuacion_reglamento_interno');
        Storage::deleteDirectory('public/otorgacion_estatuto_organico');
        Storage::deleteDirectory('public/otorgacion_informe_final');
        Storage::deleteDirectory('public/otorgacion_nota_final');
        Storage::deleteDirectory('public/otorgacion_reglamento_interno');
        Storage::deleteDirectory('public/user');

        // crear 
        Storage::makeDirectory('public/adecuacion_estatuto_organico');
        Storage::makeDirectory('public/adecuacion_informe_final');
        Storage::makeDirectory('public/adecuacion_nota_final');
        Storage::makeDirectory('public/adecuacion_reglamento_interno');
        Storage::makeDirectory('public/otorgacion_estatuto_organico');
        Storage::makeDirectory('public/otorgacion_informe_final');
        Storage::makeDirectory('public/otorgacion_nota_final');
        Storage::makeDirectory('public/otorgacion_reglamento_interno');
        Storage::makeDirectory('public/user');
        Storage::makeDirectory('public/requisitos');
        Storage::makeDirectory('public/normativa');
    }
}
