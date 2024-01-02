import React from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre
import RepSolicitud from '../Reserva/reporte/RepSolicitud';
import { useModal } from '../../hooks/useModal'

const ShowHomonimia = ({ registro, modal, close }) => {
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'LISTA DE RESERVA DE NOMBRE'}>
                <div className="modal-dialog">
                <div className="card m-2">
                        <div className="card-header">
                             <h5 className='fw-bold'>Datos de la Reserva de Nombre (Homonimia)</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 fw-bold my-1">Entidad</div>
                                <div className="col-md-8 my-1">{registro.entidad}</div>
                                <div className="col-md-4 fw-bold my-1">Sigla</div>
                                <div className="col-md-8 my-1">{registro.sigla}</div>
                                <div className="col-md-4 fw-bold my-1">Entidad</div>
                                <div className="col-md-8 my-1">{registro.representante}</div>
                                <div className="col-md-4 fw-bold my-1">Nº Correlativo:</div>
                                <div className="col-md-8 my-1">{registro.nro_certificado}</div>
                                <div className="col-md-4 fw-bold my-1">Naturaleza:</div>
                                <div className="col-md-8 my-1">{registro.naturaleza}</div>
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
