import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexReserva from '../pages/solicitud/IndexReserva';
import CreateReserva from '../pages/solicitud/CreateReserva';
import EditReserva from '../pages/solicitud/EditReserva';
import HomReserva from '../pages/homonimias/HomReserva';
import IndexReg from '../pages/reservados/IndexReg';
import IndexRegCaducados from '../pages/caducados/IndexRegCaducados';

const ReservaRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<ProtectedPermmision midleware={'reservas.solicitudes'} />} >
                    <Route exact path='/solicitudes' element={<IndexReserva />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'reserva.store'} />} >
                    <Route exact  path='/crear' element={<CreateReserva />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'reserva.update'} />} >
                    <Route exact  path='/editar/:reservaId' element={<EditReserva />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'reservas.homonimias'} />} >
                    <Route exact path='/homonimias' element={<HomReserva />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'reservas.reservados'} />} >
                    <Route path='/reservados' element={<IndexReg />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'reservas.caducados'} />} >
                    <Route path='/caducados' element={<IndexRegCaducados />} />
                </Route>
            </Routes>
        </>
    )
}

export default ReservaRoutes
