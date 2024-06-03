<?php

namespace Database\Seeders;

use App\Models\Iconos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IconosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Iconos::create([
            'nombre' => 'Ubicación',
            'clase' => 'fas fa-map-marker-alt'
        ]);
        
        Iconos::create([
            'nombre' => 'Facebook',
            'clase' => 'fab fa-facebook'
        ]);

        Iconos::create([
            'nombre' => 'Telefono',
            'clase' => 'fa-solid fa-phone'
        ]);
        
        Iconos::create([
            'nombre' => 'Correo',
            'clase' => 'fa-regular fa-envelope'
        ]);
        Iconos::create([
            'nombre' => 'Telegram',
            'clase' => 'fa-brands fa-telegram'
        ]);

        Iconos::create([
            'nombre' => 'Twitter',
            'clase' => 'fa-brands fa-x-twitter'
        ]);

        Iconos::create([
            'nombre' => 'Twich',
            'clase' => 'fa-brands fa-twitch'
        ]);
        Iconos::create([
            'nombre' => 'Imagen',
            'clase' => 'fa-solid fa-photo-film'
        ]);
        Iconos::create([
            'nombre' => 'Instagram',
            'clase' => 'fa-brands fa-instagram'
        ]);
        Iconos::create([
            'nombre' => 'Whatsapp',
            'clase' => 'fa-brands fa-whatsapp'
        ]);
        Iconos::create([
            'nombre' => 'Tiktok',
            'clase' => 'fa-brands fa-tiktok'
        ]);
        Iconos::create([
            'nombre' => 'Google',
            'clase' => 'fa-brands fa-google'
        ]);
        Iconos::create([
            'nombre' => 'Youtube',
            'clase' => 'fa-brands fa-youtube'
        ]);
    }
}
