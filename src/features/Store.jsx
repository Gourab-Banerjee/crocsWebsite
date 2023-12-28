// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import productDetailsReducer from "./ProductDetailsSlice"
import emptyCartReducer from "./CreateEmptyCart"
import cartReducer from "./CartSlice"
import getCartDataReducer from "./GetCartDataSlice"
import userDetailsReducer from "./UserDetailsSlice"
import signInReducer from "./SignInSlice"
import customerCartReducer from "./CreateCustomerCart"
import mergeCartsReducer from "./MergeCartSlice"
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails:productDetailsReducer,
    emptyCart:emptyCartReducer,
    cart: cartReducer,
    getCartData: getCartDataReducer,
    userDetails: userDetailsReducer,
    signIn: signInReducer,
    customerCart:customerCartReducer,
    mergeCarts:mergeCartsReducer

    // Add other reducers as needed
  },
});

export default store;
