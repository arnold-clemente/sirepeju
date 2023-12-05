
import Modal from '../../../components/ModalPdf'

const EstatutoMod = ({ registro, modal, close, src }) => {
    return (
        <>
            <Modal isOpen={modal} closeModal={close}>
                <div className='iframe_pdf'>
                    <embed src={src + '/storage/' + registro.registro_persona_colectiva.estatuto_organico}
                        type="application/pdf" >
                    </embed>
                </div>
            </Modal>
        </>
    )
}

export default EstatutoMod
