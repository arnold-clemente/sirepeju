import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { searchSlice } from "./slices/searchSlice";

export default configureStore ({
    reducer: {
        userStore: userSlice.reducer,
        searchStore: searchSlice.reducer,
    }
})