import React, { useState } from 'react'
import { useModal } from 'hooks/useModal';
import ModalPdf from './ModalPdf';

const CardTramite = ({ tramite }) => {

    const { reglamentos } = tramite;
    const [dropdown, setDropdown] = useState(false);
    const [modal, openModal, closeModal] = useModal(false);
    const [registro, setRegistro] = useState({});

    const toogleDropdown = () => {
        if (dropdown == false) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    }

    const show_pdf = (reglamento) => {
        setRegistro({ ...registro, ...reglamento })
        openModal();
    }



    return (
        <>
            <ModalPdf modal={modal} closeModal={closeModal} registro={registro.archivo} />
            <div className='requisitos_navbar_tramite'>
                <button key={tramite.id} onClick={toogleDropdown}
                    className={`requisitos_navbar_link`}>
                    <h3>{tramite.nombre}</h3>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className='reglamentos_contain'>
                    {reglamentos.map((reglamento) => {
                        return (
                            <div key={reglamento.id}
                                className={`reglamentos_main ${dropdown ? 'dropdown' : null}`}>
                                <div className='reglamentos_body'>
                                    <i className="fa-regular fa-file-pdf"></i>
                                    <div>
                                        <span> {reglamento.nombre}</span>
                                        <p>{reglamento.descripcion}</p>
                                        <p>{'FECHA: ' + reglamento.fecha}</p>
                                    </div>
                                </div>
                                <button onClick={(e) => show_pdf(reglamento)} className='reglamentos_button'>
                                    <span>VER</span>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CardTramite
