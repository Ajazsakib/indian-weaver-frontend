// import { PRODUCTS_URL } from '../constants';
// import { apiSlice } from './apiSlice';
// // import { addAuthHeaders } from '../utils/authUtils';

// import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// let authUser;
// const addAuthHeaders = () =>
// {
//   if (localStorage.getItem('userInfo')) {
//     const user = localStorage.getItem('userInfo');
//     return user
//   }

// };

// if (addAuthHeaders()) {
//   authUser = JSON.parse(addAuthHeaders())
// }


// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber },

//       }),
//       keepUnusedDataFor: 5,
//       providesTags: ['Products'],
//     }),
//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,

//       }),
//       keepUnusedDataFor: 5,
//     }),
//     createProduct: builder.mutation({
//       query: (newProductData) => ({

//         url: `${PRODUCTS_URL}`,
//         method: 'POST',
//         body: newProductData,
//         headers: {
//           // Include your authorization token here
//           Authorization: `Bearer ${authUser ? authUser?.token : ""}`,
//         },

//       }),
//       invalidatesTags: ['Product'],
//     }),
//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: 'PUT',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       invalidatesTags: ['Products'],
//     }),
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: `/api/upload`,
//         method: 'POST',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       providesTags: ['Product'],
//     }),
//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       invalidatesTags: ['Product'],
//     }),
//     getTopProducts: builder.query({
//       query: () => `${PRODUCTS_URL}/top`,
//       keepUnusedDataFor: 5,
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useUploadProductImageMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useGetTopProductsQuery,
// } = productsApiSlice;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, PRODUCTS_URL } from "../constants";
import axios from "axios";

let initialState = {
  products: [],
  productToUpdate: {}
}

const userInfo = localStorage.getItem("userInfo");
const token = userInfo ? JSON.parse(userInfo).token : null;
const headers = {
  'Content-Type': 'application/json',
  'Authorization': token ? `Bearer ${token}` : ''
};
export const fetchProducts = createAsyncThunk("products/fetch", async () =>
{
  try {
    const response = await axios.get(`${BASE_URL}${PRODUCTS_URL}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchProductsBySearch = createAsyncThunk("products/search", async (keyword) =>
{
  try {
    const response = await axios.get(`${BASE_URL}${PRODUCTS_URL}?keyword=${keyword}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
})


export const deleteProducts = createAsyncThunk("products/delete", async (productId) =>
{
  try {

    const response = await axios.delete(`${BASE_URL}${PRODUCTS_URL}/${productId}`, { headers })
    return response.data
  } catch (err) {

    console.log(err)
  }
})


export const createProduct = createAsyncThunk("products/create", async (data) =>
{
  try {

    const response = await axios.post(`${BASE_URL}${PRODUCTS_URL}`, data, { headers })
    console.log(response, ">>>>>>>>>response")
    return response.data
  } catch (err) {
    console.log("Error in deleting the product", err)
  }
})


export const updateProduct = createAsyncThunk("products/update", async (dataToUpdate, { getState, dispatch, extra }) =>
{
  const { productId } = dataToUpdate; // Extract productId from the dataToUpdate
  try {
    alert(`${BASE_URL}${PRODUCTS_URL}/${productId}`);
    const response = await axios.put(`${BASE_URL}${PRODUCTS_URL}/${productId}`, dataToUpdate, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
    alert("hi");
    throw err; // Rethrow the error after handling it
  }
});


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    showProductData: (state, action) =>
    {

      state.productToUpdate = action.payload
    }
  },
  extraReducers: (builder) => [
    builder.addCase(fetchProducts.fulfilled, (state, action) =>
    {
      state.products = action.payload
    }).addCase(fetchProductsBySearch.fulfilled, (state, action) =>
    {
      state.products = action.payload
    })
      .addCase(createProduct.fulfilled, (state, action) =>
      {
        state.products.push(action.payload);
        console.log(action.payload, "product payload")
      })
      .addCase(deleteProducts.fulfilled, (state, action) =>
      {
        console.log(action.payload)
        let newProducts = state.products.filter((product) =>
        {
          return product._id !== action.payload
        })

        return {
          ...state,
          products: newProducts,
        };
      })
      .addCase(updateProduct.fulfilled, (state, action) =>
      {
        let newProducts = state.products.map((product) =>
        {
          alert(product._id)
          alert(action.payload.productId)
          alert(product._id === action.payload.productId)
          if (product._id === action.payload.productId) {
            alert("hi")
            product.name = action.payload.name
            product.price = action.payload.price
            product.image = action.payload.image
            product.brand = action.payload.brand
            product.category = action.payload.category
            product.countInStock = action.payload.countInStock
            product.description = action.payload.description
          }

          return product
        })
        return {
          ...state,
          products: newProducts,
        };
      })
  ]
})

export const { showProductData } = productSlice.actions;
export default productSlice.reducer