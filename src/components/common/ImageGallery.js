import React from 'react';
import {Box, Typography} from '@mui/material';

const ImageGallery = ({ images }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {images.length > 0 ? (
            images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Chapter Image ${index + 1}`}
                    style={{ maxWidth: '100%', marginBottom: '16px', borderRadius: '8px' }}
                />
            ))
        ) : (
            <Typography color="text.secondary">No images available.</Typography>
        )}
    </Box>
);

export default ImageGallery;