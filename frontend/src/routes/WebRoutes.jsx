import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// layout
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import Profile from '../layout/Profile'
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
//rutas homonimia
import HomReserva from '../views/homonimia/HomReserva'
// rutas para registro 
import IndexReg from '../views/Registro/IndexReg'
import IndexRegCaducados from '../views/registro_caducados/IndexRegCaducados'
// ruta de buscadores 
import Buscar from '../views/buscador/Buscar'
import BuscarReserva from '../views/buscador/BuscarReserva'

//rutas para otorgacion
import IndexOtorgacion from '../views/otorgaciones/IndexOtorgacion'
import FundOtorgacion from '../views/otorgaciones/FundOtorgacion'
//otorgacion personalidades
import OtorgacionPersonalidades from '../views/otorgacion_personalidades/OtorgacionPersonalidades'
// otorgacion revocados 
import OtorgacionRevocados from '../views/otorgacion_revocados/OtorgacionRevocados'
// otorgacion modificados 
import IndexModificacionOtor from '../views/modificacion_otorgacion/IndexModificacionOtor'
// otorgacion archivados 
import OtorgacionArchivados from '../views/otorgacion_archivados/OtorgacionArchivados'
// otorgacion caducados 
import OtorgacionCaducados from '../views/otorgacion_caducados/OtorgacionCaducados'

//adecuciones
import IndexAdecuacion from '../views/adecuacion/IndexAdecuacion'
import CreateAdecuacion from '../views/adecuacion/CreateAdecuacion'
import FundAdecuacion from '../views/adecuacion/FundAdecuacion'
import PersAdecuacion from '../views/adecuacion_personalidades/PersAdecuacion'
import RevAdecuacion from '../views/adecuacion_revocados/RevAdecuacion'
import IndexModificacionAd from '../views/modificacion_adecuacion/IndexModificacionAd'
// adecuacion archivados 
import IndexAdecuacionArchivados from '../views/adecuacion_archivados/IndexAdecuacionArchivados'
// adecuacion caducados 
import IndexAdecuacionCaducados from '../views/adecuacion_caducados/IndexAdecuacionCaducados'

//otorgaciones gobernacion
import IndexOtorgacionGob from '../views/otorgaciongobs/IndexOtorgacionGob'
import CreateOtorgacionGob from '../views/otorgaciongobs/CreateOtorgacionGob'
import EditOtorgacionGob from '../views/otorgaciongobs/EditOtorgacionGob'

// modificaciones 
import IndexModificacion from '../views/modificacion/IndexModificacion'

//registrados
import IndexRegistrados from '../views/registrados/IndexRegistrados'
import CreatedRegistrados from '../views/registrados/CreatedRegistrados'
import EditRegistrados from '../views/registrados/EditRegistrados'

const WebRoutes = () => {

    const [menu, setmenu] = useState(false);
    const [sidebar, setsidebar] = useState('');
    const [profile, setProfile] = useState(false);

    const sidebarHandle = () => {
        setmenu(!menu);
        if (menu) {
            setsidebar('')
        } else {
            setsidebar('close')
        }
    }

    const handleProfile = () =>{
        setProfile(!profile);
    }

    const closeProfile = () => {
        setProfile(false)
    }

    return (
        <div className='layout'>
            <Navbar sidebarHandle={sidebarHandle} sidebar={sidebar} handleProfile={handleProfile}/>
            <Sidebar sidebar={sidebar} handleProfile={handleProfile}/>
            <Profile modal={profile} closeModal={closeProfile}/>
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
                    <Route path='/registro-caducados' element={<IndexRegCaducados />} />
                    {/* otorgacion */}
                    <Route path='/otorgaciones' element={<IndexOtorgacion />} />
                    <Route path='/otorgaciones/:otorgacionId/fundadores' element={<FundOtorgacion />} />
                    <Route path='/otorgacion/personalidades-juridicas' element={<OtorgacionPersonalidades />} />
                    <Route path='/otorgacion/revocados' element={<OtorgacionRevocados />} />
                    <Route path='/otorgacion/modificaciones' element={<IndexModificacionOtor />} />
                    <Route path='/otorgacion/archivados' element={<OtorgacionArchivados />} />
                    <Route path='/otorgacion/caducados' element={<OtorgacionCaducados />} />
                    {/* adecuaciones */}
                    <Route path='/adecuaciones' element={<IndexAdecuacion />} />
                    <Route path='/adecuacion/crear' element={<CreateAdecuacion />} />
                    <Route path='/adecuacion/:adecuacionId/fundadores' element={<FundAdecuacion />} />
                    <Route path='/adecuacion/personalidades' element={<PersAdecuacion />} />
                    <Route path='/adecuacion/revocados' element={<RevAdecuacion />} />
                    <Route path='/adecuacion/modificaciones' element={<IndexModificacionAd />} />
                    <Route path='/adecuacion/archivados' element={<IndexAdecuacionArchivados />} />
                    <Route path='/adecuacion/caducados' element={<IndexAdecuacionCaducados />} />
                    {/* otorgacion gobernaciones */}
                    <Route path='/otorgaciones-gobernaciones' element={<IndexOtorgacionGob />} />
                    <Route path='/otorgaciones-gobernaciones/create' element={<CreateOtorgacionGob />} />
                    <Route path='/otorgaciones-gobernaciones/edit/:otorgacionGobId' element={<EditOtorgacionGob />} />
                    {/* modificacions  */}
                    <Route path='/modificaciones' element={<IndexModificacion />} />
                    {/* registrados  */}
                    <Route path='/registrados' element={<IndexRegistrados  />} />
                    <Route path='/registrado/create' element={<CreatedRegistrados  />} />
                    <Route path='/registrado/edit/:registradoId' element={<EditRegistrados  />} />
                </Routes>
            </div>
        </div>
    )
}

export default WebRoutes
