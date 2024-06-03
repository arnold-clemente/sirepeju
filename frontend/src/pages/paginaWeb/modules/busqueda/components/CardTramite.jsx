import logo_vice from 'assets/images/qr_logo.png';

const CardTramite = ({ registro }) => {
    return (
        <>
            <div className='card_busqueda_page'>
                <div className='card_busqueda_page_header'>
                    <span>{'VICEMINISTERIO DE AUTONOMÍAS'}<br />{'UNIDAD DE PERSONERÍA JURÍDICA'}</span>
                </div>
                <div className='card_busqueda_page_section'>
                    <div className='card_busqueda_page_nombre'>
                        <img src={logo_vice} alt="logo" />
                        <div>
                            <h3>NOMBRE:</h3>
                            <p>
                                {registro.entidad.length > 55
                                    ? registro.entidad.slice(0, 55) + '...'
                                    : registro.entidad
                                }   
                            </p>
                        </div>
                    </div>
                    <div className='card_busqueda_page_resolucion'>
                        <h3>CODIGO DE TRÁMITE:</h3>
                        <p>{registro.codigo}</p>
                    </div>
                    <div className='card_busqueda_page_objeto'>
                        <h3>OBJETO:</h3>
                        <p>
                            {registro.objeto.length > 80
                                ? registro.objeto.slice(0, 80) + '...'
                                : registro.objeto
                            }
                        </p>
                    </div>
                </div>
                <div className='card_busqueda_page_footer'></div>
            </div>
        </>
    )
}

export default CardTramite
