import { useEffect, useRef, useState } from 'react'
import Particulas from '../views/pagina/components/Particles'
import escudo_bol from '../images/Escudo_de_Bolivia.svg'
import escudo_sirepeju from '../images/qr_logo.png'
import icons from '../images/icon.png'
import navbar_escudo from '../images/qr_logo.png'
import { NavLink } from 'react-router-dom'

const PaginaNavbar = () => {

    const [menubar, setMenubar] = useState(false);
    const [pagescrol, setPagescroll] = useState(false);
    const navbar = useRef();

    window.addEventListener('scroll', function () {
        if (navbar.current) {
            // const watchscroll = navbar.current;
            // const { y } = watchscroll.getBoundingClientRect();
            const watchscroll = window.scrollY;
            if (watchscroll < 180) {
                setPagescroll(false)
            }
            if (watchscroll > 180) {
                setPagescroll(true)
            }
        }
    });


    const handleMenu = () => {
        setMenubar(!menubar);
    }


    return (
        <>
            <div className='pagina_main'>
                <div className='pagina_header'>
                    <div className='contenedor_particulas'>
                        <Particulas />
                    </div>
                    <div className='pagina_logos'>
                        <img src={escudo_bol} alt="escudo" />
                        <h1>SISTEMA DE REGISTRO DE PERSONALIDADES JURÍDICAS - SIREPEJU</h1>
                        <img src={escudo_sirepeju} alt="escudo" />
                    </div>
                </div>
                <div className={`pagina_nabvar ${pagescrol ? 'scroll' : ''}`} ref={navbar}>
                    <div className='pagina_nabvar_menu'>
                        <div className='pagina_nabvar_resposive'>
                            <button type='button' onClick={handleMenu} className={`pagina_nabvar_button ${menubar ? 'rotate' : ''}`}>
                                <i className="fa-solid fa-bars rotate"></i>
                            </button>
                            <h1>SIREPEJU</h1>
                            <div className='pagina_nabvar_resposive_image'>
                                <img src={icons} alt="escudo" />
                            </div>
                        </div>
                        <div className={menubar ? 'pagina_nabvar_links page' : 'pagina_nabvar_links'}>
                            <div className={`pagina_nabvar_link_image ${pagescrol ? 'scroll' : ''}`}>
                                <img src={navbar_escudo} alt="logo" />
                            </div>
                            <NavLink to={'/'}
                                className={({ isActive }) => 'pagina_nabvar_link ' + (isActive ? 'page_active_link' : '')}>
                                <span>INICIO</span>
                            </NavLink>
                            <NavLink to={'/buscador-de-tramites'}
                                className={({ isActive }) => 'pagina_nabvar_link ' + (isActive ? 'page_active_link' : '')}>
                                <span>BUSCAR TRÁMITE</span>
                            </NavLink>
                            <div className='pagina_nabvar_link'>
                                <span>REQUISITOS</span>
                            </div>
                            <NavLink to={'/informacion'}
                                className={({ isActive }) => 'pagina_nabvar_link ' + (isActive ? 'page_active_link' : '')}>
                                <span>INFORMACIÓN</span>
                            </NavLink>
                            <div className={`pagina_nabvar_link_image ${pagescrol ? 'scroll' : ''}`}>
                                <img src={navbar_escudo} alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaginaNavbar
