import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// rutas de errores 
import Inautorized from '../vistas/Inautorized'
import NotFound from '../vistas/NotFound'
// layout
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import Profile from '../layout/Profile'

//rutas 
import SliderRoutes from '../modules/slider/routes/SliderRoutes'
import VideoRoutes from '../modules/videos/routes/VideoRoutes'
import EnlaceRoute from '../modules/enlace/routes/EnlaceRoute'
import NoticiaRoutes from '../modules/noticia/routes/NoticiaRoutes'
import RequisitoRoutes from '../modules/requisito/routes/RequisitoRoutes'
import TramiteRoutes from '../modules/tramite/routes/TramiteRoutes'
import ReglamentoRoues from '../modules/reglamentos/routes/ReglamentoRoues'
import NormativaRoutes from '../modules/normativa/routes/NormativaRoutes'
import RedesRoutes from '../modules/redes/routes/RedesRoutes'
import ReferenciaRoutes from '../modules/referencia/routes/ReferenciaRoutes'

const PanelRoutes = () => {
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
                    {/* sliders  portada*/}
                    <Route path='/sliders/*' element={<SliderRoutes />} />
                    <Route path='/videos/*' element={<VideoRoutes />} />
                    <Route path='/enlaces/*' element={<EnlaceRoute />} />
                    <Route path='/noticias/*' element={<NoticiaRoutes />} />
                    <Route path='/requisitos/*' element={<RequisitoRoutes />} />
                    <Route path='/requisito/:requisitoId/tramites/*' element={<TramiteRoutes />} />
                    <Route path='/tramite/:tramiteId/reglamentos/*' element={<ReglamentoRoues />} />
                    <Route path='/normativas/*' element={<NormativaRoutes />} />
                    <Route path='/redes/*' element={<RedesRoutes />} />
                    <Route path='/referencia/*' element={<ReferenciaRoutes />} />
                    {/* //rutas de errores */}
                    <Route path='/no-autorizado' element={<Inautorized />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route path="/*" element={<Navigate replace to="/panel/404" />} />
                </Routes>
            </div>
        </div>
    )
}

export default PanelRoutes
