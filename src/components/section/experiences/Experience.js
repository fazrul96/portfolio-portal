import React from 'react';
import { Box, Grid2 } from '@mui/material';
import ExperienceCard from '../../../components/section/experiences/ExperienceCard';
import ExperienceCarousel from '../../../components/section/experiences/ExperienceCarousel';

const Experience = ({ experiencesWithItems }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <section id="experience">
        {/*
        <h1 className="text-justify" style={{ fontWeight: 'bold', fontSize: 100 }}>
          Experience
        </h1>
        <p className="portfolio-subheading">Here are my previous experiences</p> */}
        <Grid2 container spacing={2} justifyContent="center" alignItems="center">
          {experiencesWithItems.map((experiencesWithItem, index) => (
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }} key={index}>
              <ExperienceCard experiencesWithItem={experiencesWithItem} />
            </Grid2>
          ))}
        </Grid2>
      </section>
    </Box>
  );
};

const ExperienceCustomCarousel = ({ experiences }) => (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
        <section id="experience">
        <Grid2 container spacing={2} justifyContent="center" alignItems="center">
            <ExperienceCarousel experiences={experiences} />
        </Grid2>
        </section>
    </Box>
);

export default Experience;