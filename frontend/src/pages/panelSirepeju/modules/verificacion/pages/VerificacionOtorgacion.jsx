import React, { useEffect, useState } from 'react'
import { useModal } from 'hooks/useModal';
import ModalDiv from 'components/ModalDiv';

import ViewPdf from 'components/ViewPdf';

import { useMutation } from 'react-query';
import { getOtorgacion } from 'api/otorgacionesApi';
import Spiner from 'components/Spiner';
import { color_otorgacion, estadoOtorgacion } from './Estados';

const VerificacionOtorgacion = ({ registro, modal, close }) => {

    const { otorgacion_id } = registro;

    const [modalNota, openNota, closeNota] = useModal(false);
    const [modalEstatuto, openEstatuto, closeEstatuto] = useModal(false);
    const [modalReglamento, openReglamento, closeReglamento] = useModal(false);
    const [modalInforme, openInforme, closeInforme] = useModal(false);

    const [cargando, setCargando] = useState(true);
    const [otorgacion, setOtorgacion] = useState({
        id: 0,
        personalidad_juridica: '',
        sigla: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: '',
        naturaleza: '',
        persona_colectiva: '',
        fecha_ingreso_tramite: '',
        codigo_otorgacion: '',
        domicilio_legal: '',
        objeto: '',
        seguimiento: '',
        cite_informe_preliminar: '',
        miembros_fundador: '',
        nota_interna_final: '',
        numero_informe_final: '',
        fecha_envio: '',
        alfanumerico: '',
        nota_revocatorio: null,
        fecha_revocatoria: null,
        observacion: null,
        estado: 0,
        registro_id: 0,
        administrativo_id: 0,
        created_at: '',
        updated_at: '',
    });
    const [personalidad, setPersonalidad] = useState({});
    const [fundadores, setFundadores] = useState([]);

    useEffect(() => {
        if (otorgacion_id != 0) {
            setCargando(true);
            showOtorgacion.mutate(otorgacion_id);
        }
    }, [otorgacion_id])

    const showOtorgacion = useMutation({
        mutationFn: getOtorgacion,
        onSuccess: (response) => {
            const otorgacionResp = response.otorgacion;
            const personalidadResp = response.personalidad;
            const fundadoresResp = response.fundadores;
            setOtorgacion({ ...otorgacion, ...otorgacionResp });
            setPersonalidad(personalidadResp);
            setFundadores(fundadoresResp);
            setCargando(false);
        },
        onError: (error) => {
            console.log(error)
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'Detalle de la Otorgación'}>
                {cargando
                    ? <Spiner />
                    : <>
                        <div className="card m-2">
                            <div className="card-header bg-success text-center text-white fw-bold">
                                {estadoOtorgacion[otorgacion.estado]}
                            </div>
                            <div className="card-body">
                                <div className="row border-bottom">
                                    <div className="col-md-12">
                                        <h5 className='fw-bold text-center'>{otorgacion.personalidad_juridica}</h5>
                                    </div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-md-3 my-1 fw-bold">Código:</div>
                                    <div className='col-md-3 my-1'>{otorgacion.codigo_otorgacion}</div>
                                    <div className="col-md-3 my-1 fw-bold">Naturaleza:</div>
                                    <div className="col-md-3 my-1">{otorgacion.naturaleza}</div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-md-3 my-1 fw-bold">Tipo de Persona Colectiva:</div>
                                    <div className='col-md-3 my-1'>{otorgacion.codigo_otorgacion}</div>
                                    <div className="col-md-3 my-1 fw-bold">Sigla:</div>
                                    <div className="col-md-3 my-1">{otorgacion.sigla}</div>
                                </div>
                                <div className="row border-bottom">
                                    <div className="col-md-3 my-1 fw-bold">Domicilio Legal:</div>
                                    <div className='col-md-9 my-1'>{otorgacion.domicilio_legal}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 my-1 fw-bold">Objeto:</div>
                                    <div className='col-md-10 my-1'>{otorgacion.objeto}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card mx-2">
                            {otorgacion.estado == 0
                                ? (<div className='container-fluid '>
                                    <div className='row'>
                                        <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                                        <div className='col-md-9'><span>{otorgacion.observacion}</span></div>
                                    </div>
                                </div>)
                                : ''
                            }

                            {personalidad
                                ? <>
                                    <div className='container-fluid d-flex justify-content-between my-4'>
                                        <button className='btn btn-success' onClick={openEstatuto} >
                                            Estatuto Organico
                                        </button>
                                        <button className='btn btn-success' onClick={openReglamento} >
                                            Reglamento Interno
                                        </button>
                                        <button className='btn btn-success' onClick={openInforme} >
                                            Informe Final
                                        </button>
                                        <button className='btn btn-success' onClick={openNota} >
                                            Nota FInal
                                        </button>
                                    </div>
                                    <ViewPdf resource={personalidad.estatuto_organico} modal={modalEstatuto} close={closeEstatuto} />
                                    <ViewPdf resource={personalidad.reglamento_interno} modal={modalReglamento} close={closeReglamento} />
                                    <ViewPdf resource={personalidad.informe_final} modal={modalInforme} close={closeInforme} />
                                    <ViewPdf resource={personalidad.nota_final} modal={modalNota} close={closeNota} />
                                </>
                                : null
                            }

                            {fundadores.length > 0
                                ? <div>
                                            <div className='d-flex'>
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={2} className='bg-primary text-white text-center'>
                                                             Miembros Fundadores
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th className='col'>Nombres</th>
                                                            <th className='col'>Cédula Identidad</th>
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

                        </div>
                    </>
                }
            </ModalDiv>
        </>
    )
}

export default VerificacionOtorgacion
