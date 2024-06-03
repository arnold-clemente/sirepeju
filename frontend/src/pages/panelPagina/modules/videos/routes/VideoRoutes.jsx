import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexVideo from '../pages/IndexVideo';
import CreateVideo from '../pages/CreateVideo';
import EditVIdeo from '../pages/EditVIdeo';

const VideoRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexVideo />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateVideo />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:videoId' element={<EditVIdeo />} />
                </Route>
            </Routes>
        </>
    )
}

export default VideoRoutes
