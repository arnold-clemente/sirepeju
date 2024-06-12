import React, { useEffect, useState } from 'react'
import ModalDiv from 'components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from 'hooks/useModal'
import Alfanumerico from '../adecuacion/reporte/AdecuacionAlfanumerico';
import RepRevocatoriaAdecuacion from './reporte/RepRevocatoriaAdecuacion';

import { useMutation } from 'react-query';
import { getAdecuacion } from 'api/adecuacionApi';
import ViewPdf from 'components/ViewPdf';

const ModalAdecuacionRevocadosShow = ({ registro, modalRegistro, closeRegistro }) => {
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
        estatuto_organico: '',
        reglamento_interno: '',
        informe_final: '',
        nota_final: '',
        resolucion_ministerial: '',
        fecha_resolucion: '',
        administrativo_id: 0,
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
            const fundadoresResp = response.fundadores;
            setAdecuacion({ ...adecuacion, ...adecuacionResp });
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
            <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'ADECUACIONES REVOCADAS'}>
                {!cargando
                    ? (<div className="container-fluid">
                        
                        {/* para el modal de pdf de alfanumerico  */}
                        <div className='container-fluid d-flex justify-content-end gap-1'>
                            {adecuacion.alfanumerico
                                ? <>
                                    <button className='btn btn-danger' onClick={openAlfanumerico} >
                                        <i className="fa-solid fa-print"></i>
                                        <span className='mx-1'>Alfanumerico</span>
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
                                        <span className='mx-1'>Imprimir</span>
                                    </button>
                                    <div className='absolute'>
                                        <RepRevocatoriaAdecuacion modal={modalpdf} close={closeModalpdf}
                                            adecuacion={adecuacion} fundadores={fundadores} />
                                    </div>
                                </>
                                : null
                            }
                        </div>
                        <div className="card m-2">
                            <div className="card-header">
                                <h2 className='fw-bold'><center>{adecuacion.personalidad_juridica} - {adecuacion.sigla}</center></h2>
                            </div>
                            <div className="card-body">
                                <div className="row border-bottom p-1">
                                    <div className="col-md-3 fw-bold ">Código:</div>
                                    <div className="col-md-3 "><h2>{adecuacion.codigo_adecuacion}</h2></div>
                                    <div className="col-md-3 fw-bold ">Naturaleza:</div>
                                    <div className="col-md-3 "><h2>{adecuacion.naturaleza}</h2></div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-3 fw-bold ">Resolución Ministerial de revocatoria:</div>
                                    <div className="col-md-3 "><h2>{adecuacion.nota_revocatorio}</h2></div>
                                    <div className="col-md-3 fw-bold ">Fecha de revocatorio</div>
                                    <div className="col-md-3 "><h2>{adecuacion.fecha_revocatoria}</h2></div>
                                    
                                    
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Domicilio legal</div>
                                    <div className="col-md-12 "><h2>{adecuacion.domicilio_legal}</h2></div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Objeto</div>
                                    <div className="col-md-12 "><h2>{adecuacion.objeto}</h2></div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-4 fw-bold ">Resumen</div>
                                    <div className="col-md-13"><h2>{adecuacion.revocatoria}</h2></div>
                                </div>                               
                            </div>
                        </div>

                        

                        {adecuacion.estado == 0
                            ? (<div className='container-fluid '>
                                <div className='row'>
                                    <div className='col-md-3'> <h1>OBSERVACION</h1></div>
                                    <div className='col-md-9'><span>{adecuacion.observacion}</span></div>
                                </div>
                            </div>)
                            : ''
                        }

                        {adecuacion.estatuto_organico
                            ? <>
                                <div className='container-fluid d-flex justify-content-between my-4'>
                                    <button className='btn btn-success' onClick={openEstatuto} >
                                        Estatuto organico
                                    </button>
                                    <button className='btn btn-success' onClick={openReglamento} >
                                        Reglamento interno
                                    </button>
                                    {/* <button className='btn btn-success' onClick={openInforme} >
                                        Informe Final
                                    </button> */}
                                    <button className='btn btn-success' onClick={openNota} >
                                        Resolución Ministerial
                                    </button>
                                </div>
                                <ViewPdf resource={adecuacion.estatuto_organico} modal={modalEstatuto} close={closeEstatuto} />
                                <ViewPdf resource={adecuacion.reglamento_interno} modal={modalReglamento} close={closeReglamento} />
                                {/* <ViewPdf resource={adecuacion.informe_final} modal={modalInforme} close={closeInforme} /> */}
                                <ViewPdf resource={adecuacion.nota_final} modal={modalNota} close={closeNota} />
                            </>
                            : null
                        }

                       
{fundadores.length > 0
                            ? <div className='card mx-2'>
                                <div className="card-header">
                                <h2 className='fw-bold'> <center>BENEFICIARIO FINAL</center></h2>
                            </div>
                                <div className='card-body'>
                                    {fundadores.sort((a, b) => b.id - a.id).map((fundador) => {
                                        return (
                                            <div className="row" key={fundador.id}>
                                                <div className="col-md-2 fw-bold "><h2>Nombre:</h2></div>
                                                <div className="col-md-4 "><h2>{fundador.nombre_completo}</h2></div>
                                                <div className="col-md-3 fw-bold "><h2>C.I.:</h2></div>
                                                <div className="col-md-3 "><h2>{fundador.ci}</h2></div>
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

export default ModalAdecuacionRevocadosShow
