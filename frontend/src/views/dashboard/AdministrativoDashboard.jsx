import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';
import { getAdministrativoDashboard } from '../../api/dashboardApi'

import Spiner from '../../components/Spiner';
import { show_alerta } from '../../components/MessageAlert';

import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
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
    ArcElement,
    BarElement,
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

    const [years, setYears] = useState([]);

    // const [years, setYears] = useState([
    //     2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    //     2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    //     2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029,
    //     2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039,
    // ]);

    // ejemplo de char 
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const [consulta, setConsulta] = useState(new Date().getFullYear());
    const [reservas, setReservas] = useState([]);
    const [otorgaciones, setOtorgaciones] = useState([]);
    const [adecuaciones, setAdecuaciones] = useState([]);
    const [gobernaciones, setGobernaciones] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getDashboard.mutate(consulta);
        setLoading(false)
    }, [consulta]);


    // reserva
    let total_reserva = 0;
    let reserva_meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    reservas.map((reserva) => {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const nulo = 0;
        total_reserva = total_reserva + reserva.cantidad;
        if (meses.includes(reserva.mes)) {
            reserva_meses.splice(reserva.mes - 1, 1, reserva.cantidad)
        }

    })

    // otorgacion
    let total_otorgacion = 0;
    let otorgacion_meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    otorgaciones.map((otorgacion) => {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const nulo = 0;
        total_otorgacion = total_otorgacion + otorgacion.cantidad
        if (meses.includes(otorgacion.mes)) {
            otorgacion_meses.splice(otorgacion.mes - 1, 1, otorgacion.cantidad)
        }

    })

    // adecuacion
    let total_adecuacion = 0;
    let adecuacion_meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    adecuaciones.map((adecuacion) => {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const nulo = 0;
        total_adecuacion = total_adecuacion + adecuacion.cantidad
        if (meses.includes(adecuacion.mes)) {
            adecuacion_meses.splice(adecuacion.mes - 1, 1, adecuacion.cantidad)
        }
    })

    // gobernacion
    let total_gobernacion = 0;
    let gobernacion_meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    gobernaciones.map((gobernacion) => {
        const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const nulo = 0;
        total_gobernacion = total_gobernacion + gobernacion.cantidad
        if (meses.includes(gobernacion.mes)) {
            gobernacion_meses.splice(gobernacion.mes - 1, 1, gobernacion.cantidad)
        }
    })

    const getDashboard = useMutation({
        mutationFn: getAdministrativoDashboard,
        onSuccess: (response) => {
            setReservas(response.reservas);
            setOtorgaciones(response.otorgaciones)
            setAdecuaciones(response.adecuaciones)
            setGobernaciones(response.gobernaciones)
            setYears(response.year)
            setLoading(true);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        }
    });

    // para el grafico 

    const midata = {
        labels: meses,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Reserva',
                data: reserva_meses,
                tension: 0.5,
                fill: true,
                borderColor: '#17A2B8',
                pointRadius: 5,
                pointBorderColor: '#17A2B8',
            },
            {
                label: 'Otorgación',
                data: otorgacion_meses,
                tension: 0.5,
                fill: true,
                borderColor: '#4c00c5',
                pointRadius: 5,
                pointBorderColor: '#4c00c5',
            },
            {
                label: 'Adecuación',
                data: adecuacion_meses,
                tension: 0.5,
                fill: true,
                borderColor: '#FFC107',
                pointRadius: 5,
                pointBorderColor: '#FFC107',
            },
            {
                label: 'Gobernaciones',
                data: gobernacion_meses,
                tension: 0.5,
                fill: true,
                borderColor: '#d95903',
                pointRadius: 5,
                pointBorderColor: '#d95903',
            },
        ],
    };

    const misoptions = {
        scales: {
            y: {
                min: 0
            },
            x: {
                ticks: { color: '#181818' }
            }
        }
    };

    const mypie = {
        labels: ['Reservas', 'Otorgaciones', 'Adecuaciones', 'Gobernaciones'],
        datasets: [
            {
                label: 'Totales de Gestión',
                data: [total_reserva, total_otorgacion, total_adecuacion, total_gobernacion],
                backgroundColor: [
                    '#6dcbda9c',
                    '#6825d4bb',
                    '#fdd048e7',
                    '#da712cc7',
                ],
                borderColor: [
                    '#17A2B8',
                    '#4c00c5',
                    '#FFC107',
                    '#d95903',
                ],
                borderWidth: 1,
            },
        ],
    }

    const handleInputChange = ({ target }) => {
        setConsulta(target.value)
    }

    return (
        <>
            <div className='container-fuild row justify-content-center'>
                <div className="form-group col-md-6 py-2">
                    <div className="form-group">
                        <label>Seleccionar Año</label>
                        <select className="form-control" id="exampleFormControlSelect1"
                            value={consulta} onChange={handleInputChange}>
                                <option className='d-none' value={''}>SELECCIONAR AÑO</option>
                            {years.map((year, index) => {
                                return (
                                    <option key={index} value={year}>{year}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className='sirepeju_dashboard my-2'>
                <div className='dashboard_panel'>
                    {/* reservas  */}
                    <div className={'color_1 panel_result'}>
                        <div className='panel_contenedor'>
                            <div className='panel_letra'>
                                <h1>{total_reserva}</h1>
                                <h3>Reservas Totales</h3>
                                <p>Gestión {consulta}</p>
                            </div>
                            <div className='panel_icon'>
                                <i className='fa-solid fa-file-circle-question'></i>
                            </div>
                        </div>
                        {/* <button className='button_panel'>
                                    <span className='mx-2'>Ver Detalles</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button> */}
                    </div>
                    {/* otorgaciones  */}
                    <div className={'color_4 panel_result'}>
                        <div className='panel_contenedor'>
                            <div className='panel_letra'>
                                <h1>{total_otorgacion}</h1>
                                <h3>Otorgaciones Totales</h3>
                                <p>Gestión {consulta}</p>
                            </div>
                            <div className='panel_icon'>
                                <i className='fa-solid fa-file-shield'></i>
                            </div>
                        </div>
                        {/* <button className='button_panel'>
                                    <span className='mx-2'>Ver Detalles</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button> */}
                    </div>
                    {/* adecuaciones  */}
                    <div className={'color_3 panel_result'}>
                        <div className='panel_contenedor'>
                            <div className='panel_letra'>
                                <h1>{total_adecuacion}</h1>
                                <h3>Adecuaciones Totales</h3>
                                <p>Gestión {consulta}</p>
                            </div>
                            <div className='panel_icon'>
                                <i className='fa-solid fa-rectangle-ad'></i>
                            </div>
                        </div>
                        {/* <button className='button_panel'>
                                    <span className='mx-2'>Ver Detalles</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button> */}
                    </div>
                    {/* gobernaciones  */}
                    <div className={'color_7 panel_result'}>
                        <div className='panel_contenedor'>
                            <div className='panel_letra'>
                                <h1>{total_gobernacion}</h1>
                                <h3>Gobenaciones Totales</h3>
                                <p>Gestión {consulta}</p>
                            </div>
                            <div className='panel_icon'>
                                <i className='fa-solid fa-file-arrow-up'></i>
                            </div>
                        </div>
                        {/* <button className='button_panel'>
                                    <span className='mx-2'>Ver Detalles</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button> */}
                    </div>
                </div>
            </div>
            {loading == false
                ? <Spiner />
                : <><div className='container-fluid row'>
                    <div className='col-12'>
                        <Line data={midata} options={misoptions} />
                    </div>
                </div>
                    <div className='container-fluid row align-items-center'>
                        <div className='col-md-12'>
                            <Bar data={mypie} />
                        </div>
                        <div className='col-md-12'>
                            <Pie data={mypie} />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default AdministrativoDashboard
