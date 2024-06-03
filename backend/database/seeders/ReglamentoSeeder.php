<?php

namespace Database\Seeders;

use App\Models\Reglamento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReglamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Reglamento::create([
            'nombre' => 'ENTIDADES CIVILES SIN FINES DE LUCRO',
            'descripcion' => 'SOLICITUD DE MODIFICACION DE ESTATUTO ORGANICO Y/O REGLAMENTO INTERNO',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/ECSL_MOD.pdf',
            'tramite_id' => 1
        ]);
        Reglamento::create([
            'nombre' => 'ESTATUTO ORGANICO MODIFICACION',
            'descripcion' => 'SOLICITUD DE MODIFICACION DE ESTATUTO ORGANICO Y/O REGLAMENTO INTERNO',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/FUNDACION_MODI.pdf',
            'tramite_id' => 1
        ]);
        Reglamento::create([
            'nombre' => 'ONG MODIFICACION',
            'descripcion' => 'SOLICITUD DE MODIFICACION DE ESTATUTO ORGANICO Y/O REGLAMENTO INTERNO',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/ONG_MODI.pdf',
            'tramite_id' => 1
        ]);
        Reglamento::create([
            'nombre' => 'ORGANIZACION SOCIAL MODIFICACION',
            'descripcion' => 'SOLICITUD DE MODIFICACION DE ESTATUTO ORGANICO Y/O REGLAMENTO INTERNO',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/FUNDACION_MODI.pdf',
            'tramite_id' => 1
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA RESERVA Y VERIFICACION DE NOMBRE',
            'descripcion' => 'ENTIDAD CIVIL SIN FINES DE LUCRO QUE NO CUENTA CON PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/1_formulario_entidad_civil_sin_fines_de_lucro_sin_personalidades_juridicas-departamentales.pdf',
            'tramite_id' => 2
        ]);
        Reglamento::create([
            'nombre' => 'Solicita Reserva y Verificación de Nombre',
            'descripcion' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA ENTIDAD CIVIL SIN FINES DE LUCRO',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/nota_entidad_civil_sin_fines_de_lucro_sin_personalidad_juridica-departamentales.pdf',
            'tramite_id' => 2
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA RESERVA Y VERIFICACION DE NOMBRE',
            'descripcion' => 'FUNDACION QUE NO CUENTAN CON PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/formulario.pdf',
            'tramite_id' => 3
        ]);
        Reglamento::create([
            'nombre' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA FUNDACION',
            'descripcion' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA FUNDACION',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/nota_reserva_de_nombre_para_fundacion.pdf',
            'tramite_id' => 3
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA RESERVA Y VERIFICACION DE NOMBRE',
            'descripcion' => 'ORGANIZACION NO GUBERNAMENTAL',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/formu.pdf',
            'tramite_id' => 4
        ]);
        Reglamento::create([
            'nombre' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA ONG',
            'descripcion' => 'ONG que no cuenta con Personalidad Jurídica',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/NOTA.pdf',
            'tramite_id' => 4
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA RESERVA Y VERIFICACION DE NOMBRE',
            'descripcion' => 'ORGANIZACIÓN SOCIAL QUE NO CUENTA CON PERSONALIDAD JURIDICA ',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/Formulario_org_social.pdf',
            'tramite_id' => 5
        ]);
        Reglamento::create([
            'nombre' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA ORGANIZACIÓN SOCIAL',
            'descripcion' => 'ORGANIZACIÓN SOCIAL que no cuenta con Personalidad Jurídica',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/nota_organizacion_social_sin_pers_juridica.pdf',
            'tramite_id' => 5
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA RESERVA Y VERIFICACION DE NOMBRE',
            'descripcion' => 'fundacion QUE CUENTA CON PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/formulario_fundacion.pdf',
            'tramite_id' => 6
        ]);

        Reglamento::create([
            'nombre' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA FUNDACIÓN',
            'descripcion' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA FUNDACIÓN',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/nota_fundacion.pdf',
            'tramite_id' => 6
        ]);
        Reglamento::create([
            'nombre' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA FUNDACIÓN',
            'descripcion' => 'SOLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA FUNDACIÓN',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/formulario21.pdf',
            'tramite_id' => 7
        ]);
        Reglamento::create([
            'nombre' => 'OLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA ONG',
            'descripcion' => 'OLICITUD DE RESERVA Y VERIFICACIÓN DE NOMBRE PARA ONG',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/nota_ong.pdf',
            'tramite_id' => 7
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'descripcion' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/ECSL_REQUISITOS.pdf',
            'tramite_id' => 8
        ]);
        Reglamento::create([
            'nombre' => 'FUNDACIONES (CONFORMADAS POR PERSONAS COLECTIVAS)',
            'descripcion' => 'FUNDACIONES (CONFORMADAS POR PERSONAS COLECTIVAS)',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/FUNDACION_REQUISITOS.pdf',
            'tramite_id' => 8
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'descripcion' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/ONG_REQUISITOS.pdf',
            'tramite_id' => 8
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'descripcion' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/ORGANIZACION _SOCIAL_REQUISITOS.pdf',
            'tramite_id' => 8
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'descripcion' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/Fundacion.pdf',
            'tramite_id' => 9
        ]);
        Reglamento::create([
            'nombre' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'descripcion' => 'FORMULARIO PARA SOLICITUD DE OTORGACION Y REGISTRO DE PERSONALIDAD JURIDICA',
            'fecha' => '2022/07/12',
            'archivo' => 'requisitos/ECSL_MOD.pdf',
            'tramite_id' => 9
        ]);
        
    }
}
