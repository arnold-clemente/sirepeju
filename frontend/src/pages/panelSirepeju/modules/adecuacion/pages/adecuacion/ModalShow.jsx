import React, { useEffect, useState } from 'react'
import ModalDiv from 'components/ModalDiv'; //contendoresto hay importar siempre

// para el modal 
import { useModal } from 'hooks/useModal'
import Alfanumerico from './reporte/AdecuacionAlfanumerico';
import RepProcesoAdecuacion from './reporte/RepProcesoAdecuacion';

import { useMutation } from 'react-query';
import { getAdecuacion } from 'api/adecuacionApi';

const ModalShow = ({ registro, modalRegistro, closeRegistro }) => {

  // para el modal de reporte de
  const [modalAlfanumerico, openAlfanumerico, closeAlfanumerico] = useModal(false);
  const [modalpdf, openModalpdf, closeModalpdf] = useModal(false);
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
      <ModalDiv isOpen={modalRegistro} closeModal={closeRegistro} title={'TRÁMITE DE PROCESO DE ADECUACIÓN'}>
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
                    <span className='mx-1'>Imprimir reporte</span>
                  </button>
                  <div className='absolute'>
                    <RepProcesoAdecuacion modal={modalpdf} close={closeModalpdf}
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
                                    <div className="col-md-3 fw-bold ">Tipo:</div>
                                    <div className="col-md-3 "><h2>{adecuacion.persona_colectiva}</h2></div>
                                    <div className="col-md-3 fw-bold ">fecha:</div>
                                    <div className="col-md-3 "><h2>{adecuacion.fecha_ingreso_tramite}</h2></div>
                                    
                                    
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-4 fw-bold ">Domicilio legal</div>
                                    <div className="col-md-9 "><h2>{adecuacion.domicilio_legal}</h2></div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-4 fw-bold ">Objeto</div>
                                    <div className="col-md-13"><h2>{adecuacion.objeto}</h2></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 fw-bold ">Observación</div>
                                    <div className="col-md-11"><h2>{adecuacion.observacion}</h2></div>
                                </div>
                                
                            </div>
                            
                        </div>
            <div className="card m-2">
                        <div className="card-header">
                                <h2 className='fw-bold'> <center>DATOS DEL REPRESENTANTE LEGAL</center></h2>
                            </div>
                            <div className="card-body">
                                <div className="row border-bottom p-1">
                                    <div className="col-md-3 fw-bold ">Nombre:</div>
                                    <div className="col-md-3 "><h2>{adecuacion.representante}</h2></div>
                                    <div className="col-md-2 fw-bold ">C.I.:</div>
                                    <div className="col-md-2 "><h2>{adecuacion.ci_rep}</h2></div>
                                </div>
                                <div className="row border-bottom p-1">
                                    <div className="col-md-6 fw-bold ">Número de celular de referencia</div>
                                    <div className="col-md-9 "><h2>{adecuacion.telefono}</h2></div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-4 fw-bold ">Correo electronico </div>
                                    <div className="col-md-11"><h2>{adecuacion.correo}</h2></div>
                                </div>
                        </div>
                        </div>
                        <div className="card m-2">
                        
                            <div className="card-body">
                            <div className="row border-bottom p-1">
                                    <div className="col-md-3 fw-bold ">Informes:</div>
                                    <div className="col-md-9 "><h2>{adecuacion.cite_informe_preliminar}</h2></div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-3 fw-bold ">Seguimiento </div>
                                    <div className="col-md-5"><h2>{adecuacion.seguimiento}</h2></div>
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

                        {fundadores.length > 0
                            ? <div className='card mx-2'>
                                <div className="card-header">
                                <h2 className='fw-bold'> <center>MIEMBROS FUNDADORES</center></h2>
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

export default ModalShow
