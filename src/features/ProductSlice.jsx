// productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    try {
      const state = getState();
      const minPrice = state.products.minPrice;
      const maxPrice = state.products.maxPrice;


      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              products(search: "", pageSize: 20, filter: { price: { from: "${minPrice}", to: "${maxPrice}" } }) {
                items {
                  id 
                  name
                  sku
                  url_key
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
                }
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error("Error while fetching data from API");
      }

      const data = await response.json();
      return data.data.products.items;
    } catch (error) {
      
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    currentPage: 1,
    itemsPerPage: 8, // Set the number of items per page
    minPrice: 100, // Set a default minPrice
    maxPrice: 5000, // Set a default maxPrice
  },
  reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
      setPriceRange: (state, action) => {
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
      },
      clearError: state =>{
          state.error = null;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage,setPriceRange, clearError } = productSlice.actions;
export default productSlice.reducer;
