<?php

namespace Database\Seeders;

use App\Models\ReservaOtorgacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SolicitudReservaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-01', 'hr' => 9001, 'entidad' => 'ASOCIACION DE LINGUISTAS DE BOLIVIA ', 'sigla' => 'ALB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-01', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'GREGORIO MARCELINO CALLISAYA APAZA', 'telefono' => '720090531', 'correo' => 'callisayagreg@yahoo.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'LP', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-02', 'hr' => 9002, 'entidad' => 'FUNDACION SPONSOR DEPORTIVO', 'sigla' => 'FUNDSPO', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-02', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'SERGIO PABLO SUAREZ ORIHUELA ', 'telefono' => '76204426', 'correo' => 'pablo@sponsor.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'OR', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-03', 'hr' => 9003, 'entidad' => 'SOCIEDAD BOLIVIANA DE FISIOTERAPIA INVASIVA Y AGENTES FISICOS ', 'sigla' => 'SOBOFIAF', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-03', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'CARLOS BUSTAMANTE FERNANDEZ ', 'telefono' => '71929347', 'correo' => 'sobofiaf@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PT', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-04', 'hr' => 9004, 'entidad' => 'ORGANIZACIÓN NACIONAL DE MEDICOS BOLIVIANOS GRADUADOS EN VENEZUELA', 'sigla' => 'ONAMEBG-VE', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-04', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'JUAN ZEGARRA LOPEZ', 'telefono' => '73256262', 'correo' => 'juancitomarx@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CB', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-05', 'hr' => 9005, 'entidad' => 'ASOCIACION NACIONAL DE NOTARIOS DE FE PUBLICA DEL ESTADO PLURNACIONAL ', 'sigla' => 'ANNFPEP', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-05', 'naturaleza' => 'ORGANIZACIÓN SOCIAL', 'obs' => 'sin observacion', 'representante' => 'ALBERTO RUBEN CASTRO ZILVETTY ', 'telefono' => '71578215', 'correo' => 'arczilvetty@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'SC', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-06', 'hr' => 9006, 'entidad' => 'CAMARA BOLIVIANA PANAMEÑA DE COMERCIO Y SERVICIOS ', 'sigla' => 'CABOLPAN ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-06', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'OSCAR AGUILAR ', 'telefono' => '69962368', 'correo' => 'decosbolivia@gmail.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'BN', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-07', 'hr' => 9007, 'entidad' => 'ASOCIACION DE COMERCIANTES DEL CARBON AL POR MAYOR "6 DE ENERO"', 'sigla' => 'ACCPM ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-07', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'DAVID MORALES QUEAPE ', 'telefono' => '72723815', 'correo' => 'devimor22360@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PA', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-08', 'hr' => 9008, 'entidad' => 'FUNDACION TRASCIENDE BOLIVIA ', 'sigla' => 'FTB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-08', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'PERCY LOTHER MEDRANO  SAAVEDRA', 'telefono' => '76181811', 'correo' => 'percymedrano@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'TJ', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-09', 'hr' => 9009, 'entidad' => 'FEDERACION UNICA BOLIVIANA DE TECNICOS EN MICROELECTRONICA', 'sigla' => 'FUBOTEM', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-09', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'DONATO LOPEZ MAMANI', 'telefono' => '730010101', 'correo' => 'drw_telo@hotmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CH', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-10', 'hr' => 9010, 'entidad' => 'FEDERACION BOLIVIANA DE PADRES, MADRES Y TUTORES DE PERSONAS CON DISCAPACIDAD INTELECTUAL', 'sigla' => 'FEBOLDI/MPTH', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-10', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'MARIA LUISA CHIPANA PAREDES ', 'telefono' => '70185152', 'correo' => 'dhinojosapaniagua@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'LP', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-11', 'hr' => 9011, 'entidad' => 'FONDO VERDE ', 'sigla' => 'FONDO VERDE', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-11', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'DAVID MIGUEL HINOJOSA PANIAGUA ', 'telefono' => '79700092', 'correo' => 'dhinojosapaniagua@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'OR', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-12', 'hr' => 9012, 'entidad' => 'FUNDACION BOLIVIA PARA EL MUNDO ', 'sigla' => 'FUNBOLPAMU', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-12', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'JAIME VELASCO ', 'telefono' => '70185152', 'correo' => 'lsalvatierra@farmaciachavez.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PT', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-13', 'hr' => 9013, 'entidad' => 'FUNDACION PLATAFORMAS 21F CONSTRUYENDO LA NUEVA BOLIVIA', 'sigla' => '21CONBO', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-13', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'OMAR MARTIN SANCHEZ VIRREIRA', 'telefono' => '77981485', 'correo' => 'omar_zono@hotmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CB', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-14', 'hr' => 9014, 'entidad' => 'ONG CAMINEMOS JUNTOS ', 'sigla' => 'CAMIJ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-14', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'GERMAN WILLYS FLORES SANCHEZ ', 'telefono' => '68646809', 'correo' => 'germanwillyssanchez@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'SC', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-15', 'hr' => 9015, 'entidad' => 'ASOCIACION BOLIVIANA DE ARTE MANUAL Y PINTURA DECORATIVA', 'sigla' => 'ABAMYP', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-15', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'WILMA RIOS RIVERA ', 'telefono' => '72578494', 'correo' => 'programa.hazlotu@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'BN', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-16', 'hr' => 9016, 'entidad' => 'ASOCIACION DE CADENA DE FARMACIAS ', 'sigla' => 'ACAF', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-16', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'MONICA FELICIDAD QUISPE LOBO', 'telefono' => '2799781', 'correo' => 'lsalvatierra@farmaciachavez.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PA', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-17', 'hr' => 9017, 'entidad' => 'FEDERACION BOLIVIANA DE WUSHU ', 'sigla' => 'FBW', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-17', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'FERNANDO VICTOR ZEBALLOS ', 'telefono' => '72511636', 'correo' => 'f.zeballos.gutierrez@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'TJ', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-18', 'hr' => 9018, 'entidad' => 'FUNDACION CLARA VISION BOLIVIA ', 'sigla' => 'FCVB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-18', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'SANDRA LILY CALVET ARANDIA ', 'telefono' => '70108670', 'correo' => 'calvetsandra@hotmail.es', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CH', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-19', 'hr' => 9019, 'entidad' => 'FUNDACION REVERDESER ', 'sigla' => 'REVERDESER', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-19', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'EDWIN POOL MARQUEZ PINTO ', 'telefono' => '69962368', 'correo' => 'decosbolivia@gmail.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'LP', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-20', 'hr' => 9020, 'entidad' => 'CAMARA NACIONAL DE TRANSPORTE DE HIDROCARBUROS ', 'sigla' => 'CNTH', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-20', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'JOSE FRANCISCO LOVERA TIÑINI ', 'telefono' => '4367047', 'correo' => 'decosbolivia@gmail.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'OR', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-21', 'hr' => 9021, 'entidad' => 'FUNDACION SOMOS VIDA', 'sigla' => 'FSV-BOL', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-21', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'JOSE LUIS CAMACHO MIJERENDINO ', 'telefono' => '70813504', 'correo' => 'vescalante@corporacionjuridica.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PT', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-22', 'hr' => 9022, 'entidad' => 'FUNDACION VIDA SEGURA', 'sigla' => 'FUNDVID', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-22', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'JOSE LUIS CAMACHO MISERENDINO', 'telefono' => '70813504', 'correo' => 'vescalante@corporacionjuridica.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CB', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-23', 'hr' => 9023, 'entidad' => 'FUNDACION COMPAÑERO DE VIDA', 'sigla' => 'FUNCDA', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-23', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'JOSE LUIS CAMACHO MISERENDINO', 'telefono' => '70813504', 'correo' => 'vescalante@corporacionjuridica.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'SC', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-24', 'hr' => 9024, 'entidad' => 'FUNDACION HEROE', 'sigla' => 'FUNDHE', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-24', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'RENATA BRAÑEZ VILLEGAS', 'telefono' => '77709492', 'correo' => 'rena.maye@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'BN', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-25', 'hr' => 9025, 'entidad' => 'UWC BOLIVIA ', 'sigla' => 'UWC BOLIVIA ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-25', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'LUIS FERNANDO MENDIETA ', 'telefono' => '68157274', 'correo' => 'giogismondi@yahoo.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PA', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-26', 'hr' => 9026, 'entidad' => 'CAMARA INTERNACIONAL DE MUJERES EMPRESARIAS DE BOLIVIA', 'sigla' => 'CIMEB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-26', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'ELIANA BERTON G.', 'telefono' => '78041086', 'correo' => 'salomon.eid@berkeley.edu', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'TJ', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-27', 'hr' => 9027, 'entidad' => 'ORGANIZACION DE SCOUTS TRADICIONALES DE BOLIVIA', 'sigla' => 'OSTB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-27', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'RAUL FEDERICO SAAVEDRA QUIROGA', 'telefono' => '68157274', 'correo' => 'nicolasvalverde@wayarabogados.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CH', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-28', 'hr' => 9028, 'entidad' => 'ONG INSTITUTO COOPERAZIONE ECONOMICA INTERNAZIONALE', 'sigla' => 'ICEI', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-28', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'CHRISTIAN ANDRES GONZALES CALLA', 'telefono' => '77742722', 'correo' => 'lucianolucchesi@icei.it', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'LP', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-29', 'hr' => 9029, 'entidad' => 'FUNDACION INSTITUTO MULTIDISCIPLINARIO PARA LAS DEMOCRACIAS', 'sigla' => 'FUNINT', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-29', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'SHIRLEY FRANCO RODRIGUEZ ', 'telefono' => '70732334', 'correo' => 'ordencapellanbolivia@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'OR', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-30', 'hr' => 9030, 'entidad' => 'ORDEN NACIONAL DE CAPELLANES DE BOLIVIA', 'sigla' => 'OCB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-30', 'naturaleza' => 'ORGANIZACIÓN SOCIAL', 'obs' => 'sin observacion', 'representante' => 'FRANCISCO SAMUEL BARBOSA DA SILVA', 'telefono' => '60522829', 'correo' => 'ordencapellanbolivia@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PT', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-08-31', 'hr' => 9031, 'entidad' => 'FUNDACION ESPACIO GENERACIONAL EDUCATIVO SOCIOCULTURAL ', 'sigla' => 'EGES', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-31', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'MARIBEL MARINA HUANCA ', 'telefono' => '60500077', 'correo' => 'espacioeges@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CB', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-01', 'hr' => 9032, 'entidad' => 'ASOCIACION DE EMPRENDEDORES DE BOLIVIA', 'sigla' => 'ASEB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-32', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'VICTOR FERNANDO ARMAZA PACHECO', 'telefono' => '77605382', 'correo' => 'salomon.eid@berkeley.edu', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'SC', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-02', 'hr' => 9033, 'entidad' => 'ASOCIACION IBEROAMERICANA DE DERECHO DEPORTIVO DE BOLIVIA', 'sigla' => 'AIDDBOL', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-33', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'JOHAN UDALRICO ZAMBRANA OVANDO', 'telefono' => '3350707', 'correo' => 'johan.zambrana@zambranaabogados.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'BN', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-03', 'hr' => 9034, 'entidad' => 'ONG JCI BOLIVIA ', 'sigla' => 'JCI ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-34', 'naturaleza' => 'ONG', 'obs' => 'sin observacion', 'representante' => 'MARIA BELEN GUERRA FLORES ', 'telefono' => '76400789', 'correo' => 'belguerra_23hotmail.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PA', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-04', 'hr' => 9035, 'entidad' => 'FUNDACION INNOVA', 'sigla' => 'FIN', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-35', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'APOLINAR POMA CHURATA', 'telefono' => '65168972', 'correo' => 'electronico:carmenconsultor@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'TJ', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-05', 'hr' => 9036, 'entidad' => 'FUNDACION CULTURAL ECOFUTURO', 'sigla' => 'FUNECO', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-36', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'GUSTAVO ALBERTO GARCIA UGARTE', 'telefono' => '73277626', 'correo' => 'rbalderrama@bancoecofuturo.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CH', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-06', 'hr' => 9037, 'entidad' => 'CAMARA BINACIONAL DE COMERCIO E INDUSTRIA BOLIVIANO PARAGUAYA ', 'sigla' => 'CABNA', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-37', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'MARIO ELISEO PAREDES VARGAS ', 'telefono' => '69962368', 'correo' => 'decosbolivia@gmail.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'LP', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-07', 'hr' => 9038, 'entidad' => 'FUNDACION ECO REGION AMAZONICA DE BOLIVIA', 'sigla' => 'FERA', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-38', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'MIGUEL ANGEL MENDOZA AGUILAR', 'telefono' => '73206794', 'correo' => 'mimundozz033@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'OR', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-08', 'hr' => 9039, 'entidad' => 'ASOCIACION DE PADRES DE NIÑOS CON CANCER ', 'sigla' => 'ASPANICC', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-39', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'PATRICIA OREIDA MENDOZA COLQUE', 'telefono' => '77209720', 'correo' => 'patriciaburgoa2019@yahoo.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PT', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-09', 'hr' => 9040, 'entidad' => 'CAMARA DE MUJERES EMPRESARIAS DE BOLIVIA ', 'sigla' => 'CAMEBOL ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-40', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'ANA GABRIELA MONTOYA SALINAS', 'telefono' => '75392901', 'correo' => 'camebolorg@gmail.com ', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CB', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-10', 'hr' => 9041, 'entidad' => 'UYWAY', 'sigla' => 'UTN', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-41', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'ILLA AYMA YURISA DITMEYER-MOREAU', 'telefono' => '67166606', 'correo' => 'illa.ditmeyermoreau@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'SC', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-11', 'hr' => 9042, 'entidad' => 'FUNDACION MUJERES DE PIE', 'sigla' => 'FUNDAPIE', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-42', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'ELIANA BURGOS CESPEDES', 'telefono' => '78521862', 'correo' => 'noni_impar@hotmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'BN', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-12', 'hr' => 9043, 'entidad' => 'ASOCIACION MEDICA DE BOLIVIA', 'sigla' => 'AMB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-43', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'WILBERTH BARRAL', 'telefono' => '68140068', 'correo' => 'asomedbol@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PA', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-13', 'hr' => 9044, 'entidad' => 'FEDERACION BOLIVIANA A VELA - SAILING BOL', 'sigla' => 'F.B.V. ', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-44', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'CESAR CASTRO CLAURE ', 'telefono' => '73286328', 'correo' => 'sailingbol77@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'TJ', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-14', 'hr' => 9045, 'entidad' => 'ASOCIACION BOLIVIANA DE ARQUITECTURA E INGENIERIA HOSPITALARIA', 'sigla' => 'ABAIH', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-45', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'FERNANDO DANIEL VILLAFUERTE PHILIPPSBORN', 'telefono' => '72061845', 'correo' => 'feruph@hotmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CH', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-15', 'hr' => 9046, 'entidad' => 'FUNDACION FOLSTER', 'sigla' => 'FUNF', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-46', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'LUIS FERRUFINO MIRANDA', 'telefono' => '78041086', 'correo' => 'feruph@hotmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'LP', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-16', 'hr' => 9047, 'entidad' => 'CAMARA BOLIVIANA DE COMERCIO ELECTRONICO Y STARTUPS', 'sigla' => 'CABOCES', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-47', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'ARIEL ZEBALLOS ALABY', 'telefono' => '75031300', 'correo' => 'sgantier@emba.com.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'OR', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-17', 'hr' => 9048, 'entidad' => 'ASOCIACION BOLIVIANA DE ARQUITECTOS, INGENIEROS Y ESPECIALISTAS HOSPITALARIOS', 'sigla' => 'ABAIEH', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-48', 'naturaleza' => 'ENTIDAD SIN FINES DE LUCRO', 'obs' => 'sin observacion', 'representante' => 'TED SILVER SARAVIA YUGARANI', 'telefono' => '70679125', 'correo' => 'tedsilver.sy@gmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'PT', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-18', 'hr' => 9049, 'entidad' => 'FUNDACION JOSE KENTENICHE ', 'sigla' => 'FJK', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-49', 'naturaleza' => 'FUNDACION', 'obs' => 'sin observacion', 'representante' => 'LUZ MARINA GUTIERREZ REGUERIN ', 'telefono' => '78112784', 'correo' => 'nicolasvalverde@wayarabogados.bo', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'CB', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-19', 'hr' => 9050, 'entidad' => 'ORGANIZACION DE RENTISTAS Y ADULTOS MAYORES DE BOLIVIA', 'sigla' => 'OREAM', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-50', 'naturaleza' => 'ORGANIZACIÓN SOCIAL', 'obs' => 'sin observacion', 'representante' => 'MARIO ANGEL DELGADO JIMENEZ', 'telefono' => '79623253', 'correo' => 'mardeljim@hotmail.com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'SC', 'administrativo_id' => 1,]);
        ReservaOtorgacion::create(['fecha_reg' => '2023-09-20', 'hr' => 9051, 'entidad' => 'COLEGIO DE GASTRONOMOS DE BOLIVIA', 'sigla' => 'CGB', 'persona_colectiva' => 'PERSONA NATURAL', 'nro_certificado' => '00-51', 'naturaleza' => 'ORGANIZACIÓN SOCIAL', 'obs' => 'sin observacion', 'representante' => 'PEDRO CADENA FLORES', 'telefono' => '73732926', 'correo' => 'colegiogastronomosbolivia@gmail,com', 'estado' => 1, 'ci_rep' => '1239926', 'ext_ci_rep' => 'BN', 'administrativo_id' => 1,]);
    
    }
}
