import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexOtorgacion from '../pages/otorgacion/IndexOtorgacion'
import FundOtorgacion from '../pages/otorgacion/FundOtorgacion'
import OtorgacionRevocados from '../pages/revocados/OtorgacionRevocados'
import OtorgacionPersonalidades from '../pages/personalidad/OtorgacionPersonalidades'
import OtorgacionExtinguidas from '../pages/extinguidas/OtorgacionExtinguidas'
import OtorgacionArchivados from '../pages/archivados/OtorgacionArchivados'
import IndexModificacionOtor from '../pages/modificacion/IndexModificacionOtor'
import OtorgacionCaducados from '../pages/caducados/OtorgacionCaducados'

const OtorgacionRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'otorgaciones'} />} >
                    <Route path='/procesos' element={<IndexOtorgacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgacion.personalidad'} />} >
                    <Route path='/:otorgacionId/fundadores' element={<FundOtorgacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgaciones.personalidades'} />} >
                    <Route path='/personalidades-juridicas' element={<OtorgacionPersonalidades />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgaciones.archivados'} />} >
                    <Route path='/archivados' element={<OtorgacionArchivados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgaciones.modificaciones'} />} >
                    <Route path='/modificaciones' element={<IndexModificacionOtor />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgaciones.caducados'} />} >
                    <Route path='/caducados' element={<OtorgacionCaducados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgaciones.revocatorias'} />} >
                    <Route path='/revocados' element={<OtorgacionRevocados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'otorgaciones.extinguidas'} />} >
                    <Route path='/extinguidas' element={<OtorgacionExtinguidas />} />
                </Route>
            </Routes>
        </>
    )
}

export default OtorgacionRoutes
