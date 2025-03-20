
import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionCard from './../components/common/SectionCard';
import SectionPaper from './../components/common/SectionPaper';
import { sectionsData } from '../data/mosqueData';

const DietitianPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const sections = sectionsData(t, navigate);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Box
                sx={{
                    backgroundImage: `url(/management/mosque.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: { xs: 300, sm: 400, md: 500 }, // Responsive height
                    borderRadius: '8px',
                    marginBottom: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
                        borderRadius: '8px',
                    }}
                />
                <Typography variant="h3" fontWeight="bold" zIndex={1} sx={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)' }}>
                    {t('homepage.title')}
                </Typography>
                <Typography variant="h6" zIndex={1} sx={{ marginTop: 10, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)' }}>
                    {t('homepage.subtitle')}
                </Typography>
            </Box>
        </Box>
    );
};

export default DietitianPage;
