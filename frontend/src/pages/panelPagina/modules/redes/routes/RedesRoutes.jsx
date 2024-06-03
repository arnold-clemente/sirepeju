import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexRedes from '../pages/IndexRedes';
import CreateRedes from '../pages/CreateRedes';
import EditRedes from '../pages/EditRedes';

const RedesRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexRedes />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateRedes />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:redId' element={<EditRedes />} />
                </Route>
            </Routes>
        </>
    )
}

export default RedesRoutes
