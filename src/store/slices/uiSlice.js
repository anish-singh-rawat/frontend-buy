import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openProductDetailsModal: {
    open: false,
    item: {}
  },
  openCartPanel: false,
  openAddressPanel: false,
  addressMode: "add",
  addressId: "",
  searchData: [],
  windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
  openFilter: false,
  isFilterBtnShow: false,
  openSearchPanel: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setOpenProductDetailsModal: (state, action) => {
      state.openProductDetailsModal = action.payload;
    },
    handleOpenProductDetailsModal: (state, action) => {
      const { status, item } = action.payload;
      state.openProductDetailsModal = {
        open: status,
        item: item
      };
    },
    handleCloseProductDetailsModal: (state) => {
      state.openProductDetailsModal = {
        open: false,
        item: {}
      };
    },
    setOpenCartPanel: (state, action) => {
      state.openCartPanel = action.payload;
    },
    toggleCartPanel: (state, action) => {
      state.openCartPanel = action.payload;
    },
    setOpenAddressPanel: (state, action) => {
      state.openAddressPanel = action.payload;
    },
    toggleAddressPanel: (state, action) => {
      if (action.payload === false) {
        state.addressMode = "add";
      }
      state.openAddressPanel = action.payload;
    },
    setAddressMode: (state, action) => {
      state.addressMode = action.payload;
    },
    setAddressId: (state, action) => {
      state.addressId = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setOpenFilter: (state, action) => {
      state.openFilter = action.payload;
    },
    setIsFilterBtnShow: (state, action) => {
      state.isFilterBtnShow = action.payload;
    },
    setOpenSearchPanel: (state, action) => {
      state.openSearchPanel = action.payload;
    },
  },
});

export const {
  setOpenProductDetailsModal,
  handleOpenProductDetailsModal,
  handleCloseProductDetailsModal,
  setOpenCartPanel,
  toggleCartPanel,
  setOpenAddressPanel,
  toggleAddressPanel,
  setAddressMode,
  setAddressId,
  setSearchData,
  setWindowWidth,
  setOpenFilter,
  setIsFilterBtnShow,
  setOpenSearchPanel,
} = uiSlice.actions;
export default uiSlice.reducer;