import React from 'react';
import {Box, useMediaQuery, useTheme} from '@mui/material';
import SwaggerUI from "swagger-ui-react";

const OpenApiPage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const baseUrl = process.env.REACT_APP_BASE_URL;
	// const specUrl = "http://localhost:8080/v3/api-docs";
	const specUrl = "http://localhost:8080/api-docs";
	const swaggerUiUrl = `https://petstore.swagger.io/?url=${encodeURIComponent(specUrl)}`;

	return (
		<Box
			sx={{
				width: isMobile ? '100vw' : '80vw',
				height: isMobile ? '80vh' : '90vh',
				margin: 'auto',
				mt: 4,
				borderRadius: 2,
				boxShadow: 3,
				overflow: 'auto',
			}}
		>
			<SwaggerUI url={swaggerUiUrl} />
		</Box>
	);
};

export default OpenApiPage;