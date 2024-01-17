import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaNavbar from '../layout/PaginaNavbar'
import Busqueda from '../views/pagina/Busqueda'

import IndexPage from '../views/pagina/IndexPage'
import Informacion from '../views/pagina/Informacion'

const PageRoutes = () => {
    return (
        <>
            <div className='layout_page'>
                <PaginaNavbar />
                <Routes>
                    <Route path='/' element={<IndexPage />} />
                    <Route path='/buscador-de-tramites' element={<Busqueda />} />
                    <Route path='/informacion' element={<Informacion />} />
                </Routes >
            </div>
        </>
    )
}
// animate__animated animate__backInLeft
export default PageRoutes
