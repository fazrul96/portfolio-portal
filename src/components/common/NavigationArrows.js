import React from 'react';
import {IconButton} from '@mui/material';
import {ArrowBack, ArrowForward, ArrowUpward} from '@mui/icons-material';

const NavigationArrows = ({ currentChapterNumber, onPrevious, onNext }) => {
    // todo revisit to fix scroll to top
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <IconButton
                onClick={onPrevious}
                disabled={currentChapterNumber <= 1}
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: {
                        xs: '16px',
                        sm: '70px',
                    },
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '50%',
                        outline: '2px solid rgba(255, 255, 255, 0.7)',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ArrowBack fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
                onClick={handleScrollToTop}
                sx={{
                    position: 'fixed',
                    top: '30%',
                    right: {
                        xs: '16px',
                        sm: '70px',
                    },
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '50%',
                        outline: '2px solid rgba(255, 255, 255, 0.7)',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ArrowUpward fontSize="small" color="secondary" />
            </IconButton>

            <IconButton
                onClick={onNext}
                sx={{
                    position: 'fixed',
                    top: '50%',
                    right: {
                        xs: '16px',
                        sm: '70px',
                    },
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '50%',
                        outline: '2px solid rgba(255, 255, 255, 0.7)',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ArrowForward fontSize="small" color="secondary" />
            </IconButton>
        </>
    );
};

export default NavigationArrows;
