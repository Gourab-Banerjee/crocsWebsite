// mergeCartsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const mergeCarts = createAsyncThunk(
  "mergeCarts/mergeCarts",
  async () => {
    try {
        const signInToken=localStorage.getItem('signInToken');
        const sourceCartId = localStorage.getItem('cartId');
        const destinationCartId = localStorage.getItem('customerCartId');
    
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${signInToken}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              mergeCarts(
                source_cart_id: "${sourceCartId}",
                destination_cart_id: "${destinationCartId}"
              ) {
                items {
                  id
                  product {
                    name
                    sku
                  }
                  quantity
                }
              }
            }
          `,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.mergeCarts.items;
    } catch (error) {
      throw error;
    }
  }
);

// Define the mergeCarts slice
const mergeCartsSlice = createSlice({
  name: "mergeCarts",
  initialState: {
    mergedItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(mergeCarts.fulfilled, (state, action) => {
      // Update the state with the merged cart items
      console.log("merge", action.payload);
      state.mergedItems = action.payload;
    });
  },
});

export default mergeCartsSlice.reducer;
