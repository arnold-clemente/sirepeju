import './css/informacion_page.css'
import { useSelector } from 'react-redux'

import call from './image/call.png';
import map from './image/map.png';
import email from './image/email.png';

const Informacion = () => {

    const referencias = useSelector(state => state.footerStore.referencias);

    return (
        <>
            <div className='informacion_main'>
                <h1>UBICACION DEL VICEMINISTERIO DE AUTONOMIAS - MINISTERIO DE LA PRESIDENCIA </h1>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.330770895793!2d-68.13268102567359!3d-16.509390540965583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21728d5531a7%3A0xcd9bbe4cc7240a63!2sUNIDAD%20DE%20PERSONALIDADES%20JURIDICAS!5e0!3m2!1ses-419!2sbo!4v1717104427567!5m2!1ses-419!2sbo"
                                loading="lazy">
                            </iframe>
                        </div>
                        <div className="col-md-5">
                            <div className="informacion_contactos">
                                <div className="informacion_contacto">
                                    <div>
                                        <img src={map} alt="image" />
                                    </div>
                                    <div>
                                        <h3>NUESTRA OFICINA</h3>
                                        <p>{referencias.direccion}</p>
                                    </div>
                                </div>
                                <div className="informacion_contacto">
                                    <div>
                                        <img src={call} alt="image" />
                                    </div>
                                    <div>
                                        <h3>TELEFONO</h3>
                                        <p>{referencias.whatsapp}</p>
                                    </div>
                                </div>
                                <div className="informacion_contacto">
                                    <div>
                                        <img src={email} alt="image" />
                                    </div>
                                    <div>
                                        <h3>CORREO INSTITUCIONAL</h3>
                                        <p>{referencias.correo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Informacion
