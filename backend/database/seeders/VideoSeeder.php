<?php

namespace Database\Seeders;

use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Video::create([
            'descripcion' => 'que es una personeria juridica',
            'imagen' => 'video/icon_jusiticia.png',
            'video' => 'video/personeria_juridica.mp4',
        ]);
        Video::create([
            'descripcion' => 'cual es la diferencia entre persona natural y persona colectiva',
            'imagen' => 'video/icon_editar.png',
            'video' => 'video/natural_colectiva.mp4',
        ]);
        Video::create([
            'descripcion' => 'video tutorila para realizar el seguimiento',
            'imagen' => 'video/icon_medalla.png',
            'video' => 'video/tutorial_sirepeju.mp4',
        ]);
    }
}
