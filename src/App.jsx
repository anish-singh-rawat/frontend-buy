import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import { ProductDetails } from "./Pages/ProductDetails";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CartPage from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";

import { Toaster } from 'react-hot-toast';
import Address from "./Pages/MyAccount/address";
import { OrderSuccess } from "./Pages/Orders/success";
import { OrderFailed } from "./Pages/Orders/failed";
import SearchPage from "./Pages/Search";
import PricesDrop from "./Pages/PricesDrop";
import NewProducts from "./Pages/NewProducts";
import BestSales from "./Pages/BestSales";
import Sitemap from "./Pages/Sitemap";
import Stores from "./Pages/Stores";
import Delivery from "./Pages/Delivery";
import LegalNotice from "./Pages/LegalNotice";
import Terms from "./Pages/Terms";
import AboutUs from "./Pages/AboutUs";
import SecurePayment from "./Pages/SecurePayment";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUserData } from "./store/slices/authSlice";
import { setWindowWidth } from "./store/slices/uiSlice";
import { getUserDetails, getCartItems, getMyListData, getCategoriesData } from "./store/thunks";

const AppContent = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    localStorage.removeItem("userEmail");
    const token = localStorage.getItem('accessToken');

    if (token !== undefined && token !== null && token !== "") {
      dispatch(setIsLogin(true));
      dispatch(getCartItems());
      dispatch(getMyListData());
      dispatch(getUserDetails());
    } else {
      dispatch(setIsLogin(false));
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    dispatch(getCategoriesData());

    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact={true} element={<Home />} />
          <Route path={"/products"} exact={true} element={<ProductListing />} />
          <Route path={"/product/:id"} exact={true} element={<ProductDetails />} />
          <Route path={"/login"} exact={true} element={<Login />} />
          <Route path={"/register"} exact={true} element={<Register />} />
          <Route path={"/cart"} exact={true} element={<CartPage />} />
          <Route path={"/verify-email"} exact={true} element={<Verify />} />
          <Route path={"/forgot-password"} exact={true} element={<ForgotPassword />} />
          <Route path={"/checkout"} exact={true} element={<Checkout />} />
          <Route path={"/my-account"} exact={true} element={<MyAccount />} />
          <Route path={"/my-list"} exact={true} element={<MyList />} />
          <Route path={"/my-orders"} exact={true} element={<Orders />} />
          <Route path={"/order/success"} exact={true} element={<OrderSuccess />} />
          <Route path={"/order/failed"} exact={true} element={<OrderFailed />} />
          <Route path={"/address"} exact={true} element={<Address />} />
          <Route path={"/search"} exact={true} element={<SearchPage />} />
          <Route path={"/prices-drop"} exact={true} element={<PricesDrop />} />
          <Route path={"/new-products"} exact={true} element={<NewProducts />} />
          <Route path={"/best-sales"} exact={true} element={<BestSales />} />
          <Route path={"/sitemap"} exact={true} element={<Sitemap />} />
          <Route path={"/stores"} exact={true} element={<Stores />} />
          <Route path={"/delivery"} exact={true} element={<Delivery />} />
          <Route path={"/legal-notice"} exact={true} element={<LegalNotice />} />
          <Route path={"/terms"} exact={true} element={<Terms />} />
          <Route path={"/about-us"} exact={true} element={<AboutUs />} />
          <Route path={"/secure-payment"} exact={true} element={<SecurePayment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
