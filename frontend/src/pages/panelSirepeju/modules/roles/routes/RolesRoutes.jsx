import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexRoles from '../pages/IndexRoles';
import CreateRol from '../pages/CreateRol';
import EditRol from '../pages/EditRol';

const RolesRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'roles'} />} >
                    <Route path='/' element={<IndexRoles />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'rol.store'} />} >
                    <Route path='/crear' element={<CreateRol />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'rol.update'} />} >
                    <Route path='/editar/:rolId' element={<EditRol />} />
                </Route>
            </Routes>
        </>
    )
}

export default RolesRoutes
