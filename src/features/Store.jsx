// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import productDetailsReducer from "./ProductDetailsSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails:productDetailsReducer
    // Add other reducers as needed
  },
});

export default store;
