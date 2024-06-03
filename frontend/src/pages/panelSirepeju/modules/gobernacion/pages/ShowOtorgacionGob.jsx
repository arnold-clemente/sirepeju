import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';
import RepOtoGob from './reporte/RepOtoGob';

import Spiner from 'components/Spiner';
import ModalDiv from 'components/ModalDiv';
import { useModal } from 'hooks/useModal';

import { getOtorgacionGob } from 'api/otorgacionGobApi';

const ShowOtorgacionGob = ({ registro, modal, close }) => {

  const { otorgacion_id } = registro;
  const [cargando, setCargando] = useState(true);
  const [imprimir, openImprimir, closeImprimir] = useModal();
  const [otorgacion, setOtorgacion] = useState({
    id: 0,
    nombre_persona_colectiva: '',
    sigla: '',
    resolucion: '',
    fecha_resolucion: '',
    miembros_fundador: '',
    objeto: '',
    naturaleza: '',
    domicilio_legal: '',
    tipo: 0,
    estado: 0,
    gobernacion_id: null,
    institucion_id: null,
    create: null,
    update: null,
    delete: null,
    created_at: '',
    updated_at: ''
  });
  const [fundadores, setFundadores] = useState([]);

  useEffect(() => {
    if (otorgacion_id != 0) {
      setCargando(true);
      showOtorgacionGob.mutate(otorgacion_id);
    }

  }, [otorgacion_id]);

  const showOtorgacionGob = useMutation({
    mutationFn: getOtorgacionGob,
    onSuccess: (response) => {
      console.log(response)
      const otorgacionResp = response.otorgacion;
      const fundadoresResp = response.fundadores;
      setOtorgacion({ ...otorgacion, ...otorgacionResp });
      //console.log(otorgacion);
      setFundadores(fundadoresResp);
      setCargando(false);
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
    },
  });


  return (
    <>
      <ModalDiv isOpen={modal} closeModal={close} title={'PERSONALIDADES JURÍDICAS OTORGADAS POR LOS GOBIERNOS AUTONÓMOS DEPARTAMENTALES'}>
        {cargando
          ? <Spiner />
          : <>
            <div className='container-fluid d-flex justify-content-end'>
              <RepOtoGob registro={otorgacion} fundadores={fundadores} modal={imprimir} close={closeImprimir} />
              <button onClick={openImprimir} className='button_print_show'>
                <i className="fa-solid fa-print"></i>
                <span>Imprimir reporte</span>
              </button>
            </div>
            <div className='container-fluid'>
              <div className="card m-2">
                <div className="card-header text-white bg-primary" >
                  <h5 className='fw-bold text-center'>{otorgacion.nombre_persona_colectiva}</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-5 fw-bold">
                    Sigla:
                    </div>
                    <div className="col-md-7">
                    {otorgacion.sigla}
                    </div>
                    <div className="col-md-5 fw-bold">
                    Resolución Administrativa Departamental:
                    </div>
                    <div className="col-md-7">
                   Aqui un número
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {fundadores.length > 0
              ? <div>
                    <div className='card mx-3'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th colSpan={2} className='bg-primary text-white text-center'>Miembros Fundadores</th>
                          </tr>
                          <tr>
                            <th className='col'><mark>Nombres</mark></th>
                            <th className='col'><mark>Cédula de Identidad</mark></th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                            return (
                              <tr key={fundador.id}>
                               
                                <td><>{fundador.nombre_completo}</></td>
                                <td><>{fundador.ci}</></td>
                              </tr>
                            )
                          })}

                        </tbody>
                      </table>
                    </div>
              </div>
              : null
            }
          </>
        }

      </ModalDiv>
    </>
  )
}

export default ShowOtorgacionGob
