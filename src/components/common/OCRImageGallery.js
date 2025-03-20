import React from 'react';
import {Card, CardActionArea, CardMedia, Grid2} from '@mui/material';
import PropTypes from 'prop-types';

const OCRImageGallery = ({ images }) => (
	<Grid2 container spacing={2}>
		{images.map(({ id, image, title }) => (
			<Grid2 size={{ xs: 6, sm: 6, md: 6 }} key={id}>
				<Card>
					<CardActionArea>
						<CardMedia component="img" height="150" image={image} alt={title} />
					</CardActionArea>
				</Card>
			</Grid2>
		))}
	</Grid2>
);

OCRImageGallery.propTypes = {
	images: PropTypes.array.isRequired,
};

export default OCRImageGallery;