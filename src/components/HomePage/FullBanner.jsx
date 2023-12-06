import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./FullBanner.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

const FullBanner = ({ slideImages }) => {
  return (
    <div className='full-banner-container'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={true}
        // scrollbar={{ draggable: true }}
      >
        {slideImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
          </SwiperSlide>
        ))}
      </Swiper>
       {/* Navigation arrows */}
       {/* <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div> */}
    </div>
  );
}

export default FullBanner;
