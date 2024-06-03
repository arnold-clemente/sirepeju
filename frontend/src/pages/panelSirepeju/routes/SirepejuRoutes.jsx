import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// rutas de errores 
import Inautorized from '../vistas/Inautorized'
import NotFound from '../vistas/NotFound'
import Dashboard from '../vistas/Dashboard'
// layout
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import Profile from '../layout/Profile'

// modules 
import AdmministrativosRoute from '../modules/administrativos/rutas/AdmministrativosRoute';
import UserGobRoutes from '../modules/user_gobernacion/routes/UserGobRoutes';
import RolesRoutes from '../modules/roles/routes/RolesRoutes';
import ReservaRoutes from '../modules/reservas/routes/ReservaRoutes';
import VerificacionRoute from '../modules/verificacion/routes/VerificacionRoute';
import OtorgacionRoutes from '../modules/otorgacion/routes/OtorgacionRoutes'
import AdecuacionRoutes from '../modules/adecuacion/routes/AdecuacionRoutes'
import GobernacionRoutes from '../modules/gobernacion/routes/GobernacionRoutes'
import ModificacionRoutes from '../modules/modificacion/routes/ModificacionRoutes'
import RegistradosRoutes from '../modules/registrados/routes/RegistradosRoutes'

const SirepejuRoutes = () => {

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
                    <Route path='/dashboard' element={<Dashboard />} />
                    {/* administrativos  */}
                    <Route path='/administrativos/*' element={<AdmministrativosRoute />} />
                    <Route path='/usuario-gobernaciones/*' element={<UserGobRoutes />} />
                    <Route path='/roles/*' element={<RolesRoutes />} />
                    <Route path='/reservas/*' element={<ReservaRoutes />} />
                    <Route path='/verificacion/*' element={<VerificacionRoute />} />
                    <Route path='/otorgaciones/*' element={<OtorgacionRoutes />} />
                    <Route path='/adecuaciones/*' element={<AdecuacionRoutes />} />
                    <Route path='/otorgaciones-gobernaciones/*' element={<GobernacionRoutes />} />
                    <Route path='/modificaciones/*' element={<ModificacionRoutes />} />
                    <Route path='/registrados/*' element={<RegistradosRoutes />} />
                    {/* //rutas de errores */}
                    <Route path='/no-autorizado' element={<Inautorized />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route path="/*" element={<Navigate replace to="/admin/404" />} />
                </Routes>
            </div>
        </div>
  )
}

export default SirepejuRoutes
