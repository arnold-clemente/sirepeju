import React, { useEffect, useState } from 'react'

import { useMutation } from 'react-query';

import Spiner from '../../components/Spiner';
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal';

import { getOtorgacionGob } from '../../api/otorgacionGobApi';
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
                         <div className='d-flex justify-content-center'>
                            <span className={color_default[otorgacion.estado] + ' white_modal estados_rounded'}>{estadoOtorgacionGobernacion[otorgacion.estado]}</span>
                        </div>
                        <div className='container-fluid'>
                            <h2 className='fs-6 text-center text-uppercase'>{otorgacion.nombre_persona_colectiva}</h2><div className='d-flex align-items-center'>
                                <h2 className='text-center font-weight-bold fs-6'><b>Sigla:</b>&emsp;{otorgacion.sigla}</h2>&emsp;&emsp;&emsp;
                                <h2 className='text-center font-weight-bold fs-6'><b>Resolución Administrativa Departamental:</b>&emsp;aqui un número</h2>

                            </div>
                        </div>

                        {fundadores.length > 0
                            ? <div>
                                <h2 className="fs-6"><b><center>Miembros Fundadores:</center></b>
                                    <center>
                                        <div className='d-flex'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th className='col'><mark>Nombres</mark></th>
                                                        <th className='col'><mark>Cedula de Identidad</mark></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                                                        return (
                                                            <tr key={fundador.id}>

                                                                <td><marker>{fundador.nombre_completo}</marker></td>
                                                                <td><marker>{fundador.ci}</marker></td>
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

export default VerificacionGobernacion
