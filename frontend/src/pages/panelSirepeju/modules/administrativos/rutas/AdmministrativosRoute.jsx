import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexAdministrativos from '../vistas/IndexAdm'
import CreateAdm from '../vistas/CreateAdm'
import EditAdm from '../vistas/EditAdm'

const AdmministrativosRoute = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedPermmision midleware={'administrativos'} />} >
          <Route path='/' element={<IndexAdministrativos />} />
        </Route>
        <Route element={<ProtectedPermmision midleware={'administrativo.store'} />} >
          <Route path='/crear' element={<CreateAdm />} />
        </Route>
        <Route element={<ProtectedPermmision midleware={'administrativo.update'} />} >
          <Route path='/editar/:adminId' element={<EditAdm />} />
        </Route>
      </Routes>
    </>

  )
}

export default AdmministrativosRoute
