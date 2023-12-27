import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import storage from '../../Storage/storage'

import user from '../../images/user.png'
import UserLinks from './UserLinks'
import { url } from '../../conection/env'
import { show_alerta } from '../../components/MessageAlert'

import { useMutation } from 'react-query'
import { logout } from '../../api/authApi'

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

    const handlelogout = (e) => {
        e.preventDefault();
        cerrarSession.mutate(storage.get('authToken'));
    }

    const cerrarSession = useMutation({
        mutationFn: logout,
        onSuccess: (response) => {
            storage.remove('authToken');
            storage.remove('authUser');
            go('/login')
            show_alerta('Session Cerrada', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
        },
        onError: (error) => {
            if (error.toJSON().message === 'Network Error') {
                show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            }
            storage.remove('authToken');
            storage.remove('authUser');
            go('/login')
        },
    });

    return (
        <div>
            <button onClick={profileAdd} className={'sidebar_user ' + sidebar}>
                <div className={'user_image ' + sidebar}>
                    {usuario.imagen
                        ? <img src={url + '/storage/' + usuario.imagen} alt="user" />
                        : <img src={user} alt="user" />
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
                    <button onClick={handlelogout} className='user_link button_border'>
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
