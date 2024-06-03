import React from 'react'

const ModalMd = ({ children, isOpen, closeModal, title }) => {
    return (
        <>
            <div className={`modal_container_principal ${isOpen && "is_open"} animate__animated animate__fadeIn`}>
                <button className='modal_cerrar' onClick={closeModal}></button>
                <div className='modal_card_md'>
                    <div className='modal_title_azul'>
                        <h3>{title}</h3>
                        <button onClick={closeModal}><i className="fa-solid fa-x"></i></button>
                    </div>
                    <div className='modal_content'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalMd
