import { createSlice } from "@reduxjs/toolkit"
import productData from "../../data/data.json";

const initialState = {
    products: productData,
    cart: [],
    cartTotal: 0,
    cartDiscount: 0,
    finalAmount: 0,
    offers: []
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            state.cart.push(id)
            state.products.forEach(product => {
                if (product.id === id) {
                    product.isInCart = true;
                    product.quantity = 1;
                }
                if (id === "004" && product.id === "001") {
                    product.discount = product.price / 2;
                }
                if (id === "003" && product.id === "003") {
                    product.discount = product.price;
                    product.quantity = 2;
                }
            });
        },
        updateQuantity: (state, action) => {
            let { id, quantity, flag = true } = action.payload;
            state.products.forEach(item => {
                if (id === "003" && item.id === "003" && quantity % 2 === 0) {
                    if (flag) {
                        item.discount = item.discount + item.price;
                    } else {
                        item.discount = item.discount - item.price;
                    }
                }
                if (id === "005" && item.id === "005" && quantity % 3 === 0) {
                    if (flag) {
                        item.discount = (item.discount ?? 0) + item.price;
                    } else {
                        item.discount = (item.discount ?? 0) - item.price;
                    }
                }
                if (id === "004" && !flag && item.id === "001") {
                    item.discount = 0;
                }
                if (item.id === id) {
                    item.quantity = quantity;
                }

            })
            if (quantity === 0) {
                state.products.forEach(product => product.id === id && (product.isInCart = false, product.quantity = 0))
                state.cart = state.cart.filter(item => item !== id)
            }
        },
        countTotal: (state) => {
            state.cartTotal = state.products.reduce((acc, item) => {
                if (item.isInCart) {
                    acc = acc + (item.price * item.quantity);
                    return acc;
                }
                return acc;
            }, 0);
            state.cartDiscount = state.products.reduce((acc, item) => {
                let discount = item.discount || 0;
                acc = acc + Number(discount);
                return acc;
            }, 0);
            state.finalAmount = (state.cartTotal - state.cartDiscount);
        }
    }
});

export const { addToCart, updateQuantity, countTotal } = CartSlice.actions;
export default CartSlice.reducer;