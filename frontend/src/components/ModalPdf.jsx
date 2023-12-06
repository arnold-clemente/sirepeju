import React from 'react'

const ModalPdf = ({ children, isOpen, closeModal }) => {
    return (
        <div>
            <div className={`modal_container_principal ${isOpen && "is_open"} animate__animated animate__fadeIn`}>
                <button className='modal_cerrar' onClick={closeModal}></button>
                <div className='modal_card_pdf scroll_style'>
                    <div className='modal_title_pdf'>
                        <button onClick={closeModal}><i className="fa-solid fa-x"></i></button>
                        <span>cerrar</span>
                    </div>
                    <div className='modal_content'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPdf
