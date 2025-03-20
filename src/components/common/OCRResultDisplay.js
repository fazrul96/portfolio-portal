import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

const OCRResultDisplay = ({ result }) => {
	const formattedResult = result ? result.replace(/\n/g, '<br />') : '';

	return result ? (
		<Typography variant="body1" component="div">
			<div dangerouslySetInnerHTML={{ __html: formattedResult }} />
		</Typography>
	) : null;
};

OCRResultDisplay.propTypes = {
	result: PropTypes.string,
};

export default OCRResultDisplay;