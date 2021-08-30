import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart";

export default configureStore({
    reducer: {
        cart: cartReducer,
    }
});