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
        OtorgacionGobernacion::create(['miembros_fundador' => 'ARTURO  FERNANDEZ, HILDA MERCADO, DANIEL CORDOVA', 'fecha_resolucion' => '2022-01-01', 'resolucion' => 9001, 'nombre_persona_colectiva' => 'FEDERACION DE AUTO CONVOCADOS', 'sigla' => 'FAC', 'institucion_id' => 1, 'objeto' => '00-0988', 'naturaleza' => 'FUNDACION', 'domicilio_legal' => 'domicilio de la federacion de convocados', 'estado' => 1, 'gobernacion_id' => 1,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'CARMEN BEATRIZ RUIZ PARADA, DUNIA SANDOVAL ARENAS, MARC NESTOS ADRIEN DEVISSCHER LERUOU', 'fecha_resolucion' => '2022-01-02', 'resolucion' => 9002, 'nombre_persona_colectiva' => 'ASOCIACION DE LUCHISTAS', 'sigla' => 'ALU', 'institucion_id' => 2, 'objeto' => '00-0989', 'naturaleza' => 'FUNDACION', 'domicilio_legal' => 'domicilio de ASOCIACION DE LUCHISTAS', 'estado' => 1, 'gobernacion_id' => 2,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'LUISA FERNANDA RADA DE BELMONTE, EDUARDO HORACIO GARCIA CARDENA, GRECIA DENISE OLIVARES MARQUEZ  ', 'fecha_resolucion' => '2022-01-03', 'resolucion' => 9003, 'nombre_persona_colectiva' => 'MOVIMIENTO AL SOCIALISMO', 'sigla' => 'MAS', 'institucion_id' => 3, 'objeto' => '00-0990', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de MOVIMIENTO AL SOCIALISMO', 'estado' => 1, 'gobernacion_id' => 3,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'ALEJANDRO LEONARDO BLANCO VELASQUEZ, ALEJANDRO LEONARDO BLANCO VELASQUEZ', 'fecha_resolucion' => '2022-01-04', 'resolucion' => 9004, 'nombre_persona_colectiva' => 'FEDERACION DE ESCULTORES EN PIEDRA', 'sigla' => 'FEP', 'institucion_id' => 4, 'objeto' => '00-0991', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de FEDERACION DE ESCULTORES EN PIEDRA', 'estado' => 1, 'gobernacion_id' => 4,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'AIDA CABALLERO DE ALARCON PRESIDENTE, LUIS DORADO ROCA SECRETARIO GENERAL, EDUARDO ARCIENEGA SAAVEDRA TESORERO', 'fecha_resolucion' => '2022-01-05', 'resolucion' => 9005, 'nombre_persona_colectiva' => 'ASOCIACION DE COMERCIALES', 'sigla' => 'ACC', 'institucion_id' => 5, 'objeto' => '00-0992', 'naturaleza' => 'ORGANIZACIÓN SOCIAL', 'domicilio_legal' => 'domicilio de ASOCIACION DE COMERCIALES', 'estado' => 1, 'gobernacion_id' => 5,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'MARIA DE PILAR URIONA CRESPO, CARMEN NELLY DURAN MENDIA, GUSTAVO IGNACIO MEDEIROS URIOSTE', 'fecha_resolucion' => '2022-01-06', 'resolucion' => 9006, 'nombre_persona_colectiva' => 'FEDERACION OBRERA ORUREÑA', 'sigla' => 'FOO', 'institucion_id' => 6, 'objeto' => '00-0993', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de FEDERACION OBRERA ORUREÑA', 'estado' => 1, 'gobernacion_id' => 6,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'MIGUEL ANGEL HERRERO', 'fecha_resolucion' => '2022-01-07', 'resolucion' => 9007, 'nombre_persona_colectiva' => 'ORGANICACION DE CABILDEÑOS', 'sigla' => 'OCA', 'institucion_id' => 7, 'objeto' => '00-0994', 'naturaleza' => 'ONG', 'domicilio_legal' => 'domicilio de ORGANICACION DE CABILDEÑOS', 'estado' => 1, 'gobernacion_id' => 7,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'MARIO RAUL CABRERA RUIZ, ', 'fecha_resolucion' => '2022-01-08', 'resolucion' => 9008, 'nombre_persona_colectiva' => 'YUNGUEÑOS POR LA PAZ EN EL MUNDO', 'sigla' => 'YLPM', 'institucion_id' => 8, 'objeto' => '00-0995', 'naturaleza' => 'FUNDACION', 'domicilio_legal' => 'domicilio de YUNGUEÑOS POR LA PAZ EN EL MUNDO', 'estado' => 1, 'gobernacion_id' => 8,]);
        OtorgacionGobernacion::create(['miembros_fundador' => 'RENÉ EDUARDO CARDOZO CORTEZ, RAFAEL  GARCÍA  MORA, PATRICIA VARGAS DE DECKER', 'fecha_resolucion' => '2022-01-09', 'resolucion' => 9009, 'nombre_persona_colectiva' => 'ESPORTADORES DE REFRESCOS EN BOLIVIA', 'sigla' => 'ERB', 'institucion_id' => 9, 'objeto' => '00-0996', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'domicilio_legal' => 'domicilio de ESPORTADORES DE REFRESCOS EN BOLIVIA', 'estado' => 1, 'gobernacion_id' => 9,]);
    }
}
