import React from 'react';
import {Box, Typography,} from '@mui/material';

const ProfilePage = () => {
	const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }} >
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
        </Box>
    );
};

export default ProfilePage;
