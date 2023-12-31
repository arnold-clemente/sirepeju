import React from 'react'
import ModalDiv from '../../components/ModalDiv';

const ModalVerificacionShow = ({ registro, modal, close }) => {
    return (
        <>
            <ModalDiv isOpen={modal} closeModal={close} title={'Detalle de la Entidad'}>
                <h3 className="fs-5"><center><b>Naturaleza:</b> {registro.naturaleza} &nbsp;<b>Entidad:</b>  {registro.entidad}</center></h3>
                <hr />
                <div className="modal-dialog modal-lg">
                    <h2 className="fs-6"><b>Sigla:</b> &nbsp;&nbsp;{registro.sigla} </h2> <hr />
                    <h2 className="fs-6"><b>Representante Legal:</b>&nbsp;&nbsp;{registro.representante}&nbsp;&nbsp;<b> CI:</b>{registro.ci}</h2> <hr />
                    
                    <h2 className="fs-6"><b>Persona Colectiva:</b> &nbsp;&nbsp;{registro.persona_colectiva} </h2>
                </div>

                <hr></hr>
                <div className='d-flex'>
                    <button className="btn btn-secondary" title="cerrar" onClick={close}>cerrar</button>
                    &nbsp;
                    {/* <button className="btn btn-secondary" title="Imprimir" onClick={close}>Imprimir</button> */}
                </div>
            </ModalDiv>
        </>
    )
}

export default ModalVerificacionShow
