import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateSearch } from '../store/slices/searchSlice'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'


const Dashboard = () => {

  const roles = useSelector(state => state.userStore.roles)
  const permisos = useSelector(state => state.userStore.permisos)
  const rol = roles[0];

  const color = ['color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'color_6', 'color_7', 'color_8']
  const icons_tipo = [
    'fa-solid fa-file-circle-question', //reserva
    'fa-solid fa-file-shield', //otorgacion
    'fa-solid fa-rectangle-ad', // adecuacion
    'fa-solid fa-file-arrow-up', //gobernacion
    'fa-solid fa-pen-to-square', //modificacion
    'fa-regular fa-bookmark', //registrados
  ]



  const handleModificar = () => {
    dispatch(updateSearch('Buscando'));
  }
  // for(let i=0; i<permisos.length; i++){
  //   console.log(permisos[i])
  // }

  console.log(roles)

  return (
    <div>
      <Banner text={'DASHBOARD'} />
      {/* <Link to='/administrativos' type="submit" className="btn btn-success my-4">Administrativos</Link> */}

      <div className='sirepeju_dashboard my-2'>
        <div className='dashboard_panel'>
          <div className='panel_result color_1'>
            <div className='panel_contenedor'>
              <div className='panel_letra'>
                <h1>150</h1>
                <p>Nueva Otorgacion</p>
              </div>
              <div className='panel_icon'>
                <i className='fa-solid fa-file-circle-question'></i>
              </div>
            </div>
            <button className='button_panel'>
              <span className='mx-2'>Más Informacion</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {/* //2 */}
          <div className='panel_result color_1'>
            <div className='panel_contenedor'>
              <div className='panel_letra'>
                <h1>150</h1>
                <p>Nueva Otorgacion</p>
              </div>
              <div className='panel_icon'>
                <i className='fa-solid fa-file-circle-question'></i>
              </div>
            </div>
            <button className='button_panel'>
              <span className='mx-2'>Más Informacion</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {/* 3 */}
          <div className='panel_result color_1'>
            <div className='panel_contenedor'>
              <div className='panel_letra'>
                <h1>150</h1>
                <p>Nueva Otorgacion</p>
              </div>
              <div className='panel_icon'>
                <i className='fa-solid fa-file-circle-question'></i>
              </div>
            </div>
            <button className='button_panel'>
              <span className='mx-2'>Más Informacion</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {/* 4 */}
          <div className='panel_result color_1'>
            <div className='panel_contenedor'>
              <div className='panel_letra'>
                <h1>150</h1>
                <p>Nueva Otorgacion</p>
              </div>
              <div className='panel_icon'>
                <i className='fa-solid fa-file-circle-question'></i>
              </div>
            </div>
            <button className='button_panel'>
              <span className='mx-2'>Más Informacion</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
