import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    cart: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFaliure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null
        },
        signOutUserFaliure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        userDeleteStart: (state) => {
            state.loading = true;
        },
        userDeleteSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        userDeleteFaliure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        addToCartSuccess: (state, action) => {
            const newCart = {
                userId: action.payload.user,
                discountedPrice: action.payload.productData.discountedPrice,
                regularPrice: action.payload.productData.regularPrice,
                image: action.payload.productData.image,
                RAM: action.payload.productData.storage.RAM,
                ROM: action.payload.productData.storage.ROM,
                name: action.payload.productData.name,
                category: action.payload.productData.category,
                productId: action.payload.productData._id,
            };
            if (state.cart === null) {
                state.cart = [newCart]; // Initialize cart with newCartItem if null
            } else {
                state.cart = [...state.cart, newCart]; // Append newCartItem to existing cart array
            }
        },
        removeFromCartSuccess: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter(item => item.productId !== productId);
        },

    }
});

export const {
    signInStart,
    signInFaliure,
    signInSuccess,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFaliure,
    userDeleteStart,
    userDeleteSuccess,
    userDeleteFaliure,
    addToCartSuccess,
    removeFromCartSuccess,
    addToCartSuccess1
} = userSlice.actions;
export default userSlice.reducer