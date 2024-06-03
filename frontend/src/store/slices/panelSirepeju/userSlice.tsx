import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userStore',
    initialState: {
        user: {id: 0, correo: '', nombre: '', imagen: null, rol: ''},
        roles: {},
        permisos: [],
    },
    reducers: {
        updateUser: (state, action) => {
            state.user = {...state.user, ...action.payload};
        },
        updateRol: (state, action) => {
            state.roles = action.payload;
        },
        updatePermisos: (state, action) => {
            state.permisos = action.payload;
        }
    }
})

export const { updateUser, updateRol, updatePermisos } = userSlice.actions;