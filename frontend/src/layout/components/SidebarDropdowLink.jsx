import React from 'react'
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const SidebarDropdowLink = ({ icon, texto, path }) => {
    return (
        <NavLink to={path} className={({ isActive }) => 'decoration_text ' + (isActive ? 'active_simple_link' : '')}>
            <div className='button_dropdopn_link'>
                <i className={icon}></i>
                <span>{texto}</span>
            </div>
            {/* <div className='button_dropdopn_link'>
                <i className={icon}></i>
                <span>{texto}</span>
            </div> */}
        </NavLink >

    )
}


SidebarDropdowLink.defaultProps = {
    icon: propTypes.string.isRequired,
    texto: propTypes.string.isRequired,
    path: propTypes.string.isRequired,
}
export default SidebarDropdowLink
