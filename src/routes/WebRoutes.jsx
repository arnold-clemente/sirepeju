import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
// dashboard 
import Dashboard from '../views/Dashboard'

// para las rutas en los metodos Administrativos
import IndexAdministrativos from '../views/administrativos/IndexAdm'
import CreateAdm from '../views/administrativos/CreateAdm'
import EditAdm from '../views/administrativos/EditAdm'
//rutas para las gobernaciones
import IndexGob from '../views/gobernaciones/IndexGob'
import CreateGob from '../views/gobernaciones/CreateGob'
import EditGob from '../views/gobernaciones/EditGob'
//rutas para reservas 
import IndexReserva from '../views/Reserva/IndexReserva'
import CreateReserva from '../views/Reserva/CreateReserva'
import EditReserva from '../views/Reserva/EditReserva'
import HomReserva from '../views/Reserva/HomReserva'
// ruta de buscadores 
import Buscar from '../views/buscador/Buscar'
import BuscarReserva from '../views/buscador/BuscarReserva'

// rutas para registro 
import IndexReg from '../views/Registro/IndexReg'

//rutas para otorgacion
import IndexOtorgacion from '../views/otorgaciones/IndexOtorgacion'
import FundOtorgacion from '../views/otorgaciones/FundOtorgacion'
import IndesPersonalidad from '../views/personalidades/IndesPersonalidad'

//adecuciones
import IndexAdecuacion from '../views/adecuacion/IndexAdecuacion'
import CreateAdecuacion from '../views/adecuacion/CreateAdecuacion'
import FundAdecuacion from '../views/adecuacion/FundAdecuacion'


const WebRoutes = () => {

    const [menu, setmenu] = useState(false)
    const [sidebar, setsidebar] = useState('')

    const sidebarHandle = () => {
        setmenu(!menu);
        if (menu) {
            setsidebar('')
        } else {
            setsidebar('close')
        }
    }
    return (
        <div className='layout'>
            <Navbar sidebarHandle={sidebarHandle} sidebar={sidebar} />
            <Sidebar sidebar={sidebar} />
            <div className='div_falso'></div>
            <div className={'main_container ' + sidebar}>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    {/* administrativos  */}
                    <Route path='/administrativos' element={<IndexAdministrativos />} />
                    <Route path='/administrativo/create' element={<CreateAdm />} />
                    <Route path='/administrativo/edit/:adminId' element={<EditAdm />} />
                    {/* gobernaciones  */}
                    <Route path='/user-gobernaciones' element={<IndexGob />} />
                    <Route path='/user-gobernacion/create' element={<CreateGob />} />
                    <Route path='/user-gobernacion/edit/:gobernacionId' element={<EditGob />} />
                    {/* reservas  */}
                    <Route path='/reservas' element={<IndexReserva />} />
                    <Route path='/reserva/create' element={<CreateReserva />} />
                    <Route path='/reserva/edit/:reservaId' element={<EditReserva />} />
                    <Route path='/reserva-homonimia' element={<HomReserva />} />
                    {/* busqueda  */}
                    <Route path='/buscar/reserva' element={<Buscar />} />
                    <Route path='/buscar-reserva/:entidad' element={<BuscarReserva />} />
                    {/* Registro  */}
                    <Route path='/registro-reserva' element={<IndexReg />} />
                    {/* otorgacion */}
                    <Route path='/otorgaciones' element={<IndexOtorgacion />} />
                    <Route path='/otorgaciones/:otorgacionId/fundadores' element={<FundOtorgacion />} />
                    <Route path='/personalidades-juridicas' element={<IndesPersonalidad />} />
                    {/* adecuaciones */}
                    <Route path='/adecuaciones' element={<IndexAdecuacion />} />
                    <Route path='/adecuacion/crear' element={<CreateAdecuacion />} />
                    <Route path='/adecuacion/:adecuacionId/fundadores' element={<FundAdecuacion />} />
                </Routes>
            </div>
        </div>
    )
}

export default WebRoutes
