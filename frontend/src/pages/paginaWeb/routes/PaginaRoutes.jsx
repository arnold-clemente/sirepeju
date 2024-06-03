import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Index from "../modules/inicio/Index";
import Busqueda from "../modules/busqueda/Busqueda";
import Requisitos from "../modules/requisitos/Requisitos";
import Informacion from "../modules/informacion/Informacion";

import PaginaNavbar from "../layout/PaginaNavbar";
import FooterPagina from "../layout/FooterPagina";

const PaginaRoutes = () => {
    const [menubar, setMenubar] = useState(false);

    const handleMenu = () => {
        setMenubar(!menubar);
    }

    return (
        <div className='layout_page'>
            <PaginaNavbar menubar={menubar} handleMenu={handleMenu} />
            <div className='layout_separar'></div>
            <div className={`layout_routes ${menubar ? 'page' : null}`}>
                <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/busqueda' element={<Busqueda />} />
                    <Route path='/requisitos' element={<Requisitos />} />
                    <Route path='/informacion' element={<Informacion />} />
                </Routes >
            </div>
            <FooterPagina />
        </div>
    )
}

export default PaginaRoutes
