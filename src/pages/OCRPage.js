import React, {useMemo, useState} from 'react';
import {Card, CardContent, Grid2} from '@mui/material';

import OCRImageGallery from './../components/common/OCRImageGallery';
import OCRResultDisplay from './../components/common/OCRResultDisplay';
import {OCR_ERROR_MESSAGES, OCR_IMAGES} from '../constants/AppConstants';

import {API_BASE_URL, API_PUBLIC_URL, PROCESS_OCR} from '../constants/ApiConstants';
import ApiService from './../services/ApiService';
import {useAuth0} from '@auth0/auth0-react';

import {FilePond} from 'react-filepond';

const OCRPage = () => {
	const [ocrResult, setOcrResult] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

	const { getAccessTokenSilently } = useAuth0();

    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PUBLIC_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

	const handleFileUpload = async (file) => {
		if (!file) {
			setErrorMessage(OCR_ERROR_MESSAGES.NO_FILE);
			return;
		}

		try {
			const formData = new FormData();
			formData.append('file', file.file); // file.file to get the actual file object
			const response = await apiService.createResource(PROCESS_OCR, formData);
			setOcrResult(response);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage(OCR_ERROR_MESSAGES.PROCESS_FAILURE);
			console.error('OCR processing error:', error);
		}
	};

	return (
		<Grid2 container spacing={2}>
			<OCRImageGallery images={OCR_IMAGES} />

			<Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
				<Card>
					<CardContent>
						<FilePond onupdatefiles={(fileItems) => handleFileUpload(fileItems[0])} />
						{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
						<OCRResultDisplay result={ocrResult} />
					</CardContent>
				</Card>
			</Grid2>
		</Grid2>
	);
};

export default OCRPage;
