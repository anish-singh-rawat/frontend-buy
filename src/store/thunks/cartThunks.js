import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../utils/api';
import { addToGuestCart, getGuestCartFromStorage } from '../../utils/guestCart';

export const addToCartThunk = createAsyncThunk(
    'cart/addToCart',
    async (_, { getState }) => {
        const { auth } = getState();
        const isLoggedIn = auth.userData !== null;

        if (isLoggedIn) {
            const response = await postData('/api/cart/get', {});
            return response.data;
        } else {
            // Return guest cart from local storage
            return getGuestCartFromStorage();
        }
    }
);