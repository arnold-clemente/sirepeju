import escudo_sirepeju from 'assets/images/logovic.jpg'
import { NavLink } from 'react-router-dom'

// rutas
import { linksPagina } from './LinksPagina'
import '../assets/css/pagina_navbar.css'

const PaginaNavbar = ({menubar, handleMenu}) => {

  
    return (
        <>
            <nav className={`page_nav`}>
                <div className={`logo_nav ${menubar ? 'page' : null}`}>
                    <img src={escudo_sirepeju} alt="imagenes" />
                </div>
                <div className='pagina_routes'>
                    <div className={`links_page ${menubar ? 'page' : null}`}>
                        {linksPagina.map((link, index) => {
                            return (
                                <NavLink key={index}
                                    to={link.route}
                                    className="link_page">
                                    <span>{link.name}</span>
                                </NavLink>
                            )
                        })}
                    </div>
                    <button
                        className={`pagina_bars ${menubar ? 'page' : null}`}
                        onClick={handleMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <button
                        onClick={handleMenu}
                        className={`button_layout_false ${menubar ? 'page' : null}`}
                    />
                    <div className={`pagina_float ${menubar ? 'page' : null}`}>
                        <div className='links_page_float'>
                            <div className='pagina_float_x'>
                                <button className='pagina_float_x_button' onClick={handleMenu}>
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                            {linksPagina.map((link, index) => {
                                return (
                                    <NavLink key={index}
                                        to={link.route}
                                        className="link_page_float">
                                        <span>{link.name}</span>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default PaginaNavbar
