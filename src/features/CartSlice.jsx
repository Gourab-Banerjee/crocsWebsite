import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for the cart
const initialState = {
  cartItems: [],
  status: 'idle',
  error: null,
};

// Create an asynchronous thunk for adding items to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ cartId, parent_sku, quantity, sku }) => {
  console.log(cartId,parent_sku,quantity.count,sku);
  try {
    const signInToken=localStorage.getItem('signInToken');
    const response = await fetch("/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${signInToken}`
       
      },
      body: JSON.stringify({
        query: `
          mutation {
            addConfigurableProductsToCart(
              input: {
                cart_id: "${cartId.cart_id}"
                cart_items: [
                  {
                    parent_sku: "${parent_sku}"
                    data: {
                      quantity: ${quantity.count}
                      sku: "${sku}"
                    }
                  }
                ]
              }
            ) {
              cart {
                items {
                  uid
                  quantity
                  product {
                    name
                    sku
                  }
                  ... on ConfigurableCartItem {
                    configurable_options {
                      option_label
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log("data", data);

    // Extract the relevant information from the GraphQL response
    const cartItems = data.data.addConfigurableProductsToCart.cart.items;
console.log("items", cartItems);
    return cartItems;
  } catch (error) {
    throw error;
  }
});

// Create a slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {

        state.status = 'succeeded';
        console.log("action", action.payload);
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
