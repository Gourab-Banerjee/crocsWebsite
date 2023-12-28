// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

 export const fetchCartData = createAsyncThunk('cart/fetchCartData', async (cartId) => {

  try {
    const signInToken=localStorage.getItem('signInToken');
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${signInToken}`
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
                  image{
                    url
                  }
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
  
     if (result.errors) {
          throw new Error(result.errors[0].message);
        }
        console.log("cartData",result);
        return result.data.cart;
  } catch (error) {
    throw error;
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
        console.log("getdata", action.payload);
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default GetCartDataSlice.reducer;
