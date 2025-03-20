import React, { useEffect } from 'react';
import { Grid2 } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import ProjectCard from '../../../components/section/projects/ProjectCard';

const loadSwiperModules = async ({ direction = 'cube' }) => {
  // Dynamically import the appropriate CSS file based on the direction
  if (direction === 'cube') {
    await import('./../../../assets/css/cube-swiper.css');
  }
};

const ProjectCarousel = ({ projects, direction = 'cube' }) => {
  const backgroundImage = '';//url(https://wallpapercave.com/wp/wp2708351.jpg)';

  return (
  <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={false}
      effect={'cube'}
      grabCursor={true}
      cubeEffect={{
        shadow: false,
        slideShadows: false,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectCube, Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index} style={{ backgroundImage: backgroundImage }}>
            <ProjectCard project={project} />
        </SwiperSlide>
      ))}
    </Swiper>
  </Grid2>
  );
};

export default ProjectCarousel;