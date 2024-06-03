<?php

namespace Database\Seeders;

use App\Models\Redes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RedesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Redes::create([
            'nombre' => 'facebook',
            'url' => 'https://www.facebook.com/gobernaciondelapaz',
            'icon' => 'fab fa-facebook',
        ]);
        Redes::create([
            'nombre' => 'you tube',
            'url' => 'https://www.youtube.com/@sedeslapaz2774',
            'icon' => 'fa-brands fa-youtube',
        ]);
        Redes::create([
            'nombre' => 'Instagram',
            'url' => 'https://www.instagram.com/lapazalcaldia/p/C7Y8uXbM08L/',
            'icon' => 'fa-brands fa-instagram',
        ]);
        Redes::create([
            'nombre' => 'Tik Tok',
            'url' => 'https://www.tiktok.com/@lapaz.en.movimiento',
            'icon' => 'fa-brands fa-tiktok',
        ]);
        Redes::create([
            'nombre' => 'Twitter',
            'url' => 'https://x.com/lapazalcaldia?lang=es',
            'icon' => 'fa-brands fa-x-twitter',
        ]);
    }
}
