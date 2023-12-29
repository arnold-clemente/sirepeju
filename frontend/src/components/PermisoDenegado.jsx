import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { updateUser, updateRol, updatePermisos } from '../store/slices/userSlice';

import { useMutation } from 'react-query';
import { getUser } from '../api/authApi';

import { show_alerta } from './MessageAlert'
import storage from '../Storage/storage';

export const PermisoDenegado = ({error}) => {

    const codigo_error = error;

    const dispatch = useDispatch();
    const go = useNavigate();
    const authUser = storage.get('authUser');

    const updatePermiso = () => {
        getUsuario.mutate(authUser);
    }

    const getUsuario = useMutation({
        mutationFn: getUser,
        onSuccess: (response) => {
            dispatch(updateUser(response.user));
            dispatch(updateRol(response.roles));
            dispatch(updatePermisos(response.permission));
        },
        onError: (error) => {
            show_alerta(`${codigo_error} + No Autorizado`, '<i class="fa-solid fa-xmark border_alert_red"></i>', 'alert_red')
        },
    });

    return updatePermiso;
}


