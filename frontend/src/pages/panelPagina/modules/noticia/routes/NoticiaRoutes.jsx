import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexNoticia from '../pages/IndexNoticia';
import CreateNoticia from '../pages/CreateNoticia';
import EditNoticia from '../pages/EditNoticia';

const NoticiaRoutes = () => {
  return (
    <>
    <Routes>
       <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
         <Route path='/' element={<IndexNoticia />} />
       </Route>
       <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
         <Route path='/crear' element={<CreateNoticia />} />
       </Route>
       <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
         <Route path='/editar/:noticiaId' element={<EditNoticia />} />
       </Route>
     </Routes> 
   </>
  )
}

export default NoticiaRoutes
