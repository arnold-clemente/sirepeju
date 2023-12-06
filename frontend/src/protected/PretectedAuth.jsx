import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../Storage/storage'

export const ProtectedAuth = ({ children }) => {
    const authUser = storage.get('authUser');
    if (authUser) {
        return <Navigate to='/' />
    }
    return <Outlet />
}

export default ProtectedAuth
