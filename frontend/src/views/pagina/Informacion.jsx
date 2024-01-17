import { useState } from "react";
import { Link } from 'react-router-dom'
import trabajando from '../../images/constuccion.jpg'

const Informacion = () => {
  return (
    <div className="animate__animated animate__fadeIn">
    <div className='text-center'>
      <h1>Estamos Trabajando</h1>
      <span>Espera la proxima version en la Pagina</span>
    </div>

    <div className='trabajo_page'>
      <img src={trabajando} alt="trabajo" />
    </div>
    <div className='text-center'>
      <Link to='/admin' className='btn btn-primary'>
        Ingresar
      </Link>
    </div>
  </div>
  )
}

export default Informacion
