import React from 'react'
import lineas from '../images/lineas_rojas.png'
import logo from '../images/logo.png'
import unauthorized from '../images/unauthorized.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Inautorized = () => {

    const go = useNavigate();

    const handleUnauthorized = () => {
        go('/admin');
        window.location.reload(false);
    }

    return (
        <>
            <div className='error_404'>
                <div className='error_404_linea_image'>
                    <img src={lineas} alt="lineas" />
                </div>
                <div className='error_404_contenedor'>
                    <div className='error_404_logo'>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='container-fluid row justify-content-center align-items-center'>
                        <div className='col-md-6 d-flex justify-content-center'>
                            <div className='not_found'>
                                <img src={unauthorized} alt="unauthorized" />
                            </div>
                        </div>
                    </div>

                    <div className='my-4'>
                        <button onClick={handleUnauthorized} className='error_401_button'>
                            <span>VOLVER</span>
                        </button>
                    </div>
                </div>
                <div className='error_404_linea_image'>
                    <img src={lineas} alt="lineas" />
                </div>
            </div>
        </>
    )
}

export default Inautorized
