import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAdministrativoDashboard } from '../../api/dashboardApi'

import Spiner from '../../components/Spiner';
import { show_alerta } from '../../components/MessageAlert';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const AdministrativoDashboard = () => {

    // ejemplo de char 
    var beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var midata = {
        labels: meses,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Beneficios',
                data: beneficios,
                tension: 0.5,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
            {
                label: 'Otra línea',
                data: [20, 25, 60, 65, 45]
            },
        ],
    };

    var misoptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: 'rgb(255, 99, 132)' }
            }
        }
    };


    // fin ejemoplode char 

    const [reservas, setReservas] = useState([]);
    const [otorgaciones, setOtorgaciones] = useState([]);
    const [adecuaciones, setAdecuaciones] = useState([]);
    const [gobernaciones, setGobernaciones] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(false);

    const tipos = ['Ninguno', 'Reserva', 'Otorgación', 'Adecuación', 'Otorgación Gobernación', 'Registros'];
    const permisos = useSelector(state => state.userStore.permisos)
    const color = ['color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'color_6', 'color_7', 'color_8']
    const icons_tipo = [
        'fa-solid fa-file-circle-question', //reserva
        'fa-solid fa-file-shield', //otorgacion
        'fa-solid fa-rectangle-ad', // adecuacion
        'fa-solid fa-file-arrow-up', //gobernacion
        'fa-solid fa-pen-to-square', //modificacion
        'fa-regular fa-bookmark', //registrados
    ]
    useEffect(() => {
        if (!loading) {
            getDashboard.mutate();
        }

    }, [loading])


    const getDashboard = useMutation({
        mutationFn: getAdministrativoDashboard,
        onSuccess: (response) => {
            setReservas(response.reservas);
            setOtorgaciones(response.otorgaciones)
            setAdecuaciones(response.adecuaciones)
            setGobernaciones(response.gobernaciones)
            setRegistros(response.registros)
            setLoading(true);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        }
    });

    const rutas_reserva = ['ninguno', '/reservas', '/reserva/homonimias', '/reserva/reservados', '/reserva/caducados']
    const estado_reserva = ['Ninguno', 'Solicitudes', 'Homonimias', 'Reservados', 'Caducados'];
    const icons_reserva = ['fa-solid fa-file-circle-question', 'fa-solid fa-ban', 'fa-regular fa-square-check', 'fa-solid fa-hourglass']
    const permisos_reserva = ['reservas.panel', 'reservas.solicitudes', 'reservas.homonimias', 'reservas.reservados', 'reservas.caducados']

    const color_personalidades = ['color_1', 'color_3', 'color_8', 'color_4', 'color_7', 'color_6', 'color_5', 'color_2']
    const rutas_otorgacion = ['ninguno', '/otorgaciones', '/otorgacion/archivados', '/otorgacion/caducados', '/otorgacion/personalidades-juridicas', '/otorgacion/revocados', '/otorgacion/extinguidas', '/otorgacion/modificaciones'];
    const estado_otorgacion = ['ninguno', 'En Tramite', 'Archivado', 'Caducado', 'Personalidades Juridicas', 'Revocados', 'Extinguidos', 'Modificaciones', 'Archivado Modificacion'];
    const icons_otorgacion = ['fa-solid fa-file-shield', 'fa-solid fa-box-archive', 'fa-solid fa-hourglass', 'fa-solid fa-file-contract', 'fa-solid fa-pen-to-square', 'fa-solid fa-ban', 'Otorgacion Extinguidas',];
    const permisos_otorgacion = ['otorgaciones.panel', 'otorgaciones', 'otorgaciones.archivados', 'otorgaciones.caducados', 'otorgaciones.personalidades', 'otorgaciones.revocatorias', 'otorgaciones.extinguidas', 'otorgaciones.modificaciones'];

    const rutas_adecuacion = ['ninguno', '/adecuaciones', '/adecuacion/archivados', '/adecuacion/caducados', '/adecuacion/personalidades', '/adecuacion/revocados', '/adecuacion/extinguidas', '/adecuacion/modificaciones'];
    const estado_adecuacion = ['ninguno', 'En Tramite', 'Archivado', 'Caducado', 'Personalidades Juridicas', 'Revocados', 'Extinguidos', 'Modificaciones', 'Archivado Modificacion'];
    const icons_adecuacion = ['fa-solid fa-file-shield', 'fa-solid fa-box-archive', 'fa-solid fa-hourglass', 'fa-solid fa-file-contract', 'fa-solid fa-pen-to-square', 'fa-solid fa-ban', 'Otorgacion Extinguidas',];
    const permisos_adecuacion = ['adecuaciones.panel', 'adecuaciones', 'adecuaciones.archivados', 'adecuaciones.caducados', 'adecuaciones.personalidades', 'adecuaciones.revocatorias', 'adecuaciones.extinguidas', 'adecuaciones.modificaciones'];

    // gobernaciones 
    const color_gobernacion = [
        'color_30', 'color_29', 'color_28', 'color_27', 'color_26', 'color_25', 'color_24', 'color_23', 'color_22', 'color_21',
        'color_20', 'color_19', 'color_28', 'color_17', 'color_16', 'color_15', 'color_14', 'color_13', 'color_12', 'color_11',
        'color_10', 'color_9', 'color_8', 'color_7', 'color_6', 'color_5', 'color_4', 'color_3', 'color_2', 'color_1'
    ]

    const icons_gobernacion = ['fa-solid fa-file-arrow-up'];

    return (
        <>
            {loading == false
                ? <Spiner />
                : <div className='sirepeju_dashboard my-2'>
                    <div className='dashboard_panel'>
                        {reservas.map((reserva, index) => {
                            return (
                                <div key={reserva.estado} className={color[index] + ' panel_result '}>
                                    <div className='panel_contenedor'>
                                        <div className='panel_letra'>
                                            <h1>{reserva.cantidad}</h1>
                                            <h3>{estado_reserva[reserva.estado]}</h3>
                                            <p>{tipos[reserva.tipo]}</p>
                                        </div>
                                        <div className='panel_icon'>
                                            <i className={icons_reserva[index]}></i>
                                        </div>
                                    </div>
                                    {permisos.includes(permisos_reserva[reserva.estado])
                                        ? <Link to={rutas_reserva[reserva.estado]} className='button_panel'>
                                            <span className='mx-2'>Más Informacion</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                        : <button className='button_panel'>
                                            <span className='mx-2'>Realizados</span>
                                        </button>
                                    }
                                </div>
                            )
                        })}

                        {otorgaciones.map((otorgacion, index) => {
                            return (
                                <div key={otorgacion.estado} className={color_personalidades[index] + ' panel_result '}>
                                    <div className='panel_contenedor'>
                                        <div className='panel_letra'>
                                            <h1>{otorgacion.cantidad}</h1>
                                            <h3>{estado_otorgacion[otorgacion.estado]}</h3>
                                            <p>{tipos[otorgacion.tipo]}</p>
                                        </div>
                                        <div className='panel_icon'>
                                            <i className={icons_otorgacion[index]}></i>
                                        </div>
                                    </div>
                                    {permisos.includes(permisos_otorgacion[otorgacion.estado])
                                        ? <Link to={rutas_otorgacion[otorgacion.estado]} className='button_panel'>
                                            <span className='mx-2'>Más Informacion</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                        : <button className='button_panel'>
                                            <span className='mx-2'>Realizados</span>
                                        </button>
                                    }
                                </div>
                            )
                        })}

                        {adecuaciones.map((adecuacion, index) => {
                            return (
                                <div key={adecuacion.estado} className={color_personalidades[index] + ' panel_result '}>
                                    <div className='panel_contenedor'>
                                        <div className='panel_letra'>
                                            <h1>{adecuacion.cantidad}</h1>
                                            <h3>{estado_adecuacion[adecuacion.estado]}</h3>
                                            <p>{tipos[adecuacion.tipo]}</p>
                                        </div>
                                        <div className='panel_icon'>
                                            <i className={icons_adecuacion[index]}></i>
                                        </div>
                                    </div>
                                    {permisos.includes(permisos_adecuacion[adecuacion.estado])
                                        ? <Link to={rutas_adecuacion[adecuacion.estado]} className='button_panel'>
                                            <span className='mx-2'>Más Informacion</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                        : <button className='button_panel'>
                                            <span className='mx-2'>Realizados</span>
                                        </button>
                                    }
                                </div>
                            )
                        })}

                        {gobernaciones.map((gobernacion, index) => {
                            return (
                                <div key={index} className={color_gobernacion[index] + ' panel_result '}>
                                    <div className='panel_contenedor'>
                                        <div className='panel_letra'>
                                            <h1>{gobernacion.cantidad}</h1>
                                            <h3>{gobernacion.departamento}</h3>
                                            <p>{gobernacion.institucion}</p>
                                        </div>
                                        <div className='panel_icon'>
                                            <i className='fa-solid fa-file-arrow-up'></i>
                                        </div>
                                    </div>
                                    {permisos.includes('otorgacion.gobernaciones')
                                        ? <Link to={'/otorgaciones-gobernaciones'} className='button_panel'>
                                            <span className='mx-2'>Más Informacion</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                        : <button className='button_panel'>
                                            <span className='mx-2'>Realizados</span>
                                        </button>
                                    }
                                </div>
                            )
                        })}




                    </div>
                </div>
            }
<Line data={midata} options={misoptions}/>
        </>
    )
}

export default AdministrativoDashboard
