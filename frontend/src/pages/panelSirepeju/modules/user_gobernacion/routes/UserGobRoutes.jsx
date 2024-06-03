import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexGob from '../pages/IndexGob';
import EditGob from '../pages/EditGob';
import CreateGob from '../pages/CreateGob';

const UserGobRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedPermmision midleware={'gobernacions'} />} >
          <Route path='/' element={<IndexGob />} />
        </Route>
        <Route element={<ProtectedPermmision midleware={'gobernacion.store'} />} >
          <Route path='/crear' element={<CreateGob />} />
        </Route>
        <Route element={<ProtectedPermmision midleware={'gobernacion.update'} />} >
          <Route path='/editar/:gobernacionId' element={<EditGob />} />
        </Route>
      </Routes>
    </>
  )
}

export default UserGobRoutes
