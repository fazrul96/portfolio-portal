import React from 'react';
import { Grid2 } from '@mui/material';
import CardItem from '../../../components/common/CardItem';

const SummaryList = ({ summaries }) => {
	return (
		<Grid2
		    container
		    spacing={2}
		    justifyContent="center" // Center items horizontally
		    alignItems="center" // Center items vertically if necessary
		>
	        {summaries.map((summary, index) => (
				<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
			        <CardItem label={summary.label} value={summary.value} />
			    </Grid2>
		    ))}
		</Grid2>
	);
};

export default SummaryList;