import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/panelSirepeju/userSlice";
import { searchSlice } from "./slices/panelSirepeju/searchSlice";
import { footerSlice } from "./slices/paginaWeb/footerSlice";

export default configureStore ({
    reducer: {
        userStore: userSlice.reducer,
        searchStore: searchSlice.reducer,
        footerStore: footerSlice.reducer,
    }
})