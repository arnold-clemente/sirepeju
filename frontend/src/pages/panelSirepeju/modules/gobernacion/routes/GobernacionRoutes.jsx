import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexOtorgacionGob from '../pages/IndexOtorgacionGob';
import CreateOtorgacionGob from '../pages/CreateOtorgacionGob';
import EditOtorgacionGob from '../pages/EditOtorgacionGob';

const GobernacionRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'otorgacion.gobernaciones'} />} >
                    <Route path='/' element={<IndexOtorgacionGob />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgacion.gobernacion.store'} />} >
                    <Route path='/crear' element={<CreateOtorgacionGob />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgacion.gobernacion.update'} />} >
                    <Route path='/editar/:otorgacionGobId' element={<EditOtorgacionGob />} />
                </Route>
            </Routes>
        </>
    )
}

export default GobernacionRoutes
