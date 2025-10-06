import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/free-mode';
import { useSelector } from "react-redux";

import { Navigation, FreeMode } from "swiper/modules";
import BannerBox from "../BannerBox";
import BannerBoxV2 from "../bannerBoxV2";

const AdsBannerSlider = (props) => {

  const { windowWidth } = useSelector((state) => state.ui);

  return (
    <div className="py-2 lg:py-5 w-full resBannersSlider">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={windowWidth < 992 ? false : true}
        modules={[Navigation, FreeMode]}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          750: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }}
        className="smlBtn"
      >

        {
          props?.data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerBoxV2 info={item?.alignInfo} item={item} image={item?.images[0]} link={"/"} />
              </SwiperSlide>
            )
          })

        }

      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
