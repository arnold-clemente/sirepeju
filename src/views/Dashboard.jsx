import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [pame, pamecabiado] = useState({
    id: 1,
    nombre : 'Pamela',
    edad: 12,
    estatura: 2
  });

  const {edad, nombre} = pame

  const [saludo, setsaludo] = useState('hola');

  const handle = ({target}) => {
    pamecabiado({...pame, edad: 27});
  }


  return (
    <div>
      Bienvendio a sirepeju
      <div>{edad}</div>
      <div>{nombre}</div>

      <button onClick={handle} className='clase prueba'> cambiar</button>

    </div>
  )
}

export default Dashboard
