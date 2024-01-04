import React, { useState } from 'react'

import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

import logo from '../../images/logo.png';
import { show_alerta } from '../../components/MessageAlert';
import storage from '../../Storage/storage';

import { useMutation } from 'react-query';
import { login } from '../../api/authApi';

import { useDispatch } from 'react-redux'
import { updateUser, updateRol, updatePermisos } from '../../store/slices/userSlice';

const Login = () => {

    const dispatch = useDispatch();
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState('password')
    const [icon, setIcon] = useState('fa-solid fa-eye')

    const [formValues, handleInputChange] = useForm({
        email: 'admin@admin.com',
        password: 'Sirepeju#12345678',
    })

    const { email, password } = formValues;

    const go = useNavigate();

    const handlelogin = (e) => {
        e.preventDefault();
        setCargando(true);
        iniciarSesion.mutate(formValues);
    }

    const iniciarSesion = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response.status === true) {
                dispatch(updateUser(response.user));
                dispatch(updateRol(response.roles));
                dispatch(updatePermisos(response.permission));
                storage.set('authToken', response.token)
                storage.set('authUser', response.data);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
                show_alerta('Bienvenido a Sirepeju', '<i class="fa-solid fa-check border_alert_green"></i>', 'alert_green')
                setCargando(false);
                go('/admin')
            } else {
                setCargando(false);
                setError(response.errors)
                show_alerta('Credenciales no concuerdan', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red');

            }
        },
        onError: (error) => {
            setCargando(false);
            if (error.toJSON().message === 'Network Error') {
                show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            }

        },
    });

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible('text');
            setIcon('fa-solid fa-eye-slash');
        }
        if (visible == 'text') {
            setVisible('password');
            setIcon('fa-solid fa-eye');
        }

        setTimeout(() => {
            setVisible('password');
            setIcon('fa-solid fa-eye');
        }, 2000)
    }

    return (
        <div>
            <div className="login_container">
                <div className="logo_login">
                    <img src={logo} alt="logo" />
                </div>
                <div className="login_form">
                    <div className="form_logo">
                        <i className="fa-solid fa-user"></i>
                        <h5>PERSONALIDADES JURIDICAS</h5>
                    </div>
                    <div className='container-fluid text-center'>
                        <span className='fs-6 text-danger'>{error}</span>
                    </div>
                    <form onSubmit={handlelogin}>
                        <div className="login_form_input">
                            <div className="input_icon">
                                <i className='fas fa-lock'></i>
                            </div>
                            <div className='input_animado'>
                                {cargando
                                    ? <input
                                        type="text"
                                        placeholder="Usuario"
                                        name="email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    : <input
                                        type="text"
                                        placeholder="Usuario"
                                        name="email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleInputChange}
                                    />}
                            </div>
                        </div>
                        <div className="login_form_input">
                            <div className="input_icon">
                                <i className='fas fa-lock'></i>
                            </div>
                            <div className='input_animado'>
                                {cargando
                                    ? <input
                                        type={visible}
                                        placeholder="Password"
                                        name="password"
                                        autoComplete="off"
                                        value={password}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    : <input
                                        type={visible}
                                        placeholder="Password"
                                        name="password"
                                        autoComplete="off"
                                        value={password}
                                        onChange={handleInputChange}
                                    />

                                }
                            </div>
                            <i onClick={handleVisible} className={icon + ' visible_password'}></i>
                        </div>
                        {cargando
                            ? <div className='login_contenedor_cargando'>
                                <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
                                <span>Espere...</span>
                            </div>
                            : <button type='submit'>
                                <span>LOGIN</span>
                            </button>
                        }
                    </form>
                </div>
                <div className="login_text">
                    <p>@ TODOS LOS DERECHOS RESERVADOS </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
