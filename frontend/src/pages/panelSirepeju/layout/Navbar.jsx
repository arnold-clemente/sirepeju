import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import logo_escudo from 'assets/images/logo_escudo.png'
import logo_letra from 'assets/images/logo_letra.png'
import user from 'assets/images/user.png'
import { useSelector } from 'react-redux'

const Navbar = ({ sidebarHandle, sidebar, handleProfile }) => {

  const usuario = useSelector(state => state.userStore.user);
  const url = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className='navbar_contain'>
      <Link to='/' className={'nabvar_logo ' + sidebar}>
        <img className='logo_escudo' src={logo_escudo} alt="logo" />
        <img className={'logo_letra ' + sidebar} src={logo_letra} alt="logo" />
      </Link>
      <div className={'nabvar_content ' + sidebar}>
        <button onClick={sidebarHandle} className={'menu_sidebar ' + sidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="nabvar_text">
          <h1>SISTEMA DE REGISTRO DE PERSONALIDADES JURIDICAS</h1>
        </div>
      </div>
      <button onClick={handleProfile} className='nabvar_user'>
        <div className='nabvar_user_image'>
          {usuario.imagen
            ? <img src={url + '/storage/' + usuario.imagen} alt="user" />
            : <img src={user} alt="user" />
          }
        </div>
        <div className='nabvar_user_profile'>
          <span>{usuario.nombre}</span>
        </div>
      </button>
    </div>
  )
}
Navbar.defaultProps = {
  sidebarHandle: propTypes.func.isRequired,
  sidebar: propTypes.string.isRequired,
}

export default Navbar
