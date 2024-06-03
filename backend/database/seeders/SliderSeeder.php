<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Slider::create([
            'titulo' => 'FAM - BOLIVIA RATIFICA SU RECONOCIMIENTO A NIVEL NACIONAL',
            'imagen' => 'slider/imagen.jpg',
            'descripcion' => 'La Federacion de asociaciones de unicipales de Bolivia (FAM - BOLIVIA), celebro su 24 aniversario
            de vida institucional, evento en el que el presidente del estado plurinalciona de bolivia Arce Luis Catavota
            la entrega oficial de la actualiacion de la personalidad juridica, ratificando su reconocimiento nacionl
            en su cumplimiento a la normativa vigente.',
            'fecha' => '6 NOv 2023 @ 08:00 - 17:00',
        ]);
        Slider::create([
            'titulo' => 'FAM - BOLIVIA RATIFICA SU RECONOCIMIENTO A NIVEL NACIONAL',
            'imagen' => 'slider/imagen.jpg',
            'descripcion' => 'La Federacion de asociaciones de unicipales de Bolivia (FAM - BOLIVIA), celebro su 24 aniversario
            de vida institucional, evento en el que el presidente del estado plurinalciona de bolivia Arce Luis Catavota
            la entrega oficial de la actualiacion de la personalidad juridica, ratificando su reconocimiento nacionl
            en su cumplimiento a la normativa vigente.',
            'fecha' => '6 NOv 2023 @ 08:00 - 17:00',
        ]);
        Slider::create([
            'titulo' => 'FAM - BOLIVIA RATIFICA SU RECONOCIMIENTO A NIVEL NACIONAL',
            'imagen' => 'slider/imagen.jpg',
            'descripcion' => 'La Federacion de asociaciones de unicipales de Bolivia (FAM - BOLIVIA), celebro su 24 aniversario
            de vida institucional, evento en el que el presidente del estado plurinalciona de bolivia Arce Luis Catavota
            la entrega oficial de la actualiacion de la personalidad juridica, ratificando su reconocimiento nacionl
            en su cumplimiento a la normativa vigente.',
            'fecha' => '6 NOv 2023 @ 08:00 - 17:00',
        ]);
    }
}
