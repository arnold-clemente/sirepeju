import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexModificacion from '../pages/IndexModificacion'

const ModificacionRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'modificaciones'} />} >
                    <Route path='/' element={<IndexModificacion />} />
                </Route>
            </Routes>
        </>
    )
}

export default ModificacionRoutes
