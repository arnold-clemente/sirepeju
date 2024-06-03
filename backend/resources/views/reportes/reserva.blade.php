<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Certificado de Recerva de Nombre</title>
</head>

<body>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            background-color: #FAFAFA;
            font: 20pt "Tahoma";
        }

        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        .page {
            width: 21cm;
            min-height: 27cm;
            padding: 2cm;
            margin: cm auto;
            border: 2px #D3D3D3 solid;
            border-radius: 1px;
            background: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .subpage {
            padding: 1cm;
            border: 5px red solid;
            height: 256mm;
            outline: 2cm #FFEAEA solid;
        }

        @page {
            margin-top: 3.5cm;
            margin-left: 1cm;
            margin-right: 1cm;
            margin-bottom: 1cm;
        }

        @media print {
            .page {
                margin: 100;
                border: initial;
                border-radius: initial;
                width: initial;
                min-height: initial;
                box-shadow: initial;
                background: initial;
                page-break-after: always;
            }
        }

        .clear-fix:after {
            content: ".";
            display: block;
            clear: both;
            visibility: hidden;
            line-height: 6;
            height: 7;
        }


        a {
            color: #66755d;
            text-decoration: underline;
        }

        body {
            position: relative;
            margin-left: 0.9cm;
            margin-right: 0.9cm;
            color: #020914;
            background: #FFFFFF;
            font-family: Arial, sans-serif;
            font-size: 10px;
            font-family: Arial;
        }

        header {
            padding: 5px 0px;
            margin-bottom: 50px 0px;
        }

        #logo {
            text-align: center;
            margin-bottom: 5px;
        }

        #logo img {
            width: 400px;
        }

        h1 {
            border-top: 4px solid #615d75;
            border-bottom: 4px solid #4c759e;
            color: #000000;
            font-size: 3em;
            line-height: 1.4em;
            font-weight: Arial;
            text-align: center;
            margin: 10px 10px 10px 10px;
        }

        h2 {
            border-top: 4px solid #615d75;
            border-bottom: 4px solid #4c759e;
            color: #000000;
            font-size: 3em;
            line-height:1em;
            font-weight: normal;
            text-align: center;
            margin: 10px 10px 10px 10px;
           background: url(img/logo.png);
        }
        h3{
            color: #050505;
            font-size: 2em;
            line-height: 1.3em;
            font-weight: normal;
            text-align: justify;
            margin: 10px 10px 10px 10px;
        }
        h4 {
            color: #050505;
            font-size: 1.5em;
            text-align: right;
           
        }
        h5 {
            color: #050505;
            font-size: 1em;
            text-align: justify; 
        }


        

        #project span {
            color: #5d7560;
            text-align: right;
            width: 100px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
        }


        #project div,
        #company div {
            white-space: nowrap;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 60px;
            margin-bottom: 20px;
        }

        table tr:nth-child(3n-1) td {
            background: #F5F5F5;
        }

        table th,
        table td {
            text-align: center;
        }

        table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;
            font-weight: normal;
        }

        table .service,
        table .desc {
            text-align: center;
        }

        table td {
            padding: 9px;
            text-align: center;
        }

        table td.service,
        table td.desc {
            vertical-align: top;
        }

        table td.unit {
            font-size: 100cm;
        }

        table td.qty,
        table td.total {
            font-size: 1.2em;
        }

        table td.grand {
            border-top: 5px solid #5D6975;
            ;
        }

        #notices .notice {
            color: #5D6975;
            font-size: 1.em;
        }

        footer {
            color: #0e0f0f;
            width: 100%;
            height: 30px;
            position: relative;
            bottom: 100px;
            padding: 1.8cm 0;
            text-align: center;
        }
    </style>

    <header class="clearfix">
        
        <h1><b>MINISTERIO DE LA PRESIDENCIA VICEMINISTERIO DE AUTONOMIAS</h1>
        <div>
            <div><h4> UNIDAD DE PERSONALIDADES JURIDICAS</h4></div>
           
        </div>
    </header>
       
    <div>
        <br>
    <h3> El Viceministerio de Autonomìas del Ministerio de la Presidencia con las atribuciones conferidas
            por el Artìculo 25 de Decreto Supremo Nº 4857 de 06 de enero de 2023 Otorga el Presente,
        </h3>
    </div>
    <div>
<h3><center><b>CERTIFICADO DE RESERVA DE NOMBRE<b> <br>
     a favor de la:</h3>
    </div>
    <main>
        <table>
            <thead>
                <tr>
                    <td colspan="5">
                        <h2>
                            <center><b>{{$registro->entidad}}</center>
                        </h2>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr><td colspan="5">
                    <h3>Al haberse verificado la inexistecia de la duplicidad de nombre en la Base de Datos del Viceministerio de Autonomìas y las remitidas por las entidades competentes, otorgàndole prelaciòn respecto a solicitudes posteriores, excepto de terceros que aleguen o justifiquen mejor derecho.</h3>
                </td></tr>
                <tr>
                    <td colspan="5">
                        <h5>Consiguientemente, la <b>{{$registro->entidad}},</b> <b>ENTIDAD SIN FINES DE
                                LUCRO </b>tiene el plazo de SESENTA (60) dìas habiles para iniciar
                            el tràmite de otorgaciòn de personalidad jurìdica,computables desde la fecha de emision
                            del presente certificado, caso contrario, este documento carecerà de validez legal
                            procedìendose a la eliminaciòn de la reserva de nombre del sistema, conforme lo dispuesto por
                            el artìculo 9 del decreto supremo N°1597, vigente a travès del Decreto Supremo N°4635 de 08
                            de diciembre de 2021.</h5>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <h4>La Paz, {{ $fecha}}</h4>
    </main>
    <div>HR: </div>
            <div>Numero Correlativo:09887</div>
            <div >AHRG/rif</div>
            <div >SIREPEJU V2.</div>

</body>
</html>
