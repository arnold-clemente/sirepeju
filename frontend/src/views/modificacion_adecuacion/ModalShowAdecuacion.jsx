import React, { useEffect, useState } from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from '../../hooks/useModal'
import Alfanumerico from '../adecuacion/reporte/AdecuacionAlfanumerico';
import RepModificacionAdecuacion from './reporte/RepModificacionAdecuacion';

import { useMutation } from 'react-query';
import { getAdecuacion } from '../../api/adecuacionApi';
import ViewPdf from '../../components/ViewPdf';

const ModalShowAdecuacion = ({ registro, modalRegistro, closeRegistro }) => {
    // para el modal de reporte de
    const [modalAlfanumerico, openAlfanumerico, closeAlfanumerico] = useModal(false);
    const [modalEstatuto, openEstatuto, closeEstatuto] = useModal(false);
    const [modalReglamento, openReglamento, closeReglamento] = useModal(false);
    const [modalInforme, openInforme, closeInforme] = useModal(false);
    const [modalpdf, openModalpdf, closeModalpdf] = useModal(false);
    const [modalNota, openNota, closeNota] = useModal(false);
    const [cargando, setCargando] = useState(false);
    const [adecuacion, setAdecuacion] = useState({
        id: 0,
        personalidad_juridica: '',
        sigla: '',
        representante: '',
        ci_rep: '',
        ext_ci_rep: '',
        naturaleza: '',
        persona_colectiva: '',
        fecha_ingreso_tramite: '',
        codigo_adecuacion: '',
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
    const [personalidad, setPersonalidad] = useState({
        id: 0,
        estatuto_organico: '',
        reglamento_interno: '',
        informe_final: '',
        nota_final: '',
        resolucion_ministerial: '',
        fecha_resolucion: '',
        adecuacion_id: 0,
        created_at: '',
        updated_at: '',
    });
    const [fundadores, setFundadores] = useState([]);

    const { id } = registro;

    useEffect(() => {
        if (id != 0) {
            setCargando(true);
            showAdecuacion.mutate(id);
        }
    }, [id])

    const showAdecuacion = useMutation({
        mutationFn: getAdecuacion,
        onSuccess: (response) => {
            const adecuacionResp = response.adecuacion;
            const personalidadResp = response.personalidad;
            const fundadoresResp = response.fundadores;
            setAdecuacion({ ...adecuacion, ...adecuacionResp });
            setPersonalidad({ ...personalidad, ...personalidadResp });
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
            <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'TRÁMITES DE ADECUACIÓN ETAPA DE MODIFICACIÓN '}>
                {!cargando
                    ? (<div className="container-fluid">
                        <h2 className='text-center fs-4'>{adecuacion.personalidad_juridica} </h2>
                        {/* para el modal de pdf de alfanumerico  */}
                        <div className='container-fluid d-flex justify-content-end gap-1'>
                            {adecuacion.alfanumerico
                                ? <>
                                    <button className='btn btn-danger' onClick={openAlfanumerico} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Imprimir Alfanúmerico</span>
                                    </button>
                                    <div className='absolute'>
                                        <Alfanumerico registro={adecuacion} modal={modalAlfanumerico} close={closeAlfanumerico} />
                                    </div>
                                </>
                                : null
                            }
                            {adecuacion.id != 0
                                ? <>
                                    <button className='btn btn-success' onClick={openModalpdf} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Imprimir reporte</span>
                                    </button>
                                    <div className='absolute'>
                                        <RepModificacionAdecuacion modal={modalpdf} close={closeModalpdf}
                                            adecuacion={adecuacion} personalidad={personalidad} fundadores={fundadores} />
                                    </div>
                                </>
                                : null
                            }
                        </div>

                        <h2 className="fs-6"><b>Código:</b> {adecuacion.codigo_adecuacion} &emsp;&emsp;&emsp;<b>Naturaleza:</b> {adecuacion.naturaleza}</h2> <hr />
                        <h2 className="fs-6"><b>Tipo de Persona Colectiva:</b>&emsp;{adecuacion.persona_colectiva}&emsp;&emsp;&emsp; <b>Sigla:</b> {adecuacion.sigla}</h2> <hr />
                        <h2 className="fs-6"><b>Domicilio Legal: </b>{adecuacion.domicilio_legal}</h2> <hr />
                        <h2 className="fs-6"><b>Objeto: <p><mark>{adecuacion.objeto}</mark></p></b></h2><hr />


                        {adecuacion.estado == 0
                            ? (<div className='container-fluid '>
                                <div className='row'>
                                    <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                                    <div className='col-md-9'><span>{adecuacion.observacion}</span></div>
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
                                <h2><b><center>Miembros Fundadores:</center></b>
                                    <center>
                                        <div className='d-flex'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        
                                                        <th className='col'>Nombres</th>
                                                        <th className='col'>Cedula Indentidad</th>
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


                    </div>)
                    : <div className='spiner_content'><span className='loader_spiner'></span></div>
                }

            </ModalDiv >
        </>
    )
}

export default ModalShowAdecuacion
