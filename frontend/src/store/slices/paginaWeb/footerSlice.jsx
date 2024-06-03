import { createSlice } from "@reduxjs/toolkit";

export const footerSlice = createSlice({
    name: 'footerStore',
    initialState: {
        referencias: {
            id: 0,
            direccion: '',
            horario: '',
            whatsapp: '',
            correo: '',
            telefono: '',
            fax: '',
            created_at: '',
            updated_at: '',
        },
        redes: [],
    },
    reducers: {
        updateReferencias: (state, action) => {
            state.referencias = { ...state.referencias, ...action.payload };
        },
        updateRedes: (state, action) => {
            state.redes = action.payload;
        },
    }
})

export const { updateReferencias, updateRedes } = footerSlice.actions;