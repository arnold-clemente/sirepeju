import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexAdecuacion from '../pages/adecuacion/IndexAdecuacion';
import CreateAdecuacion from '../pages/adecuacion/CreateAdecuacion';
import FundAdecuacion from '../pages/adecuacion/FundAdecuacion';
import PersAdecuacion from '../pages/personalidad/PersAdecuacion';
import RevAdecuacion from '../pages/revocados/RevAdecuacion';
import IndexModificacionAd from '../pages/modificacion/IndexModificacionAd';
import IndexAdecuacionArchivados from '../pages/archivados/IndexAdecuacionArchivados';
import IndexAdecuacionCaducados from '../pages/caducados/IndexAdecuacionCaducados';
import AdecuacionExtinguidas from '../pages/extinguidas/AdecuacionExtinguidas';

const AdecuacionRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'adecuaciones'} />} >
                    <Route path='/procesos' element={<IndexAdecuacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuacion.store'} />} >
                    <Route path='/crear' element={<CreateAdecuacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuacion.personalidad'} />} >
                    <Route path='/:adecuacionId/fundadores' element={<FundAdecuacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuaciones.personalidades'} />} >
                    <Route path='/personalidades' element={<PersAdecuacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuaciones.revocatorias'} />} >
                    <Route path='/revocados' element={<RevAdecuacion />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuaciones.modificaciones'} />} >
                    <Route path='/modificaciones' element={<IndexModificacionAd />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuaciones.archivados'} />} >
                    <Route path='/archivados' element={<IndexAdecuacionArchivados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuaciones.caducados'} />} >
                    <Route path='/caducados' element={<IndexAdecuacionCaducados />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'adecuaciones.extinguidas'} />} >
                    <Route path='/extinguidas' element={<AdecuacionExtinguidas />} />
                </Route>
            </Routes>
        </>
    )
}

export default AdecuacionRoutes
