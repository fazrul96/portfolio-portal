import React, {useState} from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Card,
	CardActionArea,
	CardContent,
	Grid2,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vs} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentLoader from './../components/ContentLoader';

const ComponentItems = ({ title, image, contentComponent, description, markdown }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

	return (
		<Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
		    <Card style={{ marginTop: '10px' }}>
			    <CardActionArea>
			        <CardContent>
			            <Typography gutterBottom variant="h5" component="div">
			            {title}
			            </Typography>
			            <ContentLoader componentName={contentComponent} />
			        </CardContent>
		        </CardActionArea>
		        <Accordion>
			        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
			            <Typography>More Information</Typography>
			        </AccordionSummary>
			        <AccordionDetails>
			            <Typography variant="body2" color="text.secondary">
			                {description}
			            </Typography>
			            <CopyToClipboard text={markdown} onCopy={handleCopy}>
			                <button style={{ padding: '8px 16px', fontSize: '14px' }}>
			                    {copied ? 'Copied!' : 'Copy'}
			                </button>
		                </CopyToClipboard>
			            <SyntaxHighlighter language="jsx" style={vs}>
			                {markdown}
			            </SyntaxHighlighter>
			        </AccordionDetails>
			    </Accordion>
		    </Card>
		</Grid2>
	);
};

export default ComponentItems;