import React from 'react'
import propTypes from 'prop-types'

const UserLinks = ({icon, text}) => {
    return (
        <div className='user_link'>
            <i className={icon}></i>
            <span>{text}</span>
        </div>
    )
}


UserLinks.defaultProps = {
    icon: propTypes.string.isRequired,    
    text: propTypes.string.isRequired
}

export default UserLinks


