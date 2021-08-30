import { createSlice } from "@reduxjs/toolkit"
import productData from "../../data/data.json";

const initialState = {
    products: productData,
    cart: []
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            state.cart.push(id);
            state.products.forEach(product => {
                if (product.id === id) {
                    product.isInCart = true;
                    product.quantity = 1;
                }
            });
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            state.products.forEach(product => {
                if (product.id === id) {
                    product.quantity = quantity;
                    if (quantity === 0) product.isInCart = false;
                }
            })
        }
    }
});

export const { addToCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;