<?php

namespace Database\Seeders;

use App\Models\OtorgacionGobernacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OtorgacionGobernacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-01', 'resolucion' => 9001, 'nombre_persona_colectiva' => 'FEDERACION DE AUTO CONVOCADOS', 'sigla' => 'FAC', 'departamento_id' => 1, 'objeto' => '00-0988', 'naturaleza' => 'FUNDACION', 'domicilio_legal' => 'domicilio de la federacion de convocados', 'estado' => 11, 'gobernacion_id' => 1,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-02', 'resolucion' => 9002, 'nombre_persona_colectiva' => 'ASOCIACION DE LUCHISTAS', 'sigla' => 'ALU', 'departamento_id' => 2, 'objeto' => '00-0989', 'naturaleza' => 'FUNDACION', 'domicilio_legal' => 'domicilio de ASOCIACION DE LUCHISTAS', 'estado' => 11, 'gobernacion_id' => 2,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-03', 'resolucion' => 9003, 'nombre_persona_colectiva' => 'MOVIMIENTO AL SOCIALISMO', 'sigla' => 'MAS', 'departamento_id' => 3, 'objeto' => '00-0990', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de MOVIMIENTO AL SOCIALISMO', 'estado' => 11, 'gobernacion_id' => 3,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-04', 'resolucion' => 9004, 'nombre_persona_colectiva' => 'FEDERACION DE ESCULTORES EN PIEDRA', 'sigla' => 'FEP', 'departamento_id' => 4, 'objeto' => '00-0991', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de FEDERACION DE ESCULTORES EN PIEDRA', 'estado' => 11, 'gobernacion_id' => 4,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-05', 'resolucion' => 9005, 'nombre_persona_colectiva' => 'ASOCIACION DE COMERCIALES', 'sigla' => 'ACC', 'departamento_id' => 5, 'objeto' => '00-0992', 'naturaleza' => 'ORGANIZACIÓN SOCIAL', 'domicilio_legal' => 'domicilio de ASOCIACION DE COMERCIALES', 'estado' => 11, 'gobernacion_id' => 5,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-06', 'resolucion' => 9006, 'nombre_persona_colectiva' => 'FEDERACION OBRERA ORUREÑA', 'sigla' => 'FOO', 'departamento_id' => 6, 'objeto' => '00-0993', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de FEDERACION OBRERA ORUREÑA', 'estado' => 11, 'gobernacion_id' => 6,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-07', 'resolucion' => 9007, 'nombre_persona_colectiva' => 'ORGANICACION DE CABILDEÑOS', 'sigla' => 'OCA', 'departamento_id' => 7, 'objeto' => '00-0994', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de ORGANICACION DE CABILDEÑOS', 'estado' => 11, 'gobernacion_id' => 7,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-08', 'resolucion' => 9008, 'nombre_persona_colectiva' => 'YUNGUEÑOS POR LA PAZ EN EL MUNDO', 'sigla' => 'YLPM', 'departamento_id' => 8, 'objeto' => '00-0995', 'naturaleza' => 'FUNDACION', 'domicilio_legal' => 'domicilio de YUNGUEÑOS POR LA PAZ EN EL MUNDO', 'estado' => 11, 'gobernacion_id' => 8,]);
        OtorgacionGobernacion::create(['fecha_resolucion' => '2022-01-09', 'resolucion' => 9009, 'nombre_persona_colectiva' => 'ESPORTADORES DE REFRESCOS EN BOLIVIA', 'sigla' => 'ERB', 'departamento_id' => 9, 'objeto' => '00-0996', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'domicilio_legal' => 'domicilio de ESPORTADORES DE REFRESCOS EN BOLIVIA', 'estado' => 11, 'gobernacion_id' => 9,]);
    }
}
