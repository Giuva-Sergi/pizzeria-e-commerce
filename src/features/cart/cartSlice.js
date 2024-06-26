import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const id = action.payload.pizzaId;
            const item = state.cart.find(item => item.pizzaId === id)
            if (item) {
                item.quantity++;
            } else {
                state.cart.push(action.payload);
            }
        },
        removeItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
        },
        decreaseQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity--;
            if (item.quantity === 0) {
              cartSlice.caseReducers.removeItem(state, action);
            }
        },
        clearCart(state) {
            state.cart = [];
        },
    }
})

export const {addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart} = cartSlice.actions;
export const getCart = state => state.cart.cart;
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((acc, currentItem) => (acc + currentItem.quantity), 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((acc, currentItem) => acc + (currentItem.unitPrice * currentItem.quantity), 0);
export default cartSlice.reducer;