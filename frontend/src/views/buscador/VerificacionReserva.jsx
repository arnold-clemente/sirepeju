import React, { useEffect, useState } from 'react'
import ModalDiv from '../../components/ModalDiv';
import { useMutation } from 'react-query';

import { getReserva } from '../../api/reservaApi';

import Spiner from '../../components/Spiner';
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
                        <div className='d-flex justify-content-center'>
                            <span className={color_reserva[reserva.estado] + ' white_modal estados_rounded'}>{estadoReserva[reserva.estado]}</span>
                        </div>
                        <div className="container-fluid">
                            <h2 className="fs-6"><b>Entidad:</b>&nbsp;&nbsp;{reserva.entidad}</h2> <hr />
                            <h2 className="fs-6"><b>Sigla:</b>&nbsp;&nbsp;{reserva.sigla}</h2> <hr />
                            <h2 className="fs-6"><b>Representante legal:</b>&nbsp;&nbsp; {reserva.representante}<b>&nbsp;&nbsp;&nbsp;CI:</b>9999</h2> <hr />
                            <h2 className="fs-6"><b>Nº Correlativo:</b> &nbsp;&nbsp;{reserva.nro_certificado}</h2><hr />
                            <h2 className="fs-6"><b>Naturaleza:</b> &nbsp;&nbsp;{reserva.naturaleza}</h2>
                        </div>
                        <hr />
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
