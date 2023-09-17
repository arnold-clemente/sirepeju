import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import user from '../../images/user.png'
import UserLinks from './UserLinks'
import storage from '../../Storage/storage'

const UserCard = ({ sidebar }) => {
    const [profile, setprofile] = useState(false)
    const [dropdown, setdropdown] = useState('')
    const profileAdd = () => {
        setprofile(!profile);
        if (profile) {
            setdropdown('')
        } else {
            setdropdown('dropdown')
        }
    }

    const go = useNavigate();
    const logout = async () => {
        storage.remove('authToken');
        storage.remove('authUser');
        await axios.get('/api/auth/logout', storage.get('authToken'));
        go('/login')
    }

    return (
        <div>
            <button onClick={profileAdd} className={'sidebar_user ' + sidebar}>
                <div className={'user_image ' + sidebar}>
                    <img src={user} alt="user" />
                </div>
                <div className={'user_profile ' + sidebar}>
                    <span>{storage.get('authUser').name}</span>
                </div>
                <div className={'user_icondropdown ' + dropdown}>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </button>
            {profile === false
                ? ''
                : <div className={'user_links ' + sidebar + ' animate__animated animate__fadeIn'}>
                    <UserLinks icon='fa-solid fa-gear' text='Perfil' />
                    <button onClick={logout} className='user_link button_border'>
                        <i className='fa-solid fa-power-off'></i>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            }

        </div>
    )
}
UserCard.defaultProps = {
    sidebar: propTypes.string.isRequired,
}

export default UserCard
