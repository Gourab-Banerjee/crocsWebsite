// userDetailsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for user details
const initialState = {
  userDetails: null,
  status: 'idle',
  error: null,
};

// Create an asynchronous thunk for fetching user details
export const fetchUserDetails = createAsyncThunk('userDetails/fetchUserDetails', async (customerToken) => {
  try {
   
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${customerToken}`,
      },
      body: JSON.stringify({
        query: `
          {
            customer {
              firstname
              lastname
              suffix
              email
              addresses {
                firstname
                lastname
                street
                city
                region {
                  region_code
                  region
                }
                postcode
                country_code
                telephone
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
console.log(result);
    return result.data.customer;
  } catch (error) {
    throw error;
  }
});

// Create a slice for user details
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userDetailsSlice.reducer;
