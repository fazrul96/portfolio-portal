import React from 'react';
import { Grid2 } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperVertical = ({ projects, direction = 'vertical' }) => {
  return (
    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
      <Swiper
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
            <img
              src="https://wallpapercave.com/wp/wp2708351.jpg"
              alt="Swiper Slide 4"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
      </Swiper>
    </Grid2>
  );
};

export default SwiperVertical;
