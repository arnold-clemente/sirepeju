import React from 'react'
import ModalDiv from 'components/ModalDiv';
import { useModal } from 'hooks/useModal'
import RepRegistrado from './reporte/RepRegistrado';

const ShowRegistrado = ({ registro, modal, close }) => {

    const [imprimir, openImprimir, closeImprimir] = useModal(false);
    return (
        <>

            <ModalDiv isOpen={modal} closeModal={close} title={'ENTIDAD REGISTRADA'}>
                <div className='container-fluid d-flex justify-content-end'>
                    <button onClick={openImprimir} className='button_print_show'>
                        <i className="fa-solid fa-print"></i>
                        <span>Imprimir</span>
                    </button>
                </div>
                <RepRegistrado registro={registro} modal={imprimir} close={closeImprimir} />
                <div className="modal-dialog">
                    <div className="card m-2">
                        <div className="card-header">
                            <h5 className='fw-bold'>Datos de la Entidad</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 my-1 fw-bold">
                                    Entidad
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.personalidad_juridica}
                                </div>
                                <div className="col-md-4 my-1 fw-bold">
                                    Sigla
                                </div>
                                <div className="col-md-8 my-1">
                                    {registro.sigla}
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