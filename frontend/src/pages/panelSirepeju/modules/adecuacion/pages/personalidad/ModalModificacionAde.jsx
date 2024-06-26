import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ModalDiv from 'components/ModalMd';
import Loading from 'components/Loading';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';
import bcrypt from "bcryptjs-react";

import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { createModificacion } from 'api/modificacionAdecuacionApi';

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
    const encript = '$2a$10$CwTycUXWue0Thq9StjUM0u'
    const concatenar = 'MPJ - ' + codigo_modificacion;
    const alfanumerico_cript = bcrypt.hashSync(concatenar, encript)
    e.preventDefault();
    const enviar = {
      fecha: fecha,
      adecuacion_id: adecuacion_id,
      codigo_modificacion: 'MPJ - ' + codigo_modificacion,
      alfanumerico: alfanumerico_cript,
      personalidad_juridica: personalidad_juridica,
      domicilio_legal: domicilio_legal,
      miembros_fundador: miembros_fundador,
      seguimiento: seguimiento,
      cite_informe_preliminar: cite_informe_preliminar,
      user_id: user_id,
    };
    setLoading(true);
    close();
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
        addModificacion.mutate(enviar)
      }

    });
  }

  const addModificacion = useMutation({
    mutationFn: createModificacion,
    onSuccess: (response) => {
      console.log(response)
      setLoading(false);
      if (response.status === true) {
        queryClient.invalidateQueries('personalidades_adecuacion')
        queryClient.invalidateQueries('modificaciones_adecuacion')
        queryClient.invalidateQueries('modificaciones')
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
      <ModalDiv isOpen={modal} closeModal={close} title={'PROCESO DE MODIFICACIÓN'}>
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
                  <span className="input-group-text" id="basic-addon1">MPJ - </span>
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
