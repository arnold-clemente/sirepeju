import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser, updateRol, updatePermisos } from '../store/slices/userSlice'
import { useMutation } from 'react-query';
import { getUser } from '../api/authApi'

import { show_alerta } from '../components/MessageAlert'
import storage from '../Storage/storage'
import Loading from '../components/Loading';


export const ProtectedRoutes = ({ children }) => {

    const dispatch = useDispatch();
    const usuario = useSelector(state => state.userStore.user);
    const authUser = storage.get('authUser');

    useEffect(() => {
        if (authUser) {
            if (usuario.id == 0) {
                getUsuario.mutate(authUser);
            }
        }
    }, [authUser])

    const getUsuario = useMutation({
        mutationFn: getUser,
        onSuccess: (response) => {
            dispatch(updateUser(response.user));
            dispatch(updateRol(response.roles));
            dispatch(updatePermisos(response.permission));
        },
        onError: (error) => {
            show_alerta('No conectado', '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    if (!authUser) {
        return <Navigate to='/login' />
    }
    else {
        return (
            <>
                {usuario.id == 0
                    ? <Loading />
                    : <Outlet />
                }
            </>
        )
    }
}

export default ProtectedRoutes
