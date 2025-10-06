# Context to Redux Migration Guide

## Files Updated So Far:
✅ /src/Pages/Cart/cartItems.jsx
✅ /src/components/Header/index_backup.jsx  
✅ /src/components/Header/Navigation/MobileNav.jsx
✅ /src/components/HomeSliderV2/index.jsx
✅ /src/components/ProductItemListView/index.jsx
✅ /src/components/ProductsSlider/index.jsx
✅ /src/components/Sidebar/index.jsx

## Remaining Files to Update:
- /src/Pages/Checkout/index.jsx (IN PROGRESS)
- /src/Pages/Home/index - Copy.jsx
- /src/Pages/Home/index.jsx
- /src/Pages/Login/index.jsx
- /src/Pages/MyAccount/addAddress.jsx
- /src/Pages/MyAccount/address.jsx
- /src/Pages/MyAccount/addressBox.jsx
- /src/Pages/MyAccount/index.jsx
- /src/Pages/MyList/index.jsx
- /src/Pages/ProductListing/index.jsx
- /src/Pages/Search/index.jsx

## Common Patterns to Replace:

### 1. Import Changes
```jsx
// Old
import { MyContext } from "../../context/MyContext";

// New
import { useSelector, useDispatch } from "react-redux";
import { getCartItems, alertBox, getUserDetails, getMyListData, getCategoriesData } from "../../store/thunks";
import { setOpenProductDetailsModal, handleOpenProductDetailsModal, toggleCartPanel, setOpenAddressPanel, setAddressMode, setAddressId, setSearchData, setWindowWidth, setOpenFilter, setIsFilterBtnShow, setOpenSearchPanel } from "../../store/slices/uiSlice";
```

### 2. Context Usage to Redux Selectors
```jsx
// Old
const context = useContext(MyContext);

// New
const dispatch = useDispatch();
const { userData, isLogin } = useSelector((state) => state.auth);
const { cartData } = useSelector((state) => state.cart);
const { myListData } = useSelector((state) => state.wishlist);
const { catData } = useSelector((state) => state.category);
const { windowWidth, openCartPanel, openAddressPanel, searchData } = useSelector((state) => state.ui);
```

### 3. Context Methods to Redux Actions
```jsx
// Old -> New
context.alertBox(type, message) -> alertBox(type, message)
context.getCartItems() -> dispatch(getCartItems())
context.getUserDetails() -> dispatch(getUserDetails())
context.getMyListData() -> dispatch(getMyListData())
context.getCategoriesData() -> dispatch(getCategoriesData())
context.addToCart(product, userId, quantity) -> dispatch(addToCart({ product, userId, quantity }))

// UI Actions
context.setOpenProductDetailsModal(status, item) -> dispatch(handleOpenProductDetailsModal({ status, item }))
context.handleOpenProductDetailsModal(status, item) -> dispatch(handleOpenProductDetailsModal({ status, item }))
context.setOpenCartPanel(value) -> dispatch(setOpenCartPanel(value))
context.toggleCartPanel(value) -> dispatch(toggleCartPanel(value))
context.setOpenAddressPanel(value) -> dispatch(setOpenAddressPanel(value))
context.setAddressMode(mode) -> dispatch(setAddressMode(mode))
context.setAddressId(id) -> dispatch(setAddressId(id))
context.setSearchData(data) -> dispatch(setSearchData(data))
context.setWindowWidth(width) -> dispatch(setWindowWidth(width))
context.setOpenFilter(value) -> dispatch(setOpenFilter(value))
context.setIsFilterBtnShow(value) -> dispatch(setIsFilterBtnShow(value))
context.setOpenSearchPanel(value) -> dispatch(setOpenSearchPanel(value))
```

### 4. Context Data to Redux State
```jsx
// Old -> New
context.userData -> userData
context.isLogin -> isLogin  
context.cartData -> cartData
context.myListData -> myListData
context.catData -> catData
context.windowWidth -> windowWidth
context.openCartPanel -> openCartPanel
context.openAddressPanel -> openAddressPanel
context.searchData -> searchData
```

### 5. useEffect Dependencies
```jsx
// Old
}, [context?.cartData, context?.userData]);

// New  
}, [cartData, userData]);
```

## Quick Steps for Each File:
1. Update imports (remove MyContext, add Redux hooks and actions)
2. Replace useContext with useSelector/useDispatch
3. Replace context methods with dispatch calls
4. Replace context data references with Redux state
5. Update useEffect dependencies
6. Test functionality

## Important Notes:
- The `alertBox` function is now imported from thunks, not utils
- All async actions (like getCartItems) need to be dispatched
- UI state actions take the value directly, not as object properties
- Some actions like `handleOpenProductDetailsModal` expect an object with status and item properties