import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { sendRequest, show_alerta } from '../../components/functions';
import storage from '../../Storage/storage'

const Login = () => {

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '12345678',
    })

    const { email, password } = formValues;

    const go = useNavigate();
    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie');
    }
    const login = async (e) => {
        try {
            e.preventDefault();
            await csrf();
            const res = await sendRequest('POST', formValues, '/api/auth/login', '');
            if (res.status === true) {
                storage.set('authToken', res.token)
                storage.set('authUser', res.data);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.token
                go('/')
            }
        } catch (error) {
            if (error.toJSON().message === 'Network Error') {
                show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
            }
        }
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
                    <form onSubmit={login}>
                        <div className="login_form_input">
                            <div className="input_icon">
                                <i className='fas fa-lock'></i>
                            </div>
                            <div className='input_animado'>
                                <input
                                    type="text"
                                    placeholder="Usuario"
                                    name="email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="login_form_input">
                            <div className="input_icon">
                                <i className='fas fa-lock'></i>
                            </div>
                            <div className='input_animado'>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button type='submit'>
                            <span>LOGIN</span>
                        </button>
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
