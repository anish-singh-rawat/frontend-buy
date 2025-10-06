import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";

const HomeSlider = (props) => {

  const { windowWidth } = useSelector((state) => state.ui);

  return (
    <div className="homeSlider pb-3 pt-3 lg:pb-5 lg:pt-5 relative z-[99]">
      <div className="container">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={windowWidth < 992 ? false : true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="sliderHome"
        >
          {
            props?.data?.length !== 0 && props?.data?.slice()?.reverse()?.map((item, index) => {
              {console.log("anish : ", item)}
              return (
                <SwiperSlide key={index}>
                  <div className="item rounded-[10px] overflow-hidden">
                    <img
                      src={`https://serviceapi.spicezgold.com/download/${item?.images[0]}`}
                      alt="Banner slide"
                      className="w-full"
                    />
                  </div>
                </SwiperSlide>
              )
            })
          }

        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
