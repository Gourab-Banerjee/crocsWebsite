import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createEmptyCart = createAsyncThunk(
  "emptyCart/createEmptyCart",
  async () => {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                mutation {
                    createEmptyCart
                  
            }`,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.createEmptyCart;
    } catch (error) {
      throw error;
    }
  }
);

// Define the cart slice
const createEmptyCartSlice = createSlice({
  name: "emptyCart",
  initialState: {
    cartId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEmptyCart.fulfilled, (state, action) => {
      // Update the state with the created cart ID
console.log(action.payload);
      state.cartId = action.payload;

      localStorage.setItem("cartId", state.cartId);
    });
  },
});

export default createEmptyCartSlice.reducer;
