import React from 'react'
import propTypes from 'prop-types'
import logo_escudo from '../images/logo_escudo.png'
import logo_letra from '../images/logo_letra.png'

const Navbar = ({ sidebarHandle, sidebar }) => {  

  return (
    <div className='navbar_contain'>
      <div className={'nabvar_logo '+sidebar}>
        <img className='logo_escudo' src={logo_escudo} alt="logo" />
        <img className={'logo_letra '+sidebar} src={logo_letra} alt="logo" />
      </div>
      <div className={'nabvar_content '+sidebar}>
        <button onClick={sidebarHandle} className={'menu_sidebar '+sidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="nabvar_text">
          <h1>SISTEMA DE REGISTRO DE PERSONALIDADES JURIDICAS</h1>
        </div>
      </div>
    </div>
  )
}
Navbar.defaultProps = {
  sidebarHandle: propTypes.func.isRequired,
  sidebar: propTypes.string.isRequired,
}

export default Navbar
