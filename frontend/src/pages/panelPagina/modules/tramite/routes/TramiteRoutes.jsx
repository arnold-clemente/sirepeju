import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexTramite from '../pages/IndexTramite';
import CreateTramite from '../pages/CreateTramite';
import EditTramite from '../pages/EditTramite';

const TramiteRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexTramite />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateTramite />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:tramiteId' element={<EditTramite />} />
                </Route>
            </Routes>
        </>
    )
}

export default TramiteRoutes
