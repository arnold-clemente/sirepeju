import React from 'react'
import ModalDiv from 'components/ModalDiv';

const ModalRegCaducados = ({ registro, modal, close }) => {
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'ENTIDAD CADUCADA'}>
                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Entidad:</b>&nbsp;&nbsp;{registro.entidad}</h2> <hr />
                    <h2 className="fs-6"><b>Sigla:</b>&nbsp;&nbsp;{registro.sigla}</h2> <hr />
                    <h2 className="fs-6"><b>Representante legal:</b>&nbsp;&nbsp; {registro.representante}<b>CI:</b>9999</h2> <hr />
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

export default ModalRegCaducados
