import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';
import { getGobernacionDashboard } from 'api/dashboardApi'

import Spiner from 'components/Spiner';
import { show_alerta } from 'components/MessageAlert';

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
import { Link } from 'react-router-dom';

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

const PanelGobernacion = () => {
    const [years, setYears] = useState([]);

    // ejemplo de char 
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
    const [consulta, setConsulta] = useState(new Date().getFullYear());
    const [otorgaciones, setOtorgaciones] = useState([]);
    const [institucion, setInstitucion] = useState({});
    const [gobernacion, setGobernacion] = useState({});
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getDashboard.mutate(consulta);
      setLoading(false)
    }, [consulta]);
  
    const getDashboard = useMutation({
      mutationFn: getGobernacionDashboard,
      onSuccess: (response) => {
        setGobernacion(response.gobernacion)
        setOtorgaciones(response.otorgaciones)
        setInstitucion(response.institucion)
        setYears(response.year)
        setLoading(true);
      },
      onError: (error) => {
        show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
      }
    });
  
    // otorgacion
    let total_otorgacion = 0;
    let otorgacion_meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    otorgaciones.map((otorgacion) => {
      const meses_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const nulo = 0;
      total_otorgacion = total_otorgacion + otorgacion.cantidad
      if (meses_array.includes(otorgacion.mes)) {
        otorgacion_meses.splice((otorgacion.mes - 1), 1, otorgacion.cantidad);
      }
    })
  
    const handleInputChange = ({ target }) => {
      setConsulta(target.value)
    }
  
    const midata = {
      labels: meses,
      datasets: [ // Cada una de las líneas del gráfico
          {
              label: institucion.nombre,
              data: otorgacion_meses,
              tension: 0.5,
              fill: true,
              borderColor: '#17A2B8',
              pointRadius: 5,
              pointBorderColor: '#17A2B8',
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
  
  
    return (
      <>
        {loading == false
          ? <Spiner />
          : <>
            <div className='container-fuild row justify-content-center'>
              <div className="form-group col-md-6 py-2">
                <div className="form-group">
                  <label>Seleccionar Año</label>
                  <select className="form-control" id="exampleFormControlSelect1"
                    value={consulta} onChange={handleInputChange}>
                    <option value='' className='d-none'>SELECCIONAR</option>
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
                {/* otorgaciones  */}
                <div className={'color_1 panel_result'}>
                  <div className='panel_contenedor'>
                    <div className='panel_letra'>
                      <h1>{total_otorgacion}</h1>
                      <h3>{institucion.nombre}</h3>
                      <p>Gestión {consulta}</p>
                    </div>
                    <div className='panel_icon'>
                      <i className='fa-solid fa-file-circle-question'></i>
                    </div>
                  </div>
                  <Link to='/otorgaciones-gobernaciones' className='button_panel'>
                    <span className='mx-2'>Crear Nuevo</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className='container-fluid row'>
              <div className='col-12'>
                <Line data={midata} options={misoptions} />
              </div>
            </div>
            {/* <div className='container-fluid row align-items-center'>
                          <div className='col-md-12'>
                              <Bar data={mypie} />
                          </div>
                          <div className='col-md-12'>
                              <Pie data={mypie} />
                          </div>
                      </div> */}
          </>
        }
  
      </>
    )
}

export default PanelGobernacion
