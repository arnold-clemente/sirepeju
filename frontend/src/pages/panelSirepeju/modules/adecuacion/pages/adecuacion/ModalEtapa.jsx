import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ModalSm from 'components/ModalSm'
import Loading from 'components/Loading';
import { show_alerta } from 'components/MessageAlert';
import ValidationError from 'components/ValidationError';


import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { createRegistroFinal } from 'api/adecuacionApi';

const ModalEtapa = ({ registrorModal, openRegistrorModal, closeRegistrorModal, registroFinal, handleInputChange }) => {

    const queryClient = useQueryClient();
    //para los errores de validacion
    const [errorval, serErrorval] = useState({});
    const [loading, setLoading] = useState(false);

    const { nota_interna_final, alfanumerico, numero_informe_final, fecha_envio } = registroFinal;

    const handleGuardar = (e) => {
        e.preventDefault();
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
                closeRegistrorModal();
                setLoading(true);
                addRegistroFinal.mutate(registroFinal)
            }

        });
    }

    const addRegistroFinal = useMutation({
        mutationFn: createRegistroFinal,
        onSuccess: (response) => {
            setLoading(false);
            console.log(response)
            if (response.status === true) {              
                serErrorval({});
                queryClient.invalidateQueries('adecuaciones')
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
            <ModalSm isOpen={registrorModal} closeModal={closeRegistrorModal} title={'ETAPA FINAL DE REGISTRO'}>
                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>CITE NOTA INTERNA FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="text" className='form-control' placeholder='Rellenar Campo'
                                name='nota_interna_final' value={nota_interna_final} onChange={handleInputChange} />
                            {errorval.nota_interna_final
                                ? <ValidationError text={errorval.nota_interna_final} />
                                : ''}
                        </div>
                    </div>

                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>NUMERO INFORME FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="text" className='form-control' placeholder='Rellenar Campo'
                                name='numero_informe_final' value={numero_informe_final} onChange={handleInputChange} />
                            {errorval.numero_informe_final
                                ? <ValidationError text={errorval.numero_informe_final} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>FECHA ENVIO: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="date" className='form-control' placeholder='Rellenar Campo'
                                name='fecha_envio' value={fecha_envio} onChange={handleInputChange} />
                            {errorval.fecha_envio
                                ? <ValidationError text={errorval.fecha_envio} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-4 px-0'>
                            <span className='font_span_input'>ALFANUMERICO: </span>
                        </div>
                        <div className='col-sm-8 px-0'>
                            <textarea rows="4" type="text" className='form-control' disabled
                                name='alfanumerico' value={alfanumerico} />
                            {errorval.alfanumerico
                                ? <ValidationError text={errorval.alfanumerico} />
                                : ''}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-4 pt-2'>
                        <button onClick={closeRegistrorModal} className='btn btn-danger'>Cancelar</button>
                        <button onClick={handleGuardar} className='btn btn-primary'>Guardar</button>
                    </div>
                </div>

            </ModalSm>
        </>

    )
}

export default ModalEtapa
