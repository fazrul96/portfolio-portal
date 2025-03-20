import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent, CircularProgress,
    Divider,
    Fab,
    Grid2,
    Paper,
    Rating,
    Snackbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import WebtoonHeader from "../components/section/webtoons/WebtoonHeader";
import WebtoonDetails from './../components/section/webtoons/WebtoonDetails';
import WebtoonChapterList from "../components/section/webtoons/WebtoonChapterList";
import SyncIcon from '@mui/icons-material/Sync';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ROUTE_WEBTOON, ROUTE_WORKSPACE} from "../constants/AppRoutes";
import BreadcrumbsNav from "../components/common/BreadcrumbsNav";
import {useWebSocket} from '../context/WebSocketContext';
import useWebtoonService from "../hooks/useWebtoonService";
import {AlertTitle} from "@mui/lab";
import {useTranslation} from "react-i18next";
import WebtoonLoadingScreen from "../components/WebtoonLoadingScreen";

const WebtoonChaptersPage = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { title } = useParams();
    const { progress } = useWebSocket();
    const {
        webtoon,
        webtoonChapters,
        webtoonNewChapter,
        isLoadingWebtoon,
        isLoadingChapters,
        isLoadingNewChapter,
        isLoadingSyncChapter,
        isLoadingSyncChapters,
        webtoonError,
        chaptersError,
        newChapterError,
        syncChapterError,
        syncChaptersError,
        handleFetchNewChapter,
        handleSyncWebtoonChapter,
        handleSyncWebtoonChapters,
        setSnackbarOpen,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity
    } = useWebtoonService(getAccessTokenSilently, title);

    const [isLoading, setIsLoading] = useState(true);
    const [fetchProgress, setFetchProgress] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isLoadingChapters) {
        return (
            <WebtoonLoadingScreen webtoon={webtoon} fetchProgress={fetchProgress} isLoading={isLoading}/>
        );
    }

    const handleSync = async (chapter) => {
        await handleSyncWebtoonChapter(webtoon.title, chapter, webtoon.source, webtoon.suffix);
    };

    const totalChapter = webtoon?.chapterCount || 0;
    const chapters = Array.from({ length: totalChapter }, (_, i) => totalChapter - i);
    const firstChapter = chapters[0];
    const latestChapter = chapters[chapters.length - 1];
    const breadcrumbs = [
        { label: 'Series', color: 'inherit', to: ROUTE_WORKSPACE + ROUTE_WEBTOON },
        { label: webtoon?.alias, color: 'text.primary', to: webtoon?.alias }
    ];

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                    <BreadcrumbsNav breadcrumbs={breadcrumbs} />
                </Grid2>
                {/*todo for testing purpose can remove once done*/}
                {/*<WebtoonComponent/>*/}

                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                    <Card>
                        <WebtoonHeader webtoon={webtoon} />
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                            <CardContent sx={{ flex: 1, p: 2 }}>
                                <Typography variant="h5" component="div">
                                    {webtoon?.alias || 'Webtoon Title'}
                                </Typography>
                                <Rating value={webtoon?.rating || 0} readOnly precision={0.5} sx={{ mb: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {webtoon?.description || 'Description of the webtoon will go here.'}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ flexGrow: 1, mb: 2 }}>
                                    <WebtoonDetails webtoon={webtoon} />
                                </Box>
                            </CardContent>
                        </Box>
                        <CardActions>
                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate(`/series/${title}/chapter-${latestChapter}`)}
                                    sx={{
                                        textTransform: 'none',
                                        bgcolor: 'success.main',
                                        '&:hover': { bgcolor: 'success.dark' },
                                        px: 3,
                                    }}
                                >
                                    First Chapter {latestChapter}
                                </Button>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={() => navigate(`/series/${title}/chapter-${firstChapter}`)}
                                    sx={{ textTransform: 'none', px: 3 }}
                                >
                                    Latest Chapter {firstChapter}
                                </Button>
                            </Grid2>
                        </CardActions>
                    </Card>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                    <Paper elevation={5} sx={{ padding: 2 }}>
                        {/*todo revisit for other scenario as well*/}
                        {syncChapterError &&
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {syncChapterError}
                            </Alert>
                        }

                        <WebtoonChapterList
                            chapters={chapters}
                            availableChapters={webtoonChapters}
                            handleSync={handleSync}
                            navigate={navigate}
                            title={title}
                            webtoon={webtoon}
                            progress={progress}
                        />
                    </Paper>
                </Grid2>
            </Grid2>

            {/* Floating Action Buttons */}
            {isMobile ? (
                <>
                    <Fab
                        color="secondary"
                        aria-label="sync-chapters"
                        onClick={handleSyncWebtoonChapters}
                        sx={{
                            position: 'fixed',
                            bottom: 90,
                            right: 16,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <Tooltip title="Sync All Chapters">
                            {isLoadingSyncChapters ? <CircularProgress size={24} color="inherit" /> : <SyncIcon />}
                        </Tooltip>
                    </Fab>

                    <Fab
                        color="primary"
                        aria-label="new-chapter"
                        onClick={handleFetchNewChapter}
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <Tooltip title="Get New Chapter">
                            {isLoadingNewChapter ? <CircularProgress size={24} color="inherit" /> : <AddCircleIcon />}
                        </Tooltip>
                    </Fab>
                </>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Fab
                        color="secondary"
                        aria-label="sync-chapters"
                        onClick={handleSyncWebtoonChapters}
                        sx={{
                            position: 'fixed',
                            bottom: 90,
                            right: 16,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <Tooltip title="Sync All Chapters">
                            {isLoadingSyncChapters ? <CircularProgress size={24} color="inherit" /> : <SyncIcon />}
                        </Tooltip>
                    </Fab>

                    <Fab
                        color="primary"
                        aria-label="new-chapter"
                        onClick={handleFetchNewChapter}
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <Tooltip title="Get New Chapter">
                            {isLoadingNewChapter ? <CircularProgress size={24} color="inherit" /> : <AddCircleIcon />}
                        </Tooltip>
                    </Fab>
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default WebtoonChaptersPage;