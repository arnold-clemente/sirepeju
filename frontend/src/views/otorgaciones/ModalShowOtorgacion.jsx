import React, { useEffect, useState } from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from '../../hooks/useModal'
import Alfanumerico from './reporte/Alfanumerico';
import RepProcesoOtorgacion from './reporte/RepProcesoOtorgacion';

import { useMutation } from 'react-query';
import { getOtorgacion } from '../../api/otorgacionesApi';


const ModalShowOtorgacion = ({ registro, modalRegistro, closeRegistro }) => {
    // para el modal de reporte de
    const [modalAlfanumerico, openAlfanumerico, closeAlfanumerico] = useModal(false);
    const [modalpdf, openModalpdf, closeModalpdf] = useModal(false);
    const [cargando, setCargando] = useState(false);
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
    const [personalidad, setPersonalidad] = useState({
        id: 0,
        estatuto_organico: '',
        reglamento_interno: '',
        informe_final: '',
        nota_final: '',
        resolucion_ministerial: '',
        fecha_resolucion: '',
        otorgacion_id: 0,
        created_at: '',
        updated_at: '',
    });
    const [fundadores, setFundadores] = useState([]);

    const { id } = registro;

    useEffect(() => {
        if (id != 0) {
            setCargando(true);
            showOtorgacion.mutate(id);
        }
    }, [id])

    const showOtorgacion = useMutation({
        mutationFn: getOtorgacion,
        onSuccess: (response) => {
            const otorgacionResp = response.otorgacion;
            const personalidadResp = response.personalidad;
            const fundadoresResp = response.fundadores;
            setOtorgacion({ ...otorgacion, ...otorgacionResp });
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
            <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={' PROCESO DE OTORGACIÓN'}>
                {!cargando
                    ? (<div className="container-fluid">
                        {/*<h2 className='text-center fs-4'>{otorgacion.personalidad_juridica} </h2>*/}
                        {/* para el modal de pdf de alfanumerico  */}
                        <div className='container-fluid d-flex justify-content-end gap-1'>
                            {otorgacion.alfanumerico
                                ? <>
                                    <button className='btn btn-danger' onClick={openAlfanumerico} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Alfanumerico</span>
                                    </button>
                                    <div className='absolute'>
                                        <Alfanumerico registro={otorgacion} modal={modalAlfanumerico} close={closeAlfanumerico} />
                                    </div>
                                </>
                                : null
                            }
                            {otorgacion.id != 0
                                ? <>
                                    <button className='btn btn-success' onClick={openModalpdf} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Imprimir reporte</span>
                                    </button>
                                    <div className='absolute'>
                                        <RepProcesoOtorgacion modal={modalpdf} close={closeModalpdf}
                                            otorgacion={otorgacion} personalidad={personalidad} fundadores={fundadores} />
                                    </div>
                                </>
                                : null
                            }
                        </div>
                        <div className="card m-2">
                            <div className="card-header">
                                <h6 className='fw-bold'><center>{otorgacion.personalidad_juridica}{otorgacion.sigla}</center></h6>
                            </div>
                            <div className="card-body">
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Código:</div>
                                    <div className="col-md-8 ">{otorgacion.codigo_otorgacion}</div>
                                    <div className="col-md-4 fw-bold ">Naturaleza:</div>
                                    <div className="col-md-8 ">{otorgacion.naturaleza}</div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Domicilio legal:</div>
                                    <div className="col-md-8 ">{otorgacion.persona_colectiva}</div>
                                    <div className="col-md-4 fw-bold ">Sigla:</div>
                                    <div className="col-md-8 ">{otorgacion.sigla}</div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Domicilio legal</div>
                                    <div className="col-md-8 ">{otorgacion.domicilio_legal}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 fw-bold ">Objeto</div>
                                    <div className="col-md-8">{otorgacion.objeto}</div>
                                </div>

                            </div>
                        </div>
                        <div className="card m-2">
                            <div className="card-header">
                                <h6 className='fw-bold'>{otorgacion.personalidad_juridica}</h6>
                            </div>
                            <div className="card-body">
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Código:</div>
                                    <div className="col-md-8 ">{otorgacion.codigo_otorgacion}</div>
                                    <div className="col-md-4 fw-bold ">Naturaleza:</div>
                                    <div className="col-md-8 ">{otorgacion.naturaleza}</div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Tipo de Persona Colectiva:</div>
                                    <div className="col-md-8 ">{otorgacion.persona_colectiva}</div>
                                    <div className="col-md-4 fw-bold ">Sigla:</div>
                                    <div className="col-md-8 ">{otorgacion.sigla}</div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Domicilio legal</div>
                                    <div className="col-md-8 ">{otorgacion.domicilio_legal}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 fw-bold ">Objeto</div>
                                    <div className="col-md-8">{otorgacion.objeto}</div>
                                </div>

                            </div>
                        </div>

                        {otorgacion.estado == 0
                            ? (<div className='container-fluid '>
                                <div className='row'>
                                    <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                                    <div className='col-md-9'><span>{otorgacion.observacion}</span></div>
                                </div>
                            </div>)
                            : ''
                        }

                        {fundadores.length > 0
                            ? <div className='card mx-2'>
                                <div className="card-header">
                                    <h5 className='fw-bold'>Miembros Fundadores</h5>
                                </div>
                                <div className='card-body'>
                                    {fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                                        return (
                                            <div className="row" key={fundador.id}>
                                                <div className="col-md-2 fw-bold ">Nombre:</div>
                                                <div className="col-md-4 ">{fundador.nombre_completo}</div>
                                                <div className="col-md-3 fw-bold ">C.I.:</div>
                                                <div className="col-md-3 ">{fundador.ci}</div>
                                            </div>

                                        )
                                    })}

                                </div>
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



export default ModalShowOtorgacion
