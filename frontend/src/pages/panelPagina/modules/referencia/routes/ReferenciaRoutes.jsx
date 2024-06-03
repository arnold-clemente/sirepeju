import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexReferencia from '../pages/IndexReferencia';

const ReferenciaRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexReferencia />} />
                </Route>
            </Routes>
        </>
    )
}

export default ReferenciaRoutes
