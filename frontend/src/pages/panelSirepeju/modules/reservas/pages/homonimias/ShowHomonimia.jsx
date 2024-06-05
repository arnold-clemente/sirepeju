import React from 'react'
import ModalDiv from 'components/ModalDiv'; //contendoresto hay importar siempre
import RepSolicitud from '../solicitud/reporte/RepSolicitud';
import { useModal } from 'hooks/useModal'

const ShowHomonimia = ({ registro, modal, close }) => {
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'LISTA DE SOLICITUDES DE RESERVA DE NOMBRE OBSERVADAS'}>
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
                                <div className="col-md-4 fw-bold my-1">CELULAR:</div>
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

export default ShowHomonimia
