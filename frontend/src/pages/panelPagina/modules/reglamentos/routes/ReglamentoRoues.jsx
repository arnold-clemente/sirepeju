import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexReglamento from '../pages/IndexReglamento';
import CreateReglamento from '../pages/CreateReglamento';
import EditReglamento from '../pages/EditReglamento';

const ReglamentoRoues = () => {
  return (
    <>
       <Routes>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/' element={<IndexReglamento />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/crear' element={<CreateReglamento />} />
                </Route>
                <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
                    <Route path='/editar/:reglamentoId' element={<EditReglamento />} />
                </Route>
            </Routes> 
    </>
  )
}

export default ReglamentoRoues
