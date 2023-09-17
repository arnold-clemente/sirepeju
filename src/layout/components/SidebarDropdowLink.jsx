import React from 'react'
import propTypes from 'prop-types'

const SidebarDropdowLink = ({ icon, texto }) => {
    return (
        <div className='button_dropdopn_link'>
            <i className={icon}></i>
            <span>{texto}</span>
        </div>
    )
}


SidebarDropdowLink.defaultProps = {
    icon: propTypes.string.isRequired,
    texto: propTypes.string.isRequired
}
export default SidebarDropdowLink
