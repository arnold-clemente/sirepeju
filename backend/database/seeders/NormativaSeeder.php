<?php

namespace Database\Seeders;

use App\Models\Normativa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NormativaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Normativa::create([
            'nombre' => 'Ley 351 de otorgacion de personalidades jurdicas',
            'archivo' => 'normativa/1-ley-351_de_otorgacion_de_personalidades_jurdicas.pdf'
        ]);
        Normativa::create([
            'nombre' => 'DS 1597 reglamentacion parcial a la ley 351',
            'archivo' => 'normativa/2-ds_1597_reglamentacion_parcial_a_la_ley_351.pdf'
        ]);
        Normativa::create([
            'nombre' => 'DS 2650 modificacion al paragrafo iii del art 11 del ds 1597',
            'archivo' => 'normativa/3-ds_n_2650_modificacion_al_paragrafo_iii_del_art_11_del_d_s_n_1597.pdf'
        ]);
        Normativa::create([
            'nombre' => 'reglamento de adecuacion anexo rm 051 2019',
            'archivo' => 'normativa/4.1-reglamento_de_adecuacion-anexo_rm_051_2019.pdf'
        ]);
        Normativa::create([
            'nombre' => 'DS 3746 establece la adecuacion a la ley n 351',
            'archivo' => 'normativa/4-ds_n_3746_establece_la_adecuacion_a_la_ley_n_351.pdf'
        ]);
        Normativa::create([
            'nombre' => 'DS 4635 vigencia a los ds 1597 2650 y 3746',
            'archivo' => 'normativa/5-ds_n_4635_vigencia_a_los_ds_n_1597_2650_y_3746.pdf'
        ]);
    }
}
