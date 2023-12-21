import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import storage from '../../Storage/storage'

import user from '../../images/user.png'
import UserLinks from './UserLinks'
import { url } from '../../conection/env'

const UserCard = ({ sidebar, handleProfile }) => {
    const [profile, setprofile] = useState(false)
    const [dropdown, setdropdown] = useState('')

    const usuario = useSelector(state => state.userStore.user);


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
                    {usuario.imagen
                        ?<img src={url + '/storage/' +  usuario.imagen} alt="user" />
                        :<img src={user} alt="user" />
                    }
                </div>
                <div className={'user_profile ' + sidebar}>
                    <span>{usuario.nombre}</span>
                </div>
                <div className={'user_icondropdown ' + dropdown}>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </button>
            {profile === false
                ? ''
                : <div className={'user_links ' + sidebar + ' animate__animated animate__fadeIn'}>
                    <UserLinks handleProfile={handleProfile} icon='fa-solid fa-gear' text='Perfil' />
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
    handleProfile: propTypes.func.isRequired,
}

export default UserCard
