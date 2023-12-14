import React from 'react'
import ModalDiv from '../../components/ModalDiv';
import { useModal } from '../../hooks/useModal'
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
                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Entidad:</b>&nbsp;&nbsp;{registro.personalidad_juridica}</h2> <hr />
                    <h2 className="fs-6"><b>Sigla:</b>&nbsp;&nbsp;{registro.sigla}<hr /></h2> <hr />
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