import React, { useState } from 'react'
import ModalDiv from '../../components/ModalMd';
import Loading from '../../components/Loading';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';

import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { createModificacion } from '../../api/modificacionAdecuacionApi';

const ModalModificacionAde = ({ registro, handleInputChange, modal, open, close }) => {
    const {
        fecha,
        adecuacion_id,
        codigo_modificacion,
        personalidad_juridica,
        estatuto_organico,
        reglamento_interno,
        domicilio_legal,
        miembros_fundador,
        seguimiento,
        cite_informe_preliminar,
        user_id,
      } = registro;
    
      const queryClient = useQueryClient();
      const [errorval, serErrorval] = useState({});
      const [loading, setLoading] = useState(false);
    
      const handleGuardar = (e) => {
        e.preventDefault();
        setLoading(true);
        close();
        addModificacion.mutate(registro)
      }
    
      const addModificacion = useMutation({
        mutationFn: createModificacion,
        onSuccess: (response) => {
          console.log(response)
          setLoading(false);
          if (response.status === true) {
            queryClient.invalidateQueries('personalidadesadecuacion')
            queryClient.invalidateQueries('personalidadesadecuacion')
            show_alerta('Actualizado con exito', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
            setLoading(false);
          } else {
            show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
            serErrorval(response.errors);
            open();
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
          <ModalDiv isOpen={modal} closeModal={close} title={'MODIFICACIÓN OTORGACION'}>
            <form onSubmit={handleGuardar} className='container-fluid' >
              <div className='row mt-1'>
                <div className='col-sm-5 px-0'>
                  <span className='font_span_input'>FECHA</span>
                </div>
                <div className='col-sm-7 px-0'>
                  <input type="date" className='form-control' placeholder='Rellenar Campo'
                    name='fecha' value={fecha} onChange={handleInputChange} />
                  {errorval.fecha
                    ? <ValidationError text={errorval.fecha} />
                    : ''}
                </div>
              </div>
              <div className='row mt-1'>
                <div className='col-sm-5 px-0'>
                  <span className='font_span_input'>CODIGO DE MODIFICACIÓN: </span>
                </div>
                <div className='col-sm-7 px-0'>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">APN - </span>
                    </div>
                    <input type="text" className='form-control' placeholder='Codigo de modificación'
                      name='codigo_modificacion' value={codigo_modificacion} onChange={handleInputChange} />
                    {errorval.codigo_modificacion
                      ? <ValidationError text={errorval.codigo_modificacion} />
                      : ''}
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-between mt-4 pt-2'>
                <button type='button' onClick={close} className='btn btn-danger'>Cancelar</button>
                <button type='submit' className='btn btn-primary'>Guardar</button>
              </div>
            </form>
          </ModalDiv>
        </>
      )
}

export default ModalModificacionAde
