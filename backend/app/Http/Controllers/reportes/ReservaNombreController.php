<?php

namespace App\Http\Controllers\reportes;

use App\Http\Controllers\Controller;
use App\Models\Registro;
use App\Models\Reservanombre;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ReservaNombreController extends Controller
{
    public function homonimia(Reservanombre $reserva_nombre)
    {
        $fecha = $reserva_nombre->fecha_entrega;
        $numeroDia = date('d', strtotime($fecha));
        $dia = date('l', strtotime($fecha));
        $mes = date('F', strtotime($fecha));
        $anio = date('Y', strtotime($fecha));

        $dias_ES = array("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
        $dias_EN = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        $nombredia = str_replace($dias_EN, $dias_ES, $dia);

        $meses_ES = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        $meses_EN = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        $nombreMes = str_replace($meses_EN, $meses_ES, $mes);

        // CONSULTAS
        $fecha_literal = $nombredia . " " . $numeroDia . " de " . $nombreMes . " de " . $anio;

        $nombre = $reserva_nombre->id . "_homonimia_" . $reserva_nombre->fecha_entrega;
        Pdf::setOptions(['dpi' => 150, 'defaultFont' => 'sans-serif']);
        $pdf = Pdf::setOptions(['isHtml5ParserEnabled' => true, 'isRemoteEnabled' => true])
            ->setPaper('letter', 'portrait')
            ->loadView('reportes.homonimia', [
                'reserva_nombre' => $reserva_nombre,
                'fecha' => $fecha_literal,
                'year' => $anio
            ]);
        return $pdf->stream($nombre);
    }

    public function reserva(Registro $registro)
    {
        $fecha = $registro->fecha_entrega;
        $numeroDia = date('d', strtotime($fecha));
        $dia = date('l', strtotime($fecha));
        $mes = date('F', strtotime($fecha));
        $anio = date('Y', strtotime($fecha));

        $dias_ES = array("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
        $dias_EN = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        $nombredia = str_replace($dias_EN, $dias_ES, $dia);

        $meses_ES = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        $meses_EN = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        $nombreMes = str_replace($meses_EN, $meses_ES, $mes);

        // CONSULTAS
        $fecha_literal = $nombredia . " " . $numeroDia . " de " . $nombreMes . " de " . $anio;

        $nombre = $registro->id . "_reserva nombre_" . $registro->fecha_entrega;
        Pdf::setOptions(['dpi' => 150, 'defaultFont' => 'sans-serif']);
        $pdf = Pdf::setOptions(['isHtml5ParserEnabled' => true, 'isRemoteEnabled' => true])
            ->setPaper('letter', 'portrait')
            ->loadView('reportes.reserva', [
                'registro' => $registro,
                'fecha' => $fecha_literal,
                'year' => $anio
            ]);
        return $pdf->stream($nombre);
    }
}
