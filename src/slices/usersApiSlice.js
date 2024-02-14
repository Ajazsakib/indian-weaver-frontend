import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USERS_URL } from '../constants';
import { BASE_URL } from '../constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
let initialState = {
  users: [],
  res: {},
  isLoggedIn: false,
}


const userInfo = localStorage.getItem("userInfo");
const token = userInfo ? JSON.parse(userInfo).token : null;
const headers = {
  'Content-Type': 'application/json',
  'Authorization': token ? `Bearer ${token}` : ''
};

export const registerUser = createAsyncThunk("user/registerUser", async (data) =>
{
  try {
    const response = await axios.post(`${BASE_URL}${USERS_URL}`, data)
    return response.data;
  }
  catch (err) {
    console.log(err?.response?.data?.message)
    toast.error(err?.response?.data?.message || 'Error registering user');
  }
})

export const loginUser = createAsyncThunk("user/login", async (data) =>
{
  try {
    const response = await axios.post(`${BASE_URL}${USERS_URL}/auth`, data)
    return response.data;
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Error registering user');
  }
})

export const logoutUser = createAsyncThunk("user/logout", async (data) =>
{
  try {
    const response = await axios.post(`${BASE_URL}${USERS_URL}/logout`, data)
    return response.data;
  } catch (err) {


  }
})


export const getUsers = createAsyncThunk("user/fetch", async () =>
{
  try {
    const response = await axios.get(`${BASE_URL}${USERS_URL}`, { headers })
    return response.data;
  } catch (err) {
    console.log(err)

  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {


  },
  extraReducers: (builder) => [
    builder.addCase(registerUser.fulfilled, (state, action) =>
    {
      if (action.payload) {
        state.users.push(action.payload)
      }


    }).addCase(loginUser.fulfilled, (state, action) =>
    {
      // Handle the rejection, you can show an error toast or update the state as needed
      if (action.payload) {
        state.res = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", state.isLoggedIn)
      }



    }).addCase(logoutUser.fulfilled, (state, action) =>
    {
      // Update the state if needed
      state.res = action.payload;
      state.isLoggedIn = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLoggedIn");

    }).addCase(getUsers.fulfilled, (state, action) =>
    {
      state.users = action.payload
    })
  ]

})

export default userSlice.reducer


// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/auth`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: 'POST',
//       }),
//     }),
//     profile: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/profile`,
//         method: 'PUT',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//     }),
//     getUsers: builder.query({
//       query: () => ({
//         url: USERS_URL,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       providesTags: ['User'],
//       keepUnusedDataFor: 5,
//     }),
//     deleteUser: builder.mutation({
//       query: (userId) => ({
//         url: `${USERS_URL}/${userId}`,
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//     }),
//     getUserDetails: builder.query({
//       query: (id) => ({
//         url: `${USERS_URL}/${id}`,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     updateUser: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/${data.userId}`,
//         method: 'PUT',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useProfileMutation,
//   useGetUsersQuery,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
//   useGetUserDetailsQuery,
// } = userApiSlice;
