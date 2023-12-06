import React, { useState } from 'react'
import ModalSm from '../../components/ModalSm'
import Loading from '../../components/Loading';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';


import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { createSeguimiento } from '../../api/adecuacionApi';

const ModalSeguimiento = ({ registrorModal, openRegistrorModal, closeRegistrorModal, registro, handleInputChange }) => {

    const queryClient = useQueryClient();
    //para los errores de validacion
    const [errorval, serErrorval] = useState({});
    const [loading, setLoading] = useState(false);

    const { seguimiento, fecha } = registro;

    const handleGuardar = (e) => {
        e.preventDefault()
        closeRegistrorModal()
        setLoading(true)
        // return console.log(registro)
        addSeguimiento.mutate(registro)
    }

    const addSeguimiento = useMutation({
        mutationFn: createSeguimiento,
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
            <ModalSm isOpen={registrorModal} closeModal={closeRegistrorModal} title={'INSERTAR SEGUIMIENTO'}>
                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>FECHA : </span>
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
                        <div className='col-sm-4 px-0'>
                            <span className='font_span_input'>SEGUIMIENTO: </span>
                        </div>
                        <div className='col-sm-8 px-0'>
                            <textarea rows="4" className='form-control' placeholder='Se realizo'
                                name='seguimiento' value={seguimiento} onChange={handleInputChange} />
                            {errorval.seguimiento
                                ? <ValidationError text={errorval.seguimiento} />
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

export default ModalSeguimiento
