import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexRequisito from '../pages/IndexRequisito';
import CreateRequisito from '../pages/CreateRequisito';
import EditRequisito from '../pages/EditRequisito';

const RequisitoRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexRequisito />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateRequisito />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:requisitoId' element={<EditRequisito />} />
                </Route>
            </Routes>
        </>
    )
}

export default RequisitoRoutes
