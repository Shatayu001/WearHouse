import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  // FIX: Accept a single 'filters' object as payload.
  async (filters) => {
    const query = new URLSearchParams();

    // Iterate over the filters object
    Object.entries(filters).forEach(([key, value]) => {
      // Ensure the value is not empty or null/undefined
      if (value || value === 0) {
        let finalValue = value;

        // Critical: If the value is an array (like sizes, brands), join it by comma
        // This is the format your backend is expecting for $in queries
        if (Array.isArray(value)) {
          finalValue = value.join(",");
        }

        // Only append to query if the value is not an empty string after processing
        if (finalValue !== "") {
          query.append(key, finalValue);
        }
      }
    });

    // Old manual way (removed):
    /*
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    // ... all other params
    */

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    // Apply the check to prevent network request with "undefined" ID
    if (!id || id === "undefined") {
      return rejectWithValue(
        "Cannot fetch product details: Missing or invalid product ID."
      );
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue for robust error handling
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to fetch similar products

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }, { rejectWithValue }) => {
    // Check if the ID is missing or is the literal string "undefined"
    if (!id || id === "undefined") {
      // Return a rejected promise with a specific error
      return rejectWithValue(
        "Cannot fetch similar products: Missing or invalid product ID."
      );
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
      );
      return response.data;
    } catch (error) {
      // Use rejectWithValue for better error handling in the slice
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Slice Definition

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null, // Store the details of the single Product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetching products with filter
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // handle fetching single product details
      // (This section was not fully visible but follows the standard pattern)
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.selectedProduct = null;
        state.error = action.error.message;
      })

      // Handle updating product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // handle fetching similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;

export default productsSlice.reducer;
