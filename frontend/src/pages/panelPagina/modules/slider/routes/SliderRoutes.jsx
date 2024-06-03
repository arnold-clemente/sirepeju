import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedPermmision from 'midleware/ProtectedPermmision'

import IndexSlider from '../pages/IndexSlider';
import CreateSlider from '../pages/CreateSlider';
import EditSlider from '../pages/EditSlider';


const SliderRoutes = () => {
  return (
    <>
     <Routes>
        <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
          <Route path='/' element={<IndexSlider />} />
        </Route>
        <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
          <Route path='/crear' element={<CreateSlider />} />
        </Route>
        <Route element={<ProtectedPermmision midleware={'panel.pagina'} />} >
          <Route path='/editar/:sliderId' element={<EditSlider />} />
        </Route>
      </Routes> 
    </>
  )
}

export default SliderRoutes
