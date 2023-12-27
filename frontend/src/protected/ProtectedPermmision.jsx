import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedPermmision = ({ midleware, children }) => {

    const permisos = useSelector(state => state.userStore.permisos)

    if (permisos.includes(midleware))
        return <Outlet />
    else
        return <Navigate to='/no-autorizado' />
}

export default ProtectedPermmision
