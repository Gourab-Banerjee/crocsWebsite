// productDetailsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductByUrl = createAsyncThunk(
  "productDetails/fetchProductBySku",
  async (url_key) => {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
            products(search: "", pageSize: 10, filter: { url_key: { eq: "${url_key}" } }) {
              items {
                __typename
                id
                name
                sku
                feature
                short_description {
                  html
                }
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
                image {
                  url
                }
                description {
                  html
                }
              }
            }
          }`,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
console.log(result.data.products.items);
      return result.data.products.items;
    } catch (error) {
      
      throw error;
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByUrl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByUrl.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductByUrl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
