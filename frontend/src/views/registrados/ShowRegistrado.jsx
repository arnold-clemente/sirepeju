import React from 'react'
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal'
import RepRegistrado from './reporte/RepRegistrado';

const ShowRegistrado = ({ registro, modal, close }) => {

    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    return (
        <>

            <ModalDiv isOpen={modal} closeModal={close} title={'REGISTROS DE ADECUACIÓN'}>
                <div className='container-fluid d-flex justify-content-end'>
                    <button onClick={openImprimir} className='button_print_show'>
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir reporte</span>
                    </button>
                </div>
                <RepRegistrado registro={registro} modal={imprimir} close={closeImprimir} />
                <div className="modal-dialog">
                    <div className="card m-2">
                        <div className="card-header">
                            <h5 className='fw-bold'><center>{registro.personalidad_juridica} </center></h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 my-1 fw-bold">
                                    Sigla
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.sigla}
                                </div>
                                <div className="col-md-4 my-1 fw-bold">
                                    Naturaleza
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.naturaleza}
                                </div>
                                <div className="col-md-4 my-1 fw-bold">
                                    Fecha de registro
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.fecha}
                                </div>
                                <div className="col-md-4 my-1 fw-bold">
                                Número de registro
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.codigo}
                                </div>
                                <div className="col-md-4 my-1 fw-bold">
                                     Tipo de registro
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.observacion}
                                </div>
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

export default ShowRegistrado;