import React, { useState } from 'react'
import Loading from '../../components/Loading';
import { show_alerta } from '../../components/MessageAlert';
import ValidationError from '../../components/ValidationError';
import ModalMd from '../../components/ModalMd'

import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { createRegisroPersonaColectiva } from '../../api/otorgacionesApi';

const ModalPersonaOtorgacion = ({ persona, modalRegistro, openRegistrorModal, closeRegistrorModal }) => {
    const queryClient = useQueryClient();
    const [errorval, serErrorval] = useState({});
    const [loading, setLoading] = useState(false);

    const handleGuardarPersona = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        formData.append('otorgacion_id', persona.otorgacion_id)
        return console.log(formData)
        setLoading(true);
        closeRegistrorModal();
        addPersonaColectiva.mutate(formData)
    }

    const addPersonaColectiva = useMutation({
        mutationFn: createRegisroPersonaColectiva,
        onSuccess: (response) => {
            console.log(response)
            setLoading(false);
            if (response.status === true) {
                queryClient.invalidateQueries('otorgaciones')
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
            {/* modal para registro persona colectiva  */}
            <ModalMd isOpen={modalRegistro} closeModal={closeRegistrorModal} title={'REGISTRO PERSONA COLECTIVA'}>
                <form onSubmit={handleGuardarPersona} className='container-fluid' >
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>ESTATUTO ORGANICO: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='estatuto_organico' accept="application/pdf" />
                            {errorval.estatuto_organico
                                ? <ValidationError text={errorval.estatuto_organico} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>REGLAMENTO INTERNO: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='reglamento_interno' accept="application/pdf" />
                            {errorval.reglamento_interno
                                ? <ValidationError text={errorval.reglamento_interno} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>INFORME FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='informe_final' accept="application/pdf" />
                            {errorval.informe_final
                                ? <ValidationError text={errorval.informe_final} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>NOTA FINAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="file" className='form-control' placeholder='Rellenar Campo'
                                name='nota_final' accept="application/pdf" />
                            {errorval.nota_final
                                ? <ValidationError text={errorval.nota_final} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>N° RESOLUCION MINISTERIAL: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="text" className='form-control' placeholder='Rellenar Campo'
                                name='resolucion_ministerial' />
                            {errorval.resolucion_ministerial
                                ? <ValidationError text={errorval.resolucion_ministerial} />
                                : ''}
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <div className='col-sm-5 px-0'>
                            <span className='font_span_input'>FECHA RESOLUCION: </span>
                        </div>
                        <div className='col-sm-7 px-0'>
                            <input type="date" className='form-control' placeholder='Rellenar Campo'
                                name='fecha_resolucion' />
                            {errorval.fecha_resolucion
                                ? <ValidationError text={errorval.fecha_resolucion} />
                                : ''}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-4 pt-2'>
                        <button type='button' onClick={closeRegistrorModal} className='btn btn-danger'>Cancelar</button>
                        <button type='submit' className='btn btn-primary'>Guardar</button>
                    </div>
                </form>
            </ModalMd>
        </>
    )
}

export default ModalPersonaOtorgacion
