import React from 'react'

const ModalSm = ({ children, isOpen, closeModal, title }) => {
    return (
        <>
            <div className={`modal_container_principal ${isOpen && "is_open"} animate__animated animate__fadeIn`}>
                <button className='modal_cerrar' onClick={closeModal}></button>
                <div className='modal_card_sm'>
                    <div className='modal_title_red'>
                        <h3>{title}</h3>
                    </div>
                    <div className='modal_content'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalSm
