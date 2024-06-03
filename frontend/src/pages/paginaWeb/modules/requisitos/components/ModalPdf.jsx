
import Modal from 'react-modal';
import '../css/modal_pdf.css'

const ModalPdf = ({ modal, closeModal, registro }) => {

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const direction = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            <Modal
                isOpen={modal}
                ariaHideApp={false}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className="Modal_pdf"
            >
                <div className='buscados_modal_main'>
                    <div className='view_pd_header'>
                        <div>
                            <button onClick={closeModal} className='view_pd_button'>
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                    </div>
                    <div className='view_pdf_main'>
                        <embed src={direction + '/storage/' + registro}
                            type="application/pdf" >
                        </embed>
                    </div>
                </div>


            </Modal>
        </div>
    )
}

export default ModalPdf
