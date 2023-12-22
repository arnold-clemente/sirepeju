import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WebRoutes from './WebRoutes'
import ProtectedRoutes from '../protected/ProtectedRoutes'
import ProtectedAuth from '../protected/PretectedAuth'
import Login from '../views/auth/Login'
import Register from '../views/Register'

const AppRouter = () => {
    return (
        <div className='App_router'>
            <BrowserRouter>
            <Routes>
                <Route element={<ProtectedAuth />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>
                <Route element={<ProtectedRoutes />}>                    
                    <Route path='/*' element={<WebRoutes />} />
                </Route>
            </Routes>
        </BrowserRouter >
        </div>
    )
}

export default AppRouter
