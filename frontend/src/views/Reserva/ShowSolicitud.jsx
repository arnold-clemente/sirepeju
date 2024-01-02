import React from 'react'
import ModalDiv from '../../components/ModalDiv'; //contendoresto hay importar siempre
import RepSolicitud from './reporte/RepSolicitud';
import { useModal } from '../../hooks/useModal'

const ShowSolicitud = ({ registro, modal, close }) => {

    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'RESERVA DE NOMBRE DE LA PERSONA COLECTIVA'}>
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
                             <h5 className='fw-bold'>Datos de la Reserva de Nombre</h5>
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

export default ShowSolicitud
