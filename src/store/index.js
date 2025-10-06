import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import categorySlice from './slices/categorySlice';
import uiSlice from './slices/uiSlice';
import wishlistSlice from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    category: categorySlice,
    ui: uiSlice,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

