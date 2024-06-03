import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedSelection = () => {

    const permisos = useSelector(state => state.userStore.permisos)

    if (permisos.includes('panel.pagina'))
        return <Outlet />
    else
        return <Navigate to='/admin/dashboard' />
}

export default ProtectedSelection
