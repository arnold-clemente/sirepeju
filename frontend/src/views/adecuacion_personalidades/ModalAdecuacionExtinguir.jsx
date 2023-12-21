import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ModalSm from '../../components/ModalSm'
import Loading from '../../components/Loading';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';


import { useMutation, useQueryClient } from 'react-query';
import { createExtinguida } from '../../api/adecuacionApi';

const ModalAdecuacionExtinguir = ({ registrorModal, openRegistrorModal, closeRegistrorModal, registro, handleInputExtinto}) => {
  const queryClient = useQueryClient();
  //para los errores de validacion
  const [errorval, serErrorval] = useState({});
  const [loading, setLoading] = useState(false);

  const { nota_extincion, fecha_extenion, observacion } = registro;

  const handleGuardar = (e) => {
      e.preventDefault()
      // return console.log(registro)
      Swal.fire({
          title: "Está seguro?",
          text: "Verifique los datos antes de enviar.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#009186",
          confirmButtonText: "Sí, estoy seguro!",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
              closeRegistrorModal()
              setLoading(true)
              addSeguimiento.mutate(registro)
          }

      });
  }

  const addSeguimiento = useMutation({
      mutationFn: createExtinguida,
      onSuccess: (response) => {
          setLoading(false);
          console.log(response)
          if (response.status === true) {
              serErrorval({});
              queryClient.invalidateQueries('personalidades_adecuacion')
              queryClient.invalidateQueries('adecuacion_extinguidas')
              show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
              setLoading(false);
          } else {
              show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
              serErrorval(response.errors);
              openRegistrorModal();
              setLoading(false);
          }
      },
      onError: (error) => {
          console.log(error)
          show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
          setLoading(false);
      }
  });

  return (
      <>
          {loading === true ? <Loading /> : ''}
          {/* modal para el etapa final de registro  */}
          <ModalSm isOpen={registrorModal} closeModal={closeRegistrorModal} title={'EXTINGUIR PERSONALIDAD'}>
              <div className='container-fluid'>
                  <div className='row mt-1'>
                      <div className='col-sm-5 px-0'>
                          <span className='font_span_input'>NOTA EXTINTO: </span>
                      </div>
                      <div className='col-sm-7 px-0'>
                          <input type="text" className='form-control' placeholder='N° DE NOTA'
                              name='nota_extincion' value={nota_extincion} onChange={handleInputExtinto} />
                          {errorval.nota_extincion
                              ? <ValidationError text={errorval.nota_extincion} />
                              : ''}
                      </div>
                  </div>
                  <div className='row mt-1'>
                      <div className='col-sm-5 px-0'>
                          <span className='font_span_input'>FECHA : </span>
                      </div>
                      <div className='col-sm-7 px-0'>
                          <input type="date" className='form-control' placeholder='Rellenar Campo'
                              name='fecha_extenion' value={fecha_extenion} onChange={handleInputExtinto} />
                          {errorval.fecha_extenion
                              ? <ValidationError text={errorval.fecha_extenion} />
                              : ''}
                      </div>
                  </div>
                  <div className='row mt-1'>
                      <div className='col-sm-4 px-0'>
                          <span className='font_span_input'>OBSERVACION: </span>
                      </div>
                      <div className='col-sm-8 px-0'>
                          <textarea rows="4" className='form-control' placeholder='Observacion de la revocatoria'
                              name='observacion' value={observacion} onChange={handleInputExtinto} />
                          {errorval.observacion
                              ? <ValidationError text={errorval.observacion} />
                              : ''}
                      </div>
                  </div>

                  <div className='d-flex justify-content-between mt-2'>
                      <button onClick={closeRegistrorModal} className='btn btn-danger'>Cancelar</button>
                      <button onClick={handleGuardar} className='btn btn-primary'>Guardar</button>
                  </div>
              </div>

          </ModalSm>
      </>
  )
}

export default ModalAdecuacionExtinguir
