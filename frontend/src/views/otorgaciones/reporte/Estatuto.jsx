import React from 'react'
import Modal from '../../../components/ModalPdf'

const Estatuto = ({ registro, modal, close, src }) => {
    return (
        <>
            <Modal isOpen={modal} closeModal={close}>
                <div className='iframe_pdf'>
                    {/* <iframe src={src + 'storage/' + registro.registro_persona_colectiva.estatuto_organico}
                        type="application/pdf" >
                    </iframe> */}
                    <embed src={src + 'storage/' + registro.registro_persona_colectiva.estatuto_organico}
                        type="application/pdf" >
                    </embed>
                </div>
            </Modal>
        </>
    )
}

export default Estatuto
