import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { CategoryCollapse } from "../../CategoryCollapse";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import { alertBox } from "../../../utils/alertBox";

const CategoryPanel = (props) => {

  const { catData } = useSelector((state) => state.category);
  const { isLogin } = useSelector((state) => state.auth);
  const { windowWidth } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const history = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen)
  };


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">

      <div className="p-3">
        <img src={"./IndianBaazaar.png"} className="w-20" />
      </div>

      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Shop By Categories{" "}
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[20px]"
        />
      </h3>

      {
        props?.data?.length !== 0 && <CategoryCollapse data={props?.data} />
      }

      {
        windowWidth < 992 && isLogin === false &&
        <Link to="/login" className="p-3 block" onClick={() => {
          props.setIsOpenCatPanel(false);
          props.propsSetIsOpenCatPanel(false)
        }}>
          <Button className="btn-org w-full">Login</Button>
        </Link>
      }


      {
        windowWidth < 992 && isLogin === true &&
        <div className="p-3 block" onClick={() => {
          props.setIsOpenCatPanel(false);
          props.propsSetIsOpenCatPanel(false)
          fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`, { withCredentials: true }).then((res) => {
            if (res?.error === false) {
              dispatch(logout());
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              history("/");
              alertBox("success", "Logged out successfully");
            }
          })
        }}>
          <Button className="btn-org w-full">Logout</Button>
        </div>
      }


    </Box>
  );

  return (
    <>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
