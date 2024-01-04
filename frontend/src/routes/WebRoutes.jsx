import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedPermmision from '../protected/ProtectedPermmision'

// rutas de errores 
import Inautorized from '../views/Inautorized'
import NotFound from '../views/NotFound'

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
//otorgacion extinguidas 
import OtorgacionExtinguidas from '../views/otorgacion_extinguidas/OtorgacionExtinguidas'

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
import AdecuacionExtinguidas from '../views/adecuacion_extinguidas/AdecuacionExtinguidas'

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

//rutas de roles 
import IndexRoles from '../views/roles/IndexRoles'
import CreateRol from '../views/roles/CreateRol'
import EditRol from '../views/roles/EditRol'

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

    const handleProfile = () => {
        setProfile(!profile);
    }

    const closeProfile = () => {
        setProfile(false)
    }

    return (
        <div className='layout'>
            <Navbar sidebarHandle={sidebarHandle} sidebar={sidebar} handleProfile={handleProfile} />
            <Sidebar sidebar={sidebar} handleProfile={handleProfile} />
            <Profile modal={profile} closeModal={closeProfile} />
            <div className='div_falso'></div>
            <div className={'main_container ' + sidebar}>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    {/* administrativos  */}
                    <Route element={<ProtectedPermmision midleware={'administrativos'} />} >
                        <Route path='/administrativos' element={<IndexAdministrativos />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'administrativo.store'} />} >
                        <Route path='/administrativo/crear' element={<CreateAdm />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'administrativo.update'} />} >
                        <Route path='/administrativo/editar/:adminId' element={<EditAdm />} />
                    </Route>
                    {/* gobernaciones  */}
                    <Route element={<ProtectedPermmision midleware={'gobernacions'} />} >
                        <Route path='/gobernaciones' element={<IndexGob />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'gobernacion.store'} />} >
                        <Route path='/gobernacion/crear' element={<CreateGob />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'gobernacion.update'} />} >
                        <Route path='/gobernacion/editar/:gobernacionId' element={<EditGob />} />
                    </Route>
                    {/* reservas  */}
                    <Route element={<ProtectedPermmision midleware={'reservas.solicitudes'} />} >
                        <Route path='/reservas' element={<IndexReserva />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'reserva.store'} />} >
                        <Route path='/reserva/crear' element={<CreateReserva />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'reserva.update'} />} >
                        <Route path='/reserva/editar/:reservaId' element={<EditReserva />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'reservas.homonimias'} />} >
                        <Route path='/reserva/homonimias' element={<HomReserva />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'reservas.reservados'} />} >
                        <Route path='/reserva/reservados' element={<IndexReg />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'reservas.caducados'} />} >
                        <Route path='/reserva/caducados' element={<IndexRegCaducados />} />
                    </Route>
                    {/* busqueda  */}
                    <Route element={<ProtectedPermmision midleware={'verificacion.entidades'} />} >
                        <Route path='/verificar/reserva' element={<Buscar />} />
                    </Route>
                    {/* otorgacion */}
                    <Route element={<ProtectedPermmision midleware={'otorgaciones'} />} >
                        <Route path='/otorgaciones' element={<IndexOtorgacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgacion.personalidad'} />} >
                        <Route path='/otorgaciones/:otorgacionId/fundadores' element={<FundOtorgacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgaciones.personalidades'} />} >
                        <Route path='/otorgacion/personalidades-juridicas' element={<OtorgacionPersonalidades />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgaciones.revocatorias'} />} >
                        <Route path='/otorgacion/revocados' element={<OtorgacionRevocados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgaciones.modificaciones'} />} >
                        <Route path='/otorgacion/modificaciones' element={<IndexModificacionOtor />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgaciones.archivados'} />} >
                        <Route path='/otorgacion/archivados' element={<OtorgacionArchivados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgaciones.caducados'} />} >
                        <Route path='/otorgacion/caducados' element={<OtorgacionCaducados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgaciones.extinguidas'} />} >
                        <Route path='/otorgacion/extinguidas' element={<OtorgacionExtinguidas />} />
                    </Route>
                    {/* adecuaciones */}
                    <Route element={<ProtectedPermmision midleware={'adecuaciones'} />} >
                        <Route path='/adecuaciones' element={<IndexAdecuacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuacion.store'} />} >
                        <Route path='/adecuacion/crear' element={<CreateAdecuacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuacion.personalidad'} />} >
                        <Route path='/adecuacion/:adecuacionId/fundadores' element={<FundAdecuacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuaciones.personalidades'} />} >
                        <Route path='/adecuacion/personalidades' element={<PersAdecuacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuaciones.revocatorias'} />} >
                        <Route path='/adecuacion/revocados' element={<RevAdecuacion />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuaciones.modificaciones'} />} >
                        <Route path='/adecuacion/modificaciones' element={<IndexModificacionAd />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuaciones.archivados'} />} >
                        <Route path='/adecuacion/archivados' element={<IndexAdecuacionArchivados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuaciones.caducados'} />} >
                        <Route path='/adecuacion/caducados' element={<IndexAdecuacionCaducados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'adecuaciones.extinguidas'} />} >
                        <Route path='/adecuacion/extinguidas' element={<AdecuacionExtinguidas />} />
                    </Route>
                    {/* otorgacion gobernaciones */}
                    <Route element={<ProtectedPermmision midleware={'otorgacion.gobernaciones'} />} >
                        <Route path='/otorgaciones-gobernaciones' element={<IndexOtorgacionGob />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgacion.gobernacion.store'} />} >
                        <Route path='/otorgaciones-gobernaciones/create' element={<CreateOtorgacionGob />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'otorgacion.gobernacion.update'} />} >
                        <Route path='/otorgaciones-gobernaciones/edit/:otorgacionGobId' element={<EditOtorgacionGob />} />
                    </Route>
                    {/* modificacions  */}
                    <Route element={<ProtectedPermmision midleware={'modificaciones'} />} >
                        <Route path='/modificaciones' element={<IndexModificacion />} />
                    </Route>
                    {/* registrados  */}
                    <Route element={<ProtectedPermmision midleware={'registrados'} />} >
                        <Route path='/registrados' element={<IndexRegistrados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'registrado.store'} />} >
                        <Route path='/registrado/create' element={<CreatedRegistrados />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'registrado.update'} />} >
                        <Route path='/registrado/edit/:registradoId' element={<EditRegistrados />} />
                    </Route>
                    {/* roles  */}
                    <Route element={<ProtectedPermmision midleware={'roles'} />} >
                        <Route path='/roles' element={<IndexRoles />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'rol.store'} />} >
                        <Route path='/rol/crear' element={<CreateRol />} />
                    </Route>
                    <Route element={<ProtectedPermmision midleware={'rol.update'} />} >
                        <Route path='/rol/editar/:rolId' element={<EditRol />} />
                    </Route>
                    {/* //rutas de errores */}
                    <Route path='/no-autorizado' element={<Inautorized />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route path="/*" element={<Navigate replace to="/admin/404" />} />
                </Routes>
            </div>
        </div>
    )
}

export default WebRoutes
