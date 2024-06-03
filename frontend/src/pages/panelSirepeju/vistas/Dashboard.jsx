import React from 'react'
import { useSelector } from 'react-redux'
import { updateSearch } from 'store/slices/panelSirepeju/searchSlice'

import PanelAdministrativos from '../modules/panel/vistas/PanelAdministrativos'
import PanelGobernacion from '../modules/panel/vistas/PanelGobernacion'

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
      {rol == 'gobernacion'
        ? <PanelGobernacion />
        : <PanelAdministrativos />
      }


    </div>
  )
}

export default Dashboard
