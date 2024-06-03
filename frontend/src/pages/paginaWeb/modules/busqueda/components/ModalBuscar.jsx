import { useState, useEffect } from 'react'
import { useMutation } from 'react-query';

import Modal from 'react-modal';
import { show_alerta } from 'components/MessageAlert';
import '../css/modalbuscar.css';
import imageLogo from '../../../assets/image/VICEMINISTERIO_DE_AUTONOMÍAS.jpg'
import LoaderBuscando from 'components/Loader';

import { getOtorgacion, getAdecuacion, getGobernacion } from 'api/pagina/tramitesApi';

const ModalBuscar = ({ registro, modal, closeModal }) => {

    useEffect(() => {
        if (registro.tipo == 2) {
            setLoading(true);
            getFinalizadoOtorgacion.mutate(registro.otorgacion_id)
        }
        if (registro.tipo == 3) {
            setLoading(true);
            getFinalizadoAdecuacion.mutate(registro.adecuacion_id)
        }
        if (registro.tipo == 4) {
            setLoading(true);
            getFinalizadoGobernacion.mutate(registro.gobernacion_id)
        }
    }, [registro]);

    const [entidad, setEntidad] = useState({});
    const [seguimiento, setSeguimiento] = useState({});
    const [informe, setInforme] = useState({});
    const [loading, setLoading] = useState(false);


    const getFinalizadoOtorgacion = useMutation({
        mutationFn: getOtorgacion,
        onSuccess: (response) => {
            setEntidad({ ...entidad, ...response.otorgacion });
            // setSeguimiento({ ...seguimiento, ...response.seguimientos });
            // setInforme({ ...informe, ...response.informes });
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const getFinalizadoAdecuacion = useMutation({
        mutationFn: getAdecuacion,
        onSuccess: (response) => {
            setEntidad({ ...entidad, ...response.adecuacion });
            // setSeguimiento({ ...seguimiento, ...response.seguimientos });
            // setInforme({ ...informe, ...response.informes });
            setLoading(false);
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            setLoading(false);
        },
    });

    const getFinalizadoGobernacion = useMutation({
        mutationFn: getGobernacion,
        onSuccess: (response) => {
            setEntidad({ ...entidad, ...response.otorgacion });
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
                            <h1>Mostrar Trámite</h1>
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
                            <div className='buscados_modal_body_image'>
                                <img src={imageLogo} alt="image" />
                            </div>
                            <div className='buscados_modal_body_content'>
                                <h1 className='fs-5 text-center fw-bold py-2'>{entidad.personalidad_juridica}</h1>
                                <div className='container-fluid'>
                                    <div className='row g-3'>
                                        {entidad.tipo == 4
                                            ? <div className="col-md-6">
                                                <label className="form-label">Resolución Ministerial</label>
                                                <p className='border fs-6'>{entidad.resolucion}</p>
                                            </div>
                                            : <div className="col-md-6">
                                                <label className="form-label">Resolución Ministerial</label>
                                                <p className='border fs-6'>{entidad.resolucion_ministerial}</p>
                                            </div>
                                        }
                                        <div className="col-md-6">
                                            <label className="form-label">Fecha Resolución</label>
                                            <p className='border fs-6'>{entidad.fecha_resolucion}</p>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Objeto</label>
                                            <p className='border fs-6'>{entidad.objeto}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    }

                </div>


            </Modal>
        </>
    )
}

export default ModalBuscar
