<?php

namespace Database\Seeders;

use App\Models\Adecuacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdecuacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Adecuacion::create([
            'personalidad_juridica' => 'ASOCIACION DE GOBERNADORES DE LA PAZ',
            'sigla' => 'AGLP',
            'representante' => 'CARLA CONDORI MAMANI',
            'ci_rep' => '12399324',
            'ext_ci_rep' => 'OR',
            'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO',
            'persona_colectiva' => 'PERSONA NATURAL',
            'fecha_ingreso_tramite' => '2023-01-01',
            'codigo_adecuacion' => 'APJ - 076',
            'domicilio_legal' => 'UBICADO EN LA CALLE CAMACHO S/N, EDIFICIO MARISCAL DE AYACUCHO, PISO 9 INTERIOR OFICINA Nº 106ENTRE LOAYZA DE LA CIUDAD DE LA PAZ',
            'objeto' => 'DEFENDER LA ASOCIACION DE GOBERNACIONES ANTE CUALQUIER RIESGO DE GOLPES DE O AMENDRENTAMIENTOS',
            'seguimiento' => 'REALIZO SEGUIMIENTO EN FECHA 02-01-23',
            'cite_informe_preliminar' => 'QUINTO INFORME P/ENTREGA 22/03/2023',
            'miembros_fundador' => 'sin asignar',
            'estado' => 7, 'administrativo_id' => 1
        ]);
        Adecuacion::create([
            'personalidad_juridica' => 'FEDERACION SHIMPAKU',
            'sigla' => 'FEDKU',
            'representante' => 'ROBIN MARQUEZ GUTIERREZ',
            'ci_rep' => '12399324',
            'ext_ci_rep' => 'LP',
            'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO',
            'persona_colectiva' => 'PERSONA NATURAL',
            'fecha_ingreso_tramite' => '2023-02-02',
            'codigo_adecuacion' => 'APJ - 077',
            'domicilio_legal' => 'AVENIDA 20 DE OCTUBRE N°2315 EDIFICIO MECHITA PISO 4 DE LA CIUDAD NUESTRA SEÑORA DE LA PAZ',
            'objeto' => 'MOTIVADOS POR LA DEFENSA DE LOS DEBILES',
            'seguimiento' => 'ENTREGARON SU SUBSANACION EN FECHA   02-01-24',
            'cite_informe_preliminar' => 'EN TRAMITE ',
            'miembros_fundador' => 'sin asignar',
            'estado' => 7,
            'administrativo_id' => 1
        ]);
        Adecuacion::create([
            'personalidad_juridica' => 'GRUPO RAGNAROK',
            'sigla' => 'GRK',
            'representante' => 'CADIA MAMANI QUISPE',
            'ci_rep' => '12399324',
            'ext_ci_rep' => 'CH',
            'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO',
            'persona_colectiva' => 'PERSONA NATURAL',
            'fecha_ingreso_tramite' => '2023-02-03',
            'codigo_adecuacion' => 'APJ - 078',
            'domicilio_legal' => 'CALLE GABRIEL RENE MORENO N°1223 PISO 3 OFICINA 1  ZONA SAN MIGUEL  DE LA CIUDAD DE LA PAZ',
            'objeto' => 'SOMOS UN GRUPO DE PELEADORES CALLEJEROS', 'seguimiento' => 'REALIZO SEGUIMIENTO EN FECHA            02-01-24',
            'cite_informe_preliminar' => 'SUBSANA OBSERVACIONES HR 26879 DE 14/07/24',
            'miembros_fundador' => 'sin asignar',
            'estado' => 7,
            'administrativo_id' => 1
        ]);
        Adecuacion::create([
            'personalidad_juridica' => 'ASOCIACION DE MUSICOS DE RAFAGA',
            'sigla' => 'AMR', 'representante' => 'LUIS ESPINAL CAMPOS',
            'ci_rep' => '12399324', 'ext_ci_rep' => 'TJ',
            'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO',
            'persona_colectiva' => 'PERSONA NATURAL',
            'fecha_ingreso_tramite' => '2023-03-04',
            'codigo_adecuacion' => 'APJ - 079',
            'domicilio_legal' => 'EN LA CIUDAD DE EL ALTO, ZONA JUANA AZURDUY DE PADILLA, CALLE TOTORA N° 1825 DEL DEPARTAMENTO DE LA PAZ',
            'objeto' => 'TENER UNA REPRESENTACIÓN DE LOS FOTÓGRAFOS DE CAMÉLIDOS EN ARTE TURÍSTICO, PARA MEJORAR LA CALIDAD DE VIDA A TRAVÉS DE PROYECTOS SOCIALES Y CULTURALES.',
            'seguimiento' => 'ENTREGARON SU SUBSANACION EN FECHA   02-01-25',
            'cite_informe_preliminar' => 'NOTA REITERATORIA DE OBSERVACIONES CUARTO INFORME NOTIFICADO 22/07/2022. SUBSANA OBSERVACIONES HR  24800 DE 30/06/2024',
            'miembros_fundador' => 'sin asignar',
            'estado' => 7,
            'administrativo_id' => 1
        ]);
        Adecuacion::create([
            'personalidad_juridica' => 'FUNDACION MANZANITAS ABIERTAS',
            'sigla' => 'FMA',
            'representante' => 'MARLENE MAMANI QUIROGA',
            'ci_rep' => '12399324',
            'ext_ci_rep' => 'PA',
            'naturaleza' => 'FUNDACION', 'persona_colectiva' => 'PERSONA NATURAL',
            'fecha_ingreso_tramite' => '2023-04-05',
            'codigo_adecuacion' => 'APJ - 080',
            'domicilio_legal' => 'CIUDAD DE LA PAZ, AVENIDA 6 DE AGOSTO NO. 2187',
            'objeto' => 'MOTIVADOS POR LA PLANTACION DE MAZANAS EN EL ORIENTE DEL PAIS',
            'seguimiento' => 'REALIZO SEGUIMIENTO EN FECHA            02-01-25',
            'cite_informe_preliminar' => 'INFORME FINAL',
            'miembros_fundador' => 'sin asignar',
            'estado' => 7,
            'administrativo_id' => 1
        ]);
    }
}
