import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Grid2, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import {ROUTE_SERIES, ROUTE_WEBTOON, ROUTE_WORKSPACE} from '../constants/AppRoutes';
import {PLACEHOLDER_CHAPTER, PLACEHOLDER_TITLE} from '../constants/ImageConstants';
import {API_BASE_URL, API_PRIVATE_URL} from '../constants/ApiConstants';

import {formatImages, toProperCase} from '@greda/common-utils/src/stringUtils';
import {useWebtoonImages} from '../hooks/useWebtoonImages';
import NavigationArrows from "../components/common/NavigationArrows";
import BreadcrumbsNav from "../components/common/BreadcrumbsNav";
import ImageGallery from "../components/common/ImageGallery";
import ChapterControls from "../components/common/ChapterControls";

const WebtoonReaderPage = () => {
    const { title, chapter } = useParams();
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    const [jumpChapter, setJumpChapter] = useState('');
    const currentChapterNumber = parseInt(chapter?.split('-')[1] || '1', 10);

    const { images, error, isLoading } = useWebtoonImages(
        `${API_BASE_URL}${API_PRIVATE_URL}`,
        title,
        chapter,
        getAccessTokenSilently
    );

    const formattedTitle = toProperCase(title || PLACEHOLDER_TITLE);
    const formattedChapter = toProperCase(chapter || PLACEHOLDER_CHAPTER);
    const formattedImages = formatImages(images);

    const generateChapterString = (chapterNumber) => `chapter-${chapterNumber}`;

    // Scroll to top when navigating chapters
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextChapter = () => {
        const nextChapter = generateChapterString(currentChapterNumber + 1);
        navigate(`${ROUTE_SERIES}/${title}/${nextChapter}`);
        scrollToTop();
    };

    const handlePreviousChapter = () => {
        const previousChapter = generateChapterString(currentChapterNumber - 1);
        navigate(`${ROUTE_SERIES}/${title}/${previousChapter}`);
        scrollToTop();
    };

    const handleJumpToChapter = () => {
        const targetChapterNumber = parseInt(jumpChapter, 10);
        if (!isNaN(targetChapterNumber) && targetChapterNumber > 0) {
            const targetChapter = generateChapterString(targetChapterNumber);
            navigate(`${ROUTE_SERIES}/${title}/${targetChapter}`);
            scrollToTop();
        } else {
            alert('Please enter a valid chapter number.');
        }
    };

    // Keyboard navigation for left and right arrows
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' && currentChapterNumber > 1) {
                handlePreviousChapter();
            }
            if (e.key === 'ArrowRight') {
                handleNextChapter();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentChapterNumber]);

    const breadcrumbs = [
        { label: 'Series', color: 'inherit', to: ROUTE_WORKSPACE + ROUTE_WEBTOON },
        { label: formattedTitle, color: 'inherit', to: `${ROUTE_SERIES}/${title}/chapters` },
        { label: formattedChapter, color: 'text.primary', to: {formattedChapter} }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, px: 2 }}>
            <Grid2 container direction="column" alignItems="center" justifyContent="center">
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '80vh',
                            width: '100%',
                        }}
                    >
                        <CircularProgress size={60} thickness={5} />
                    </Box>
                ) : error ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                        <Typography color="error">Error loading images. Please try again.</Typography>
                    </Box>
                ) : (
                    <>
                        <BreadcrumbsNav breadcrumbs={breadcrumbs} />
                        <NavigationArrows
                            currentChapterNumber={currentChapterNumber}
                            onPrevious={handlePreviousChapter}
                            onNext={handleNextChapter}
                        />
                        <ImageGallery images={formattedImages} />
                        <ChapterControls
                            currentChapterNumber={currentChapterNumber}
                            onPrevious={handlePreviousChapter}
                            onNext={handleNextChapter}
                            jumpChapter={jumpChapter}
                            setJumpChapter={setJumpChapter}
                            onJump={handleJumpToChapter}
                        />
                    </>
                )}
            </Grid2>
        </Box>
    );
};

export default WebtoonReaderPage;