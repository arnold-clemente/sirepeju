import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'searchStore',
    initialState: {busqueda: ''},
    reducers: {
        updateSearch: (state, action) => {            
            state.busqueda = action.payload;
        }
    }
})

export const { updateSearch } = searchSlice.actions;