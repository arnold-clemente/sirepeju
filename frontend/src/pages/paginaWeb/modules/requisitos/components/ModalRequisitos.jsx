import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { useMutation } from 'react-query';

import '../css/menurequisitos.css'

import { show_alerta } from 'components/MessageAlert';
import LoaderBuscando from 'components/Loader';
import { getRequisito } from 'api/pagina/requisitosApi';
import CardTramite from './CardTramite';

const ModalRequisitos = ({ registro, modal, closeModal }) => {

    const [loading, setLoading] = useState(false);
    const [tramites, setTramites] = useState([]);

    useEffect(() => {
        if(registro.id != 0){
            setLoading(true);
            getRequisitos.mutate(registro.id)
        }      
        
    }, [registro.id]);

    const getRequisitos = useMutation({
        mutationFn: getRequisito,
        onSuccess: (response) => {
            setTramites(response.tramites);
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });



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


    return (
        <>
            <Modal
                isOpen={modal}
                ariaHideApp={false}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className="Modal"
            >
                <div className='buscados_modal_main'>
                    <div className='buscados_modal_header'>
                        <div className='buscados_modal_header_title'>
                            <h1>REQUISITOS PARA TRÁMITES DE PERSONALIDADES JURÍDICAS</h1>
                        </div>
                        <div>
                            <button onClick={closeModal} className='buscados_modal_header_button'>
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                    </div>
                    {loading
                        ? <LoaderBuscando />
                        : <div className='buscados_modal_body'> 
                        <div className='requisitos_navbar'>
                            <div className='requisitos_navbar_title'>
                            <i className="fa-regular fa-file"></i>
                            <span>BASE LEGAL</span>
                            </div>
                            <div className='requisitos_navbar_subtitle'>
                            <i className="fa-solid fa-circle-exclamation"></i>
                                <p>
                                    Usted puede dar lectura a las partes más relevates de  las normas legales
                                    vigentes en el pais que sustentan la Declaración jurada de Bienes y Rentas
                                </p>
                            </div>
                            {tramites.map((tramite) => {
                                return (
                                    <div key={tramite.id}>
                                        <CardTramite tramite={tramite} />
                                    </div>                                    
                                )
                            })}
                        </div>                           
                           

                        </div>

                    }

                </div>


            </Modal>
        </>
    )
}

export default ModalRequisitos

