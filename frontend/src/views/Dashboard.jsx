import React from 'react'
import { useSelector } from 'react-redux'
import { updateSearch } from '../store/slices/searchSlice'
import Banner from '../components/Banner'
import AdministrativoDashboard from './dashboard/AdministrativoDashboard'
import GobernacionDashboard from './dashboard/GobernacionDashboard'


const Dashboard = () => {

  const roles = useSelector(state => state.userStore.roles)
  const rol = roles[0];


  const handleModificar = () => {
    dispatch(updateSearch('Buscando'));
  }
  // for(let i=0; i<permisos.length; i++){
  //   console.log(permisos[i])
  // }


  return (
    <div>
      {/* <Link to='/administrativos' type="submit" className="btn btn-success my-4">Administrativos</Link> */}

      {rol == 'gobernacion'
        ? <GobernacionDashboard />
        : <AdministrativoDashboard />
      }


    </div>
  )
}

export default Dashboard
