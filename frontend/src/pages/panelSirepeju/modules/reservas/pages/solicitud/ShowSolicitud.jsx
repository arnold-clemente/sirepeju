import React from 'react'
import ModalDiv from 'components/ModalDiv'; //contendoresto hay importar siempre
import RepSolicitud from './reporte/RepSolicitud';
import { useModal } from 'hooks/useModal'

const ShowSolicitud = ({ registro, modal, close }) => {

    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'SOLICITUD RESERVA DE NOMBRE DE LA PERSONA COLECTIVA'}>
                <RepSolicitud registro={registro} modal={imprimir} close={closeImprimir} />
                <div className='container-fluid d-flex justify-content-end'>
                    <button onClick={openImprimir} className='button_print_show'>
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir reporte</span>
                    </button>
                </div>
                <div className="modal-dialog">
                    <div className="card m-2">
                        <div className="card-header">
                             <h5 className='fw-bold'>N°_C:{registro.nro_certificado}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 fw-bold my-1">NATURALEZA:</div>
                                <div className="col-md-8 my-1">{registro.naturaleza}</div>
                                <div className="col-md-4 fw-bold my-1">ENTIDAD:</div>
                                <div className="col-md-8 my-1">{registro.entidad}</div>
                                <div className="col-md-4 fw-bold my-1">SIGLA:</div>
                                <div className="col-md-8 my-1">{registro.sigla}</div>
                                <div className="col-md-4 fw-bold my-1">HOJA DE RUTA:</div>
                                <div className="col-md-8 my-1">{registro.id}</div>
                               
                            </div>
                        </div>
                        <hr />
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 fw-bold my-1">SOLICITANTE:</div>
                                <div className="col-md-8 my-1">{registro.representante}</div>
                                <div className="col-md-4 fw-bold my-1">CI:</div>
                                <div className="col-md-8 my-1">{registro.ci_rep + " " + registro.ext_ci_rep}</div>
                                <div className="col-md-4 fw-bold my-1">N°_CELULAR:</div>
                                <div className="col-md-8 my-1">{registro.telefono}</div>
                                <div className="col-md-4 fw-bold my-1">CORREO REGISTRADO:</div>
                                <div className="col-md-8 my-1">{registro.correo}</div>  
                            </div>
                            </div>
                
                    </div>
                </div>
                <hr />
                <div className='d-flex'>
                    <button className="btn btn-secondary" title="cerrar" onClick={close}>cerrar</button>
                </div>
            </ModalDiv>
        </>
    )
}

export default ShowSolicitud
