import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaNavbar from '../layout/PaginaNavbar'

import IndexPage from '../views/pagina/IndexPage'

const PageRoutes = () => {
    return (
        <>
            <div className='layout_page'>
                <PaginaNavbar />
                <Routes>
                    <Route path='/' element={<IndexPage />} />
                </Routes >
            </div>
        </>
    )
}

export default PageRoutes
