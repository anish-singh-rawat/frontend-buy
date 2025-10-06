import React, { useState } from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from "react-redux";
import { setSearchData, setOpenSearchPanel } from "../../store/slices/uiSlice";

const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const history = useNavigate();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
  }


  const search = () => {

    setIsLoading(true)

    const obj = {
      page: 1,
      limit: 3,
      query: searchQuery
    }

    if (searchQuery !== "") {
      postData(`/api/product/search/get`, obj).then((res) => {
        dispatch(setSearchData(res));
        setTimeout(() => {
          setIsLoading(false);
          dispatch(setOpenSearchPanel(false))
          history("/search")
        }, 1000);
      })
    }

  }

  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
        value={searchQuery}
        onChange={onChangeInput}
      />
      <Button className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black" onClick={search}>
        {
          isLoading === true ? <CircularProgress /> : <IoSearch className="text-[#4e4e4e] text-[22px]" />
        }


      </Button>
    </div>
  );
};

export default Search;
