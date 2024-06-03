import React from 'react'
import lineas from 'assets/images/lineas_segundo.png'
import logo from 'assets/images/logo.png'
import not_found from 'assets/images/not_found.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
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
                        <div className='col-md-6'>
                            <div className='not_found'>
                                <img src={not_found} alt="not_found" />
                            </div>
                        </div>
                        <div className='col-md-6 error_404_letra'>
                            <h2>ERROR</h2>
                            <h1>404</h1>
                        </div>
                        <div className='text-center text-bold'>
                            <h1 className='fs-5'>PÁGINA NO ENCONTRADA</h1>
                        </div>
                    </div>
                    <div className='my-4'>
                        <Link to='/admin' className='error_404_button'>
                            <span>VOLVER</span>
                        </Link>
                    </div>
                </div>
                <div className='error_404_linea_image'>
                    <img src={lineas} alt="lineas" />
                </div>
            </div>
        </>
    )
}

export default NotFound
