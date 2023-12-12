import React from 'react'
import propTypes from 'prop-types'

const UserLinks = ({icon, text, handleProfile}) => {
    return (
        <button onClick={handleProfile} className='user_link'>
            <i className={icon}></i>
            <span>{text}</span>
        </button>
    )
}


UserLinks.defaultProps = {
    icon: propTypes.string.isRequired,    
    text: propTypes.string.isRequired,
    handleProfile: propTypes.func.isRequired
}

export default UserLinks


