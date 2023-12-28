// signInSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for sign-in
const initialState = {
  signInData: null,
  status: 'idle',
  error: null,
};

// Create an asynchronous thunk for signing in
export const signInUser = createAsyncThunk('signIn/signInUser', async (loginData) => {
  try {
    const graphqlQuery = `
      mutation {
        generateCustomerToken(
          email: "${loginData.email}"
          password: "${loginData.password}"
        ) {
          token
        }
      }
    `;

    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    const data = await response.json();

    // Check for errors in the response
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
console.log(data.data.generateCustomerToken.token);
    return data.data.generateCustomerToken.token;
  } catch (error) {
    throw error;
  }
});

// Create a slice for sign-in
const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.signInData = action.payload;
        // localStorage.setItem("signInToken", action.payload);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default signInSlice.reducer;
