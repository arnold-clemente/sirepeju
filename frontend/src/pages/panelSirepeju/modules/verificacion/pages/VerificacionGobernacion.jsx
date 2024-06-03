import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';

import Spiner from 'components/Spiner';
import ModalDiv from 'components/ModalDiv';
import { useModal } from 'hooks/useModal';

import { getOtorgacionGob } from 'api/otorgacionGobApi';
import { color_default, estadoOtorgacionGobernacion } from './Estados';

const VerificacionGobernacion = ({ registro, modal, close }) => {

    const { gobernacion_id } = registro;
    const [cargando, setCargando] = useState(true);
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
        if (gobernacion_id != 0) {
            setCargando(true);
            showOtorgacionGob.mutate(gobernacion_id);
        }

    }, [gobernacion_id]);

    const showOtorgacionGob = useMutation({
        mutationFn: getOtorgacionGob,
        onSuccess: (response) => {
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
            <ModalDiv isOpen={modal} closeModal={close} title={'Detalle de la Otorgación Gobernación'}>
                {cargando
                    ? <Spiner />
                    : <>
                    <div className="card m-2">
                        <div className="card-header bg-primary">
                            <h5 className="fw-bold text-center text-white">{estadoOtorgacionGobernacion[otorgacion.estado]}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row border-bottom">
                                <h5 className='fw-bold text-center'>{otorgacion.nombre_persona_colectiva}</h5>
                            </div>
                            <div className="row">
                                <div className="col-md-2 fw-bold">Sigla:</div>
                                <div className="col-md-2">{otorgacion.sigla}</div>
                                <div className="col-md-4 fw-bold">Resolución Administrativa Departamental:</div>
                                <div className="col-md-4">aqui un numero</div>
                            </div>
                        </div>
                    </div>
                        {fundadores.length > 0
                            ? <div>
                                        <div className='card mx-2'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <td colSpan={2} className='bg-success'>
                                                            <h5 className='fw-bold text-white text-center' >Miembros Fundadores</h5>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className='col'>Nombres</th>
                                                        <th className='col'>Cédula de Identidad</th>
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

export default VerificacionGobernacion
