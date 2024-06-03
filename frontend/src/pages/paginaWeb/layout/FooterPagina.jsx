import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { getFooter } from 'api/pagina/footerApi';
import { show_alerta } from 'components/MessageAlert';

import '../assets/css/footer_pagina.css';
import { updateRedes, updateReferencias } from 'store/slices/paginaWeb/footerSlice';
import { useDispatch, useSelector } from 'react-redux'

const FooterPagina = () => {

    const dispatch = useDispatch();
    const referencias = useSelector(state => state.footerStore.referencias);
    const redes = useSelector(state => state.footerStore.redes);

    useEffect(() => {
        if (referencias.id == 0) {
            handleFooter.mutate();
        }
    }, [referencias.id]);

    const handleFooter = useMutation({
        mutationFn: getFooter,
        onSuccess: (response) => {
            if (response.status === true) {
                dispatch(updateReferencias(response.referencias));
                dispatch(updateRedes(response.redes));
            } else {
                show_alerta('Fallo de Validacion', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');
            }
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    return (
        <>
            <div className='footer_page'>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Dirección</h1>
                            <p>Oficina Cental La Paz</p>
                            <p>{referencias.direccion}</p>
                            <p>{`Horarios de atención: ${referencias.horario}`}</p>
                        </div>
                        <div className="col-md-6">
                            <h1>Contáctenos</h1>
                            <div className='footer_contactos'>
                                <i className="fa-brands fa-whatsapp"></i>
                                <span>{`(+591) ${referencias.whatsapp} Atención de oficina, solo mensajes`}</span>
                            </div>
                            <div className='footer_contactos'>
                                <i className="fa-regular fa-envelope"></i>
                                <span>{`${referencias.correo}`}</span>
                            </div>
                            <div className='footer_contactos'>
                                <span>{`Telf. Piloto (591-2) ${referencias.telefono}`}</span>
                            </div>
                            <div className='footer_contactos'>
                                <span>{`Fax: (591-2) ${referencias.fax}`}</span>
                            </div>
                            {redes
                                ? <div className='footer_redes'>
                                    {redes.map((red) => {
                                        return (
                                            <a href={red.url}
                                                target='_blank'
                                                className='footer_red'
                                                key={red.id}
                                            >
                                                <i className={red.icon}></i>
                                                <span>{red.nombre}</span>
                                            </a>
                                        )
                                    })}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FooterPagina
