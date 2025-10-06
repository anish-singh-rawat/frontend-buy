import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/free-mode';
import { useSelector } from "react-redux";

import { Navigation,FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = (props) => {

  const { windowWidth } = useSelector((state) => state.ui);

  return (
    <div className="homeCatSlider pt-0 lg:pt-4 py-4 lg:py-8">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={windowWidth < 992 ? false : true}
          modules={[Navigation, FreeMode]}
          freeMode={true}
          breakpoints={{
            300: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            550: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            900: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1100: {
              slidesPerView: 8,
              spaceBetween: 5,
            },
          }}
          className="mySwiper"
        >
          {
            props?.data?.map((cat, index) => {
              return (
                <SwiperSlide>
                  <Link to="/">
                    <div className="item py-4 lg:py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                      <img
                        src={`https://serviceapi.spicezgold.com/download/${cat?.images[0]}`}
                        className="w-[40px] lg:w-[60px] transition-all"
                      />
                      <h3 className="text-[12px] lg:text-[15px] font-[500] mt-3">{cat?.name}</h3>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })
          }


        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
