import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { toggleCartPanel } from "../../store/slices/uiSlice";
import { alertBox } from "../../utils/alertBox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { fetchDataFromApi } from "../../utils/api";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const dispatch = useDispatch();
  const { isLogin, userData } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.cart);
  const { myListData } = useSelector((state) => state.wishlist);
  const { windowWidth, openSearchPanel } = useSelector((state) => state.ui);

  const history = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();

  useEffect(() => {

    fetchDataFromApi("/api/logo").then((res) => {
      localStorage.setItem('logo', res?.logo[0]?.logo)
    })

    setTimeout(() => {
      const token = localStorage.getItem('accessToken');

      if (token !== undefined && token !== null && token !== "") {
        const url = window.location.href
        history(location.pathname)
      } else {
        history("/login")
      }
    }, [1000])

  }, [isLogin]);

  const handleLogout = () => {
    setAnchorEl(null);

    fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`, { withCredentials: true }).then((res) => {
      if (res?.error === false) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history("/");
        alertBox("success", "Logged out successfully");
      }
    })
  }

  return (
    <>
      <header className="header bg-white">
        <div className="container">
          <div className="flex items-center justify-between py-3">
            <div className="col1 w-[40%] lg:w-[25%]">
              <Link to={"/"}>
                <img src={'./IndianBaazaar.png'} className="w-14" />
              </Link>
            </div>

            <div className={`col2 fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white z-50 ${windowWidth > 992 && '!block'} ${openSearchPanel === true ? 'block' : 'hidden'}`}>
              <Search />
            </div>

            <div className="col3 w-[10%] lg:w-[30%] flex items-center pl-7">
              <ul className="flex items-center justify-end gap-0 lg:gap-3 w-full">
                {isLogin === false && windowWidth > 992 ? (
                  <li className="list-none">
                    <Link
                      to="/login"
                      className="link transition text-[15px] font-[500]"
                    >
                      Login
                    </Link>{" "}
                    | &nbsp;
                    <Link
                      to="/register"
                      className="link  transition text-[15px]  font-[500]"
                    >
                      Register
                    </Link>
                  </li>
                ) : (
                  <>
                    {
                      windowWidth > 992 &&
                      <li>
                        <Button
                          className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                          onClick={handleClick}
                        >
                          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-200">
                            <FaRegUser className="text-[17px] text-[rgba(0,0,0,0.7)]" />
                          </Button>

                          {
                            windowWidth > 992 &&
                            <div className="info flex flex-col">
                              <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start">
                                {userData?.name}
                              </h4>
                              <span className="text-[13px] text-[rgba(0,0,0,0.6)]  font-[400] capitalize text-left justify-start">
                                {userData?.email}
                              </span>
                            </div>
                          }

                        </Button>

                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                              },
                            },
                          }}
                          transformOrigin={{ horizontal: "right", vertical: "top" }}
                          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link to="/my-account" className="flex items-center gap-2">
                              <IoBagCheckOutline className="text-[18px]" />
                              My Account
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/my-orders" className="flex items-center gap-2">
                              <IoBagCheckOutline className="text-[18px]" />
                              Orders
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/my-list" className="flex items-center gap-2">
                              <IoMdHeartEmpty className="text-[18px]" />
                              My List
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link to="/address" className="flex items-center gap-2">
                              <LuMapPin className="text-[18px]" />
                              Address
                            </Link>
                          </MenuItem>
                          <MenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                          >
                            <IoIosLogOut className="text-[18px]" />
                            Logout
                          </MenuItem>
                        </Menu>
                      </li>
                    }

                    <li className="relative">
                      <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-200">
                        <HiOutlineMenu
                          className="text-[17px] text-[rgba(0,0,0,0.7)] block lg:hidden"
                          onClick={() => setIsOpenCatPanel(true)}
                        />
                      </Button>
                    </li>
                  </>
                )}


                {
                  windowWidth > 992 &&
                  <li>
                    <Tooltip title="Wishlist">
                      <Link to="/my-list">
                        <IconButton aria-label="cart">
                          <StyledBadge badgeContent={myListData?.length !== 0 ? myListData?.length : 0} color="secondary">
                            <FaRegHeart />
                          </StyledBadge>
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </li>

                }


                <li>
                  <Tooltip title="Cart">
                    <IconButton
                      aria-label="cart"
                      onClick={() => dispatch(toggleCartPanel(true))}
                    >

                      <StyledBadge badgeContent={cartData?.length !== 0 ? cartData?.length : 0} color="secondary">
                        <MdOutlineShoppingCart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Navigation isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
      </header>
    </>
  );
};

export default Header;