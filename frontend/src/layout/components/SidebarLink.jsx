import React from 'react'
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const SidebarLink = ({ icon, texto, path, sidebar }) => {
    return (
        <NavLink to={path} className={ ({isActive}) => 'decoration_text ' + ( isActive ? 'active_simple_link' : '')}>
            <div className={'link_sidebar_simple ' + sidebar}>
                <i className={icon}></i>
                <span>{texto}</span>
            </div>
        </NavLink>
    )
}

SidebarLink.defaultProps = {
    icon: propTypes.string.isRequired,
    texto: propTypes.string.isRequired,
    path: propTypes.string.isRequired,
    sidebar: propTypes.string.isRequired
}
export default SidebarLink
