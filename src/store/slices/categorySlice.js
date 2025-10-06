import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesData } from '../thunks';

const initialState = {
  catData: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCatData: (state, action) => {
      state.catData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.catData = action.payload;
      })
      .addCase(getCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCatData } = categorySlice.actions;
export default categorySlice.reducer;