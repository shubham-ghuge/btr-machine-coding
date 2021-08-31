import { createSlice } from "@reduxjs/toolkit"
import productData from "../../data/data.json";

const initialState = {
    products: productData,
    cart: [],
    cartTotal: 0,
    cartDiscount: 0,
    finalAmount: 0
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { details } = action.payload;
            let cartItem = { ...details, quantity: 1 }
            if (details.name.toLowerCase() === "cheese") {
                cartItem.discount = details.price;
                cartItem.quantity = 2;
            }
            if (details.name.toLowerCase() === "soup") {
                state.cart.forEach(item => {
                    if (item.name.toLowerCase() === "bread") {
                        item.discount = item.price / 2;
                    }
                })
                const butterDetails = state.products.find(item => item.name.toLowerCase() === "butter");
                let discount = (butterDetails.price * 1 / 3).toFixed(2);
                if (!butterDetails.isInCart) {
                    butterDetails.quantity = 1;
                    butterDetails.discount = discount;
                    state.cart.push(butterDetails);
                }
                state.cart.find(item => {
                    if (item.name.toLowerCase() === "butter") {
                        item.discount = discount;
                        item.isInCart = true;
                    }
                })
            }
            state.cart.push(cartItem);
            state.products.forEach(product => {
                if (product.id === details.id) {
                    product.isInCart = true;
                }
            });
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            state.cart.forEach(product => {
                if (product.id === id) {
                    product.quantity = quantity;
                }
            })
            if (quantity === 0) {
                state.products.forEach(product => product.id === id && (product.isInCart = false))
            }
            if (id === "004" && quantity === 0) {
                state.cart.forEach(product => {
                    if (product.name.toLowerCase() === "butter" || product.name.toLowerCase() === "bread") {
                        product.discount = 0;
                    }
                })
            }
        },
        countTotal: (state) => {
            state.cartTotal = state.cart.reduce((acc, item) => acc = acc + (item.price * item.quantity), 0).toFixed(2);
            state.cartDiscount = state.cart.reduce((acc, item) => {
                let discount = item.discount ? item.discount : 0;
                acc = acc + discount;
                return acc;
            }, 0);
            state.finalAmount = (state.cartTotal - state.cartDiscount);
        }
    }
});

export const { addToCart, updateQuantity, countTotal } = CartSlice.actions;
export default CartSlice.reducer;