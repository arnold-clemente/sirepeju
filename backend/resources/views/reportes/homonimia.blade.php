<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

</head>

<body>
    <style type="text/css">
        body {
            margin: 0
            font: 15pt "Arial";
            text-align: justify;
        }

        .page {
            width: 21cm;
            min-height: 27cm;
            padding: 1cm;
            margin: 1cm auto;
            border: 1px #D3D3D3 solid;
            background: white;
        }

        .subpage {
            padding: 1cm;
            border: 5px red solid;
            height: 256mm;
            outline: 2cm #FFEAEA solid;
        }

        @page {
            margin-top: 1cm;
            margin-left: 3cm;
            margin-right: 3cm;   
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
                text-align: justify;
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
            color: #0b0b0b;
            background: #FFFFFF;
            font-family: Arial;
            font-size: 14px;
            font-family: Arial;
            text-align: justify;
        }

        #logo {
            text-align: center;
            margin-bottom: 5px;
        }

        #logo img {
            width: 400px;
        }

       
        h2 {
            border-top: 2px solid #615d75;
            border-bottom: 2px solid #4c759e;
            color: #5D6975;
            font-size: 1em;
            line-height: 1em;
            font-weight: normal;
            text-align: right;
            background: url(img/dimension.png);
        }
        
        #project {
            float: right;
        }

        #project span {
            color: #5d7560;
            text-align: right;
            width: 100px;
            margin-right: 5x;
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
            border-spacing: 20px;
            margin-bottom: 20px;
        }

        table tr:nth-child(3n-1) td {
            background: #F5F5F5;
        }

        table th,
        table td {
            text-align: right;
        }

        table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;
            font-weight: normal;
        }

       
        #notices .notice {
            color: #5D6975;
            font-size: 4.em;
        }

        footer {
            color: #0e0f0f;
            width: 100%;
            position: relative;       
            text-align: center;
        }
    </style>
    <br><br>
    <header class="clearfix">
        <div id="logo">
            <img src="{{asset('image/logo.png')}}" alt="logo" />
        </div>
        <div id="project">
            <h3>La Paz, {{$fecha}}</h3>
        </div>

        <div id="company" class="clearfix">
            <div>
                <br><br>

                <h3>Señor:</h3>
            </div>
            <div>{{$reserva_nombre->representante}}</div>
            <div>CI N° 2972973 SC</div>
             <div>
                <h3>Presente.- </h3>
            </div>
        </div>
        <div id="project">
            <br>
            <h2>EN RESPUESTA A LA SOLICITUD DE RESERVA Y VERIFICACION DE NOMBRE</h2>
        </div>
    </header>
    <br><br><br><br>
    <div>
        <h3>De mi consideracion:</h3>
    </div>
    <main>

        <div>
                        El Decreto Supremo N° 1597 vigente por decreto supremo N° 4635 de 08 de diciembre de 2021 en
                            su Articulo 5 establece: (RESERVA Y VERIFICACION DE NOMBRE).
                            <br> I.- Toda persona colectiva, previo al tramite de otorgacion de personalidad juridica,
                            debera presentar la solicitud de reserva y verificacion de nombre a la Ministra o Ministro
                            de Autonomias, a fin de evitar su diplicidad. <br>
                            <br> II.- En caso de existir similitud con el nombrey/o sigla de una persona colectiva, el nombre
                            registrado goza de prelacion.
                        
                        En cumplimiento al marco juridico precedente y revisando la base de datos a nivel nacional y
                            departamental, encontramos que el nombre <b>'ONG JENECHERU'</b>
                            ya ha sido registrado y goza de prelacion, por lo que Ud. debera presentar un nuevo nombre
                            de la entidad que pretende constituir.
                        
        </div>           
        <div> Es cuanto informo para fines consiguientes.</div>
        <h3>Para efecto de notificacion, suscrito:</h3>
    </main>
    <table border="3">
        <tr>
            <td>Nombre y <br> Apellidos:</td>
            <td> </td>
            <td>Firma:</td><br>


        </tr>
        <tr>
            <td>N° de Cedula <br>de Identidad:</td>
            <td>........................................... </td>
            <td>Fecha:</td>
            <td>........................................... </td>


        </tr>
    </table>
    <footer>
        <br>
        <br>
        <br>
            <br>--------------------------------------------------------------------------------------------------------------------------------------------------------------<br>
            <h4><b>Casa Grande del Pueblo:</b> Zona Central, Calle Ayacucho - esq.Potosí, Telf: 2153845 La Paz-Bolivia
                <b>Personalidades Juridicas:</b> Sopocachi Av. Ecuador N°2186 Telefono 2110934
                www.presidencia.gob.bo upj@presidencia.gob.bo
    
            </h4>
        </p>
    </footer>
</body>

</html>