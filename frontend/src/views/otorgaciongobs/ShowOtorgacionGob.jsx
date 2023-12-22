import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';
import RepOtoGob from './reporte/RepOtoGob';

import Spiner from '../../components/Spiner';
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal';

import { getOtorgacionGob } from '../../api/otorgacionGobApi';

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
      setFundadores(fundadoresResp);
      setCargando(false);
    },
    onError: (error) => {
      show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
    },
  });


  return (
    <>
      <ModalDiv isOpen={modal} closeModal={close} title={'Otorgacion Gobernacion'}>
        {cargando
          ? <Spiner />
          : <>
            <div className='container-fluid d-flex justify-content-end'>
              <RepOtoGob registro={otorgacion} fundadores={fundadores} modal={imprimir} close={closeImprimir} />
              <button onClick={openImprimir} className='button_print_show'>
                <i className="fa-solid fa-print"></i>
                <span>Imprimir</span>
              </button>
            </div>
            <div className='container-fluid'>
              <h1 className='fs-2 text-center text-uppercase'>{otorgacion.nombre_persona_colectiva}</h1><div className='d-flex align-items-center'>
                <h2 className='font-weight-bold fs-3'>Sigla:</h2>
                <h2 className='px-2 fs-3'>{otorgacion.sigla}</h2>
              </div>
            </div>

            {fundadores.length > 0
              ? <div>
                <h2 className="fs-6"><b>Miembros Fundadores:</b>
                  <center>
                    <div className='d-flex'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th className='col'>Nombres</th>
                            <th className='col'>Cedula Indentidad</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                            return (
                              <tr key={fundador.id}>
                                <td>{fundador.id}</td>
                                <td>{fundador.nombre_completo}</td>
                                <td>{fundador.ci}</td>
                              </tr>
                            )
                          })}

                        </tbody>
                      </table>
                    </div>
                  </center>
                </h2>
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
