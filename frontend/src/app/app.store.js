import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/warehouse/auth/state/auth.slice.js"

export const store = configureStore({

    reducer:{
        auth:authReducer
    }

})