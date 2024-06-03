import { BrowserRouter, Routes, Route } from 'react-router-dom'

// midlewares 
import ProtectedAuth from 'midleware/ProtectedAuth'
import ProtectedRoutes from 'midleware/ProtectedRoutes'
import ProtectedSelection from 'midleware/ProtectedSelection'

// rutas de las paginas 
import PaginaRoutes from '../pages/paginaWeb/routes/PaginaRoutes'
import AuthRoutes from '../pages/auth/routes/AuthRoutes'
import SirepejuRoutes from '../pages/panelSirepeju/routes/SirepejuRoutes'
import PanelRoutes from '../pages/panelPagina/routes/PanelRoutes'

import Selection from '../pages/panelSirepeju/vistas/Selection'

const AppRouter = () => {
    return (
        <div className='App_router'>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedAuth />}>
                        <Route path='/auth/*' element={<AuthRoutes />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        {/* <Route path='/selecion' element={<Selection />} /> */}
                        <Route element={<ProtectedSelection />} >
                            <Route path='/selecion' element={<Selection />} />
                        </Route>
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/admin/*' element={<SirepejuRoutes />} />
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/panel/*' element={<PanelRoutes />} />
                    </Route>
                    <Route path='/*' element={<PaginaRoutes />} />
                </Routes>
            </BrowserRouter >
        </div>
    )
}

export default AppRouter
