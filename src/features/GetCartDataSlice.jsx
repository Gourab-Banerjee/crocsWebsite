// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchCartData = createAsyncThunk('cart/fetchCartData', async (cartId) => {
  const response = await fetch('/graphql-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          cart(cart_id: "${cartId}") {
            email
            items {
              id
              product {
                name
                sku
                color
                price {
                  regularPrice {
                    amount {
                      currency
                      value
                    }
                  }
                }
              }
              quantity
              errors {
                code
                message
              }
            }
            prices {
              grand_total {
                value
                currency
              }
            }
          }
        }
      `,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    return result.data.cart;
  } else {
    throw new Error(result.errors[0].message);
  }
});

const GetCartDataSlice = createSlice({
  name: 'getCartData',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export { fetchCartData };
export default GetCartDataSlice.reducer;
