<?php

namespace Database\Seeders;

use App\Models\Noticia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoticiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Noticia::create([
            'titulo' => 'Entega de Personeria Juridica a la universidad de san francisco de Javier',
            'imagen' => 'noticias/noticia1.jpg'
        ]);
        Noticia::create([
            'titulo' => 'Entega de Personeria Juridica a la universidad de san francisco de Javier',
            'imagen' => 'noticias/noticia2.jpg'
        ]);
        Noticia::create([
            'titulo' => 'Entega de Personeria Juridica a la universidad de san francisco de Javier',
            'imagen' => 'noticias/noticia3.jpg'
        ]);
    }
}
