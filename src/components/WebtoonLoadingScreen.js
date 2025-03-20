import React from 'react';
import {Box, CircularProgress, Grid2, LinearProgress, Typography} from '@mui/material';
import BreadcrumbsNav from "./common/BreadcrumbsNav";
import {ROUTE_WEBTOON, ROUTE_WORKSPACE} from "../constants/AppRoutes";

const WebtoonLoadingScreen = ({ webtoon, fetchProgress, isLoading }) => {
    const breadcrumbs = [
        { label: 'Series', color: 'inherit', to: ROUTE_WORKSPACE + ROUTE_WEBTOON },
        { label: webtoon?.alias, color: 'text.primary', to: webtoon?.alias }
    ];
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 4,
                height: '100vh',
                backgroundColor: '#f4f4f4',
                borderRadius: 2
            }}
        >
            {/* todo come back later*/}
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                    <BreadcrumbsNav breadcrumbs={breadcrumbs} />
                </Grid2>
            </Grid2>

            {/* Loading Indicator */}
            {isLoading && (
                <>
                    <CircularProgress
                        sx={{ marginBottom: 2 }}
                        size={60}
                        thickness={4}
                        color="primary"
                    />
                    <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
                        Loading Webtoon Chapters...
                    </Typography>
                </>
            )}

            {/* Progress Bar */}
            {!isLoading && (
                <>
                    <LinearProgress
                        variant="determinate"
                        value={fetchProgress}
                        sx={{ width: '100%', marginBottom: 3 }}
                    />
                    <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 1 }}>
                        Webtoon Chapters Loaded!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 600 }}>
                        You have successfully loaded the webtoon chapters. Now you can explore your content.
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default WebtoonLoadingScreen;
