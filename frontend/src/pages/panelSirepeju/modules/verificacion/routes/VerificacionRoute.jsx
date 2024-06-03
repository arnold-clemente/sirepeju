import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import Buscar from '../pages/Buscar'

const VerificacionRoute = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'verificacion.entidades'} />} >
                    <Route path='/' element={<Buscar />} />
                </Route>
            </Routes>
        </>
    )
}

export default VerificacionRoute
