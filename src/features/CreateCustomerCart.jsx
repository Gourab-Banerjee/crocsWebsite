// createCustomerCartSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCustomerCart = createAsyncThunk(
  "customerCart/createCustomerCart",
  async () => {
    try {
       const signInToken=localStorage.getItem('signInToken');
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${signInToken}`,
        },
        body: JSON.stringify({
          query: `
            {
              customerCart {
                id
              }
            }`,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.customerCart.id;
    } catch (error) {
      throw error;
    }
  }
);

// Define the customerCart slice
const createCustomerCartSlice = createSlice({
  name: "customerCart",
  initialState: {
    cartId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCustomerCart.fulfilled, (state, action) => {
      // Update the state with the created cart ID
      state.cartId = action.payload;
console.log("customeraction",action.payload);
      
    });
  },
});

export default createCustomerCartSlice.reducer;
