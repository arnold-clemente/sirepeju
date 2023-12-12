import React from 'react'
import propTypes from 'prop-types'
import logo_escudo from '../images/logo_escudo.png'
import logo_letra from '../images/logo_letra.png'
import user from '../images/user.png'
import storage from '../Storage/storage'
import { url } from '../conection/env'

const Navbar = ({ sidebarHandle, sidebar, handleProfile }) => {

  return (
    <div className='navbar_contain'>
      <div className={'nabvar_logo ' + sidebar}>
        <img className='logo_escudo' src={logo_escudo} alt="logo" />
        <img className={'logo_letra ' + sidebar} src={logo_letra} alt="logo" />
      </div>
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
          {storage.get('authUser').profile_photo_path
            ? <img src={url + '/storage/' + storage.get('authUser').profile_photo_path} alt="user" />
            : <img src={user} alt="user" />
          }
        </div>
        <div className='nabvar_user_profile'>
          <span>{storage.get('authUser').name}</span>
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
