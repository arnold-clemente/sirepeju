import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexRegistrados from '../pages/IndexRegistrados';
import CreatedRegistrados from '../pages/CreatedRegistrados';
import EditRegistrados from '../pages/EditRegistrados';

const RegistradosRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'registrados'} />} >
                    <Route path='/' element={<IndexRegistrados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'registrado.store'} />} >
                    <Route path='/crear' element={<CreatedRegistrados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'registrado.update'} />} >
                    <Route path='/editar/:registradoId' element={<EditRegistrados />} />
                </Route>
            </Routes>
        </>
    )
}

export default RegistradosRoutes
