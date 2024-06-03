import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getNormativas } from 'api/pagina/normativaApi'

import Loader from 'components/Loader'
import './css/normativas.css'
import { useModal } from 'hooks/useModal';
import image from './image/pdf.png'
import ModalPdf from './components/ModalPdf'

const Normativas = () => {
    const [modal, openModal, closeModal] = useModal(false);
    const [registro, setRegistro] = useState({ id: 0 });

    const { isLoading, data: consulta, isError, error } = useQuery({
        queryKey: ['normativas'],
        queryFn: getNormativas,
    })

    const show_Registros = (normativa) => {
        setRegistro({ ...registro, ...normativa });
        openModal();
    }


    if (isLoading) return <Loader />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            <ModalPdf modal={modal} closeModal={closeModal} registro={registro.archivo} />
            <div>
                <h1 className='normativa_h1'>NORMATIVA SOBRE PERSONALIDADES JURIDICAS A NIVEL NACIONAL </h1>
                <div className='normativas'>
                    {consulta.map((normativa) => {
                        return (
                            <div className='card_normativa' key={normativa.id}>
                                <div className='card_normativa_image'>
                                    <img src={image} alt="image" />
                                </div>
                                <div className='card_normativa_text'>
                                    <h3>{normativa.nombre}</h3>
                                    <button onClick={(e) => show_Registros(normativa)}>
                                        <i className="fa-regular fa-eye"></i>
                                        <span>VER</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Normativas
