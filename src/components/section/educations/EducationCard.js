import React from 'react';
import {
  Box,
  Grid2,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EducationCard = ({ education }) => {
  return (
  <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
    <Card style={{ marginBottom: '20px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={education.imageUrl || 'https://wallpapercave.com/wp/wp2708351.jpg'}
          alt="Education Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {education.name} ({education.year})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <ul>
                <li>{education.module}</li>
            </ul>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  </Grid2>
  );
};

export default EducationCard;
