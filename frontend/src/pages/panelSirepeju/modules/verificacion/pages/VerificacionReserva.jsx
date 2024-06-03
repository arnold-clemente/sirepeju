import React, { useEffect, useState } from 'react'
import ModalDiv from 'components/ModalDiv';
import { useMutation } from 'react-query';

import { getReserva } from 'api/reservaApi';

import Spiner from 'components/Spiner';
import { estadoReserva, color_reserva } from './Estados';

const VerificacionReserva = ({ registro, modal, close }) => {

    const { reserva_id } = registro;
    const [cargando, setCargando] = useState(true)
    const [reserva, setReserva] = useState({
        id: 0,
        fecha_reg: "",
        hr: 0,
        entidad: "",
        sigla: "",
        persona_colectiva: "",
        nro_certificado: "",
        naturaleza: "",
        obs: "",
        fecha_entrega: "",
        representante: "",
        ci_rep: "",
        ext_ci_rep: "",
        telefono: "",
        correo: "",
        tipo: 1,
        estado: 3,
    })

    useEffect(() => {
        if (reserva_id != 0) {
            setCargando(true);
            showReserva.mutate(reserva_id);
        }
    }, [reserva_id]);

    const showReserva = useMutation({
        mutationFn: getReserva,
        onSuccess: (response) => {
            setReserva({ ...reserva, ...response });
            setCargando(false);
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'Detalle de la Reserva'}>
                {cargando
                    ? <Spiner />
                    : <>
                        <div className="card m-2">
                            <div className="card-header bg-success">
                                <h5 className='fw-bold text-center text-white'> {estadoReserva[reserva.estado]}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 fw-bold my-1">Entidad:</div>
                                    <div className="col-md-8 my-1">{reserva.entidad}</div>
                                    <div className="col-md-4 fw-bold my-1">Sigla:</div>
                                    <div className="col-md-8 my-1">{reserva.sigla}</div>
                                    <div className="col-md-4 fw-bold my-1">Representante Legal:</div>
                                    <div className="col-md-8 my-1">{reserva.representante}</div>
                                    <div className="col-md-4 fw-bold my-1">Nº Correlativo:</div>
                                    <div className="col-md-8 my-1">{reserva.nro_certificado}</div>
                                    <div className="col-md-4 fw-bold my-1">Naturaleza:</div>
                                    <div className="col-md-8 my-1">{reserva.naturaleza}</div>
                                </div>
                            </div>
                        </div>


                        <div className='d-flex'>
                            <button className="btn btn-secondary" title="cerrar" onClick={close}>cerrar</button>
                        </div>
                    </>
                }
            </ModalDiv>
        </>
    )
}

export default VerificacionReserva
