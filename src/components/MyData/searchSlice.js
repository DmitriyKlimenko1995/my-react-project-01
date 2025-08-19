// store/searchSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchUsersThunk = createAsyncThunk(
  'search/fetchUsers',
  async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const res = await axios.get(`http://localhost:5000/api/search?${params}`);
    return res.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: { results: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(searchUsersThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {  } = searchSlice.actions;
export default searchSlice.reducer;