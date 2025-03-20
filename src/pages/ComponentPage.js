import React, { useState } from 'react';
import { Box, Button, Chip, Divider, Grid2, Skeleton, Typography, TextField } from '@mui/material';
import { componentsData } from '../data/cardsData';
import ComponentItems from './../components/ComponentItems';
import { useWebSocket } from '../context/WebSocketContext'; // Import WebSocket context

const ComponentPage = () => {
	const categories = [...new Set(componentsData.map((card) => card.category))];
	const [loading, setLoading] = useState(false); // Loading state for fetching components

	// WebSocket interaction state
	const { message, sendMessage, progress } = useWebSocket(); // Use WebSocket hook

	// Filter completed categories
	const completedCategories = categories.filter(category =>
		componentsData.some(component => component.category === category && component.status === 'Completed')
	);

	// Simulate loading components
	const handleLoadMore = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false); // Simulate network delay
		}, 2000);
	};

	// Handle message input for WebSocket
	const [inputMessage, setInputMessage] = useState('');

	const handleSendMessage = () => {
		sendMessage(inputMessage); // Send message to WebSocket server
		setInputMessage(''); // Clear the input field after sending the message
	};

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			{/* Title Section */}
			<Typography variant="h3" gutterBottom align="center" color="primary">
				Component Collection
			</Typography>
			<Typography variant="body1" paragraph align="center" sx={{ maxWidth: '900px', margin: '0 auto' }}>
				Welcome to our Component Collection! This curated selection features a variety of components that are integral to our application, each with unique functionality and purpose.
			</Typography>

			{/* WebSocket Interaction Section */}
			<Box sx={{ marginTop: 4 }}>
				<Typography variant="h6" gutterBottom color="primary">
					WebSocket Test
				</Typography>

				{/* Message Input */}
				<TextField
					label="Message"
					variant="outlined"
					fullWidth
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					margin="normal"
				/>

				{/* Send Button */}
				<Button
					variant="contained"
					color="primary"
					onClick={handleSendMessage}
					disabled={!inputMessage} // Disable button if input is empty
					sx={{ marginBottom: 2 }}
				>
					Send Message
				</Button>

				{/* Display Message from WebSocket */}
				{message && (
					<Typography variant="body1" color="success.main">
						Message from WebSocket: {message}
					</Typography>
				)}

				{/* Display Progress */}
				{progress !== undefined && (
					<Typography variant="body1" color="secondary.main">
						Progress: {progress}%
					</Typography>
				)}
			</Box>

			{/* Categories with Chips */}
			<Box sx={{ marginTop: 2, marginBottom: 4 }}>
				<Typography variant="h6" gutterBottom color="textSecondary">
					Filter by Category:
				</Typography>
				<Grid2 container spacing={2}>
					{completedCategories.map((category, index) => (
						<Grid2 key={index}>
							<Chip
								label={category}
								color="primary"
								variant="filled"
								sx={{ cursor: 'pointer' }}
								onClick={() => console.log(`Filter by category: ${category}`)} // Placeholder filter action
							/>
						</Grid2>
					))}
				</Grid2>
			</Box>

			{/* Category List */}
			{completedCategories.map((category, index) => (
				<div key={index} style={{ marginBottom: '20px' }}>
					<Typography variant="h4" gutterBottom color="secondary">
						{category}
					</Typography>
					<Divider style={{ marginBottom: '10px' }} />

					{/* Display Skeleton Loader */}
					{loading ? (
						<Grid2 container spacing={2}>
							{[...Array(4)].map((_, idx) => (
								<Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
									<Skeleton variant="rectangular" height={200} />
								</Grid2>
							))}
						</Grid2>
					) : (
						<Grid2 container spacing={2}>
							{componentsData
								.filter((card) => card.category === category)
								.map((card, cardIndex) => (
									<ComponentItems key={cardIndex} {...card} />
								))}
						</Grid2>
					)}
				</div>
			))}

			{/* Load More Button */}
			<Box sx={{ textAlign: 'center', marginTop: 4 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleLoadMore}
					sx={{ padding: '10px 30px' }}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Load More Components'}
				</Button>
			</Box>
		</Box>
	);
};

export default ComponentPage;