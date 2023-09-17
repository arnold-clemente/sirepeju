import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sendRequest, show_alerta } from '../functions'
import DivInput from '../components/DivInput'
import storage from '../Storage/storage'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const go = useNavigate();
  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
  }
  const login = async (e) => {
    try {
      e.preventDefault();
      await csrf();
      const form = { email: email, password: password };
      const res = await sendRequest('POST', form, '/api/auth/login', '');
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
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <div className="card border border-dark">
            <div className="card-header bg-dark border-primary border text-white">
              LOGIN
            </div>
          </div>
          <div className="card-body">
            <form action="" onSubmit={login}>
              <DivInput type='email' icon='fa-at' value={email}
                className='form-control' placeholder='Email' required='required'
                handleChange={(e) => setEmail(e.target.value)} />
              <DivInput type='password' icon='fa-key' value={password}
                className='form-control' placeholder='Password' required='required'
                handleChange={(e) => setPassword(e.target.value)} />
              <div className="d-grid col-10 mx-auto">
                <button className='btn btn-dark'>
                  <i className='fa-solid fa-door-open'></i>
                </button>
                <Link to='/register'>
                  <i className='fa-solid fa-user-plus'></i> Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
