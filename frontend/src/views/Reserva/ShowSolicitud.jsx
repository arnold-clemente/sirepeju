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
                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Entidad:</b>&nbsp;&nbsp;{registro.entidad}</h2> <hr />
                    <h2 className="fs-6"><b>Sigla:</b>&nbsp;&nbsp;{registro.sigla}<hr /></h2> 
                    <h2 className="fs-6"><b>Representante legal:</b>&nbsp;&nbsp; {registro.representante}<b>       CI:</b>9999</h2> <hr />
                    <h2 className="fs-6"><b>Nº Correlativo:</b> &nbsp;&nbsp;{registro.nro_certificado}</h2><hr />
                    <h2 className="fs-6"><b>Naturaleza:</b> &nbsp;&nbsp;{registro.naturaleza}</h2>
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
