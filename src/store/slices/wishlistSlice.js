import { createSlice } from '@reduxjs/toolkit';
import { getMyListData } from '../thunks';

const initialState = {
  myListData: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setMyListData: (state, action) => {
      state.myListData = action.payload;
    },
    addToMyList: (state, action) => {
      state.myListData.push(action.payload);
    },
    removeFromMyList: (state, action) => {
      state.myListData = state.myListData.filter(item => item._id !== action.payload);
    },
    clearMyList: (state) => {
      state.myListData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyListData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyListData.fulfilled, (state, action) => {
        state.loading = false;
        state.myListData = action.payload;
      })
      .addCase(getMyListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setMyListData, 
  addToMyList, 
  removeFromMyList, 
  clearMyList 
} = wishlistSlice.actions;
export default wishlistSlice.reducer;