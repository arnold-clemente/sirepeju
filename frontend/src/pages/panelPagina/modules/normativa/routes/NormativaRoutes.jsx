import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexNormativa from '../pages/IndexNormativa';
import CreateNormativa from '../pages/CreateNormativa';
import EditNormativa from '../pages/EditNormativa';

const NormativaRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexNormativa />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateNormativa />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:normativaId' element={<EditNormativa />} />
                </Route>
            </Routes>
        </>
    )
}

export default NormativaRoutes
