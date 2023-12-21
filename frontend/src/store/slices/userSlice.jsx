import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userStore',
    initialState: {user: {id: 0, correo: '', nombre: '', imagen: null, rol: ''}},
    reducers: {
        updateUser: (state, action) => {
            state.user = {...state.user, ...action.payload};
        }
    }
})

export const { updateUser } = userSlice.actions;