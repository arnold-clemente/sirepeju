import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getRequisitos } from 'api/pagina/requisitosApi'

import Loader from 'components/Loader'
import CardRequisito from './components/CardRequisito'
import './css/requisitos.css'
import { useModal } from 'hooks/useModal';
import ModalRequisitos from './components/ModalRequisitos'

const Reglamentos = () => {
    const { isLoading, data: consulta, isError, error } = useQuery({
        queryKey: ['requisitos'],
        queryFn: getRequisitos,
    })

    const [modal, openModal, closeModal] = useModal(false);
    const [mostrar, setMostar] = useState({ id: 0 });

    const show_Registros = (registro) => {
        setMostar({ ...mostrar, ...registro });
        openModal();
    }

    if (isLoading) return <Loader />
    else if (isError) return <div>Error: {error.message}</div>
    return (
        <>
            <ModalRequisitos registro={mostrar} modal={modal} closeModal={closeModal} />
            <div className='container-fluid'>
                <div className='requisito_main'>
                    <h1>REQUISITOS PARA TRÁMITES DE PERSONALIDADES JURÍDICAS</h1>
                    <div className='requisito_cards'>
                        {consulta.map((requisito) => {
                            return (
                                <button onClick={(e) => show_Registros(requisito)} key={requisito.id} className='requisito_card_button'>
                                    <CardRequisito requisito={requisito} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reglamentos
