import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexENlace from '../pages/IndexENlace';
import CreateEnlace from '../pages/CreateEnlace';
import EditarEnlace from '../pages/EditarEnlace';

const EnlaceRoute = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexENlace />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateEnlace />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:enlaceId' element={<EditarEnlace />} />
                </Route>
            </Routes>
        </>
    )
}

export default EnlaceRoute
