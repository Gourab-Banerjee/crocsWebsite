// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import productDetailsReducer from "./ProductDetailsSlice"
import emptyCartReducer from "./CreateEmptyCart"
import cartReducer from "./CartSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails:productDetailsReducer,
    emptyCart:emptyCartReducer,
    cart: cartReducer,

    // Add other reducers as needed
  },
});

export default store;
