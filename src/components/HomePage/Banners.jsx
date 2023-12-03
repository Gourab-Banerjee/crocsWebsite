import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./Banner.css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

const Banners = ({ slideImages }) => {
  return (
    <div className='banner-container'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={true}
        scrollbar={{ draggable: true }}
      >
        {slideImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banners;
