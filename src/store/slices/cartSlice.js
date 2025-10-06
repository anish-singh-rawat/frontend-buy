import { createSlice } from '@reduxjs/toolkit';
import { getCartItems, addToCart } from '../thunks';

const initialState = {
  cartData: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    addToCartData: (state, action) => {
      state.cartData.push(action.payload);
    },
    updateCartItem: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.cartData.findIndex(item => item._id === id);
      if (index !== -1) {
        state.cartData[index] = { ...state.cartData[index], ...updates };
      }
    },
    removeFromCart: (state, action) => {
      state.cartData = state.cartData.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.cartData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setCartData, 
  addToCartData, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = cartSlice.actions;
export default cartSlice.reducer;