import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDataFromApi, postData } from '../../utils/api';
import toast from 'react-hot-toast';

// Alert box function
export const alertBox = (type, msg) => {
  if (type === "success") {
    toast.success(msg);
  }
  if (type === "error") {
    toast.error(msg);
  }
};

// Get user details
export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchDataFromApi('/api/user/user-details');
      if (response?.response?.data?.error === true) {
        if (response?.response?.data?.message === "You have not login") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alertBox("error", "Your session is closed please login again");
          dispatch({ type: 'auth/logout' });
          return rejectWithValue("Session expired");
        }
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get cart items
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDataFromApi('/api/cart/get');
      if (response?.error === false) {
        return response.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product, userId, quantity }, { rejectWithValue, dispatch }) => {
    if (userId === undefined) {
      alertBox("error", "you are not login please login first");
      return rejectWithValue("User not logged in");
    }

    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram
    };

    try {
      const response = await postData("/api/cart/add", data);
      if (response?.error === false) {
        alertBox("success", response?.message);
        dispatch(getCartItems());
        return response.data;
      } else {
        alertBox("error", response?.message);
        return rejectWithValue(response?.message);
      }
    } catch (error) {
      alertBox("error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Get wishlist data
export const getMyListData = createAsyncThunk(
  'wishlist/getMyListData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDataFromApi("/api/myList");
      if (response?.error === false) {
        return response.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get categories
export const getCategoriesData = createAsyncThunk(
  'category/getCategoriesData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDataFromApi("/api/category");
      if (response?.error === false) {
        return response.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);