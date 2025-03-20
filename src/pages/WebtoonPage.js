import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Fab,
    Grid2,
    IconButton,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import {useTranslation} from "react-i18next";
import {TabContext} from "@mui/lab";
import WebtoonCard from '../components/section/webtoons/WebtoonCard';
import useWebtoonApi from './../hooks/useWebtoonApi';
import SnackbarComponent from './../components/common/SnackbarComponent';
import WebtoonForm from "../components/form/WebtoonForm";
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from "@mui/icons-material/Sync";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EnhancedTable from "../components/common/table/EnhancedTable";

const WebtoonPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { webtoonsData, loading, error, fetchWebtoons, addWebtoon, deleteWebtoon } = useWebtoonApi(getAccessTokenSilently);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('card');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [selectedTab, setSelectedTab] = useState('1');

    const columns = [
        { id: 'alias', numeric: false, disablePadding: true, label: 'Title' },
        { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
        { id: 'chapterCount', numeric: true, disablePadding: false, label: 'Chapters' },
        { id: 'source', numeric: false, disablePadding: false, label: 'Source' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated' }
    ];

    useEffect(() => {
        fetchWebtoons();
    }, [fetchWebtoons]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            setSearching(false);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCardClick = (webtoonTitle) => {
        navigate(`/series/${webtoonTitle}/chapters`);
    };

    const handleDeleteWebtoon = (webtoonTitle) => {
        deleteWebtoon(webtoonTitle);
        showSnackbar('Webtoon deleted successfully', 'error');
    };

    const handleAddWebtoon = (newWebtoon) => {
        addWebtoon(newWebtoon);
        showSnackbar('Webtoon added successfully', 'success');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const { showAddWebtoonForm } = WebtoonForm(handleAddWebtoon);

    // Debounced search handler
    const handleSearchChange = (query) => {
        setSearching(true);
        setSearchQuery(query);
    };

    const filteredWebtoons = useMemo(() => {
        return webtoonsData
            .filter((webtoon) => {
                return webtoon.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            })
            .sort((a, b) => {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            });
    }, [webtoonsData, debouncedSearchQuery]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderWebtoonList = () => {
        if (filteredWebtoons.length === 0) {
            return (
                <Box sx={{ textAlign: 'center', padding: 2 }}>
                    <Typography variant="h6">No Webtoons Found</Typography>
                    <Typography variant="body2">Try adjusting your search criteria.</Typography>
                </Box>
            );
        }

        return viewMode === 'card' ? (
            <Grid2 container spacing={2}>
                {filteredWebtoons.map((webtoon, index) => (
                    <Grid2 size={{ xs: 6, sm: 6, md: 4, lg: 2 }} key={index}>
                        <WebtoonCard
                            webtoon={webtoon}
                            onClick={() => handleCardClick(webtoon.title)}
                            onDelete={() => handleDeleteWebtoon(webtoon.title)}
                        />
                    </Grid2>
                ))}
            </Grid2>
        ) : (
            <Grid2 container spacing={2}>
                {filteredWebtoons.map((webtoon, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => handleCardClick(webtoon.title)}
                        // secondaryAction={
                        //     <Tooltip title="Delete">
                        //         <IconButton edge="end" color="error" onClick={() => handleDeleteWebtoon(webtoon.title)}>
                        //             <DeleteForeverOutlinedIcon />
                        //         </IconButton>
                        //     </Tooltip>
                        // }
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={webtoon.alias}
                                src={webtoon.coverImage}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={webtoon.alias}
                            secondary={
                                <>
                                    <span >Chapter {webtoon.chapterCount} | </span >
                                    <VisibilityIcon fontSize = "small"
                                                    sx = {{verticalAlign: 'middle', marginRight: 1}} />
                                    {/*<span>{webtoon.rating}</span>*/}
                                    <span >89.5M</span >
                                    <Typography variant = "body2" color = "text.secondary" >
                                        <Chip
                                            label = {webtoon?.status || 'N/A'}
                                            color = {
                                                webtoon?.status === 'Completed' ? 'success' :
                                                    webtoon?.status === 'Ongoing' ? 'warning' :
                                                        'error'
                                            }
                                            size = "small"
                                        />
                                    </Typography >
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </Grid2>
        );
    };

    const WebtoonContent = ({ loading, error, renderWebtoonList }) => {
        if (loading) {
            return (
                <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <CircularProgress />
                    <Typography variant="body2">Loading Webtoons...</Typography>
                    <Skeleton variant="rectangular" height={200} />
                </Box>
            );
        }

        if (error) {
            return (
                <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            );
        }

        return renderWebtoonList();
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <TabContext value={selectedTab}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs onChange={handleTabChange} aria-label="">
                            <Tab icon={<ViewListIcon />} label="Webtoons" value="1" />
                            <Tab icon={<SettingsIcon />} label="Manage Webtoons" value="2" />
                            <Tab icon={<InsertChartIcon />} label="Analytics" value="3" />
                        </Tabs>
                    </Box>
                </Box>
            </TabContext>

            {selectedTab === '1' &&
                <>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            label="Search Webtoons"
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {searchQuery && (
                                                <IconButton
                                                    onClick={() => setSearchQuery('')}
                                                    edge="end"
                                                >
                                                    <DeleteForeverOutlinedIcon />
                                                </IconButton>
                                            )}
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={(e, mode) => mode && setViewMode(mode)}
                            aria-label="view mode"
                        >
                            <ToggleButton value="card" aria-label="card view">
                                <ViewModuleIcon />
                            </ToggleButton>
                            <ToggleButton value="list" aria-label="list view">
                                <ViewListIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <WebtoonContent
                        loading={loading}
                        error={error}
                        renderWebtoonList={renderWebtoonList}
                    />
                </>
            }

            {selectedTab === '2' &&
                <>
                    <EnhancedTable
                        columns={columns} data={webtoonsData}
                    />
                </>
            }

            {selectedTab === '3' &&
                <>
                    <SettingsIcon />
                </>
            }

            <Fab
                color="secondary"
                aria-label="sync"
                onClick={() => fetchWebtoons()} // Example action: create a function to get latest chapter for all asura title
                sx={{
                    position: 'fixed',
                    bottom: 90, // This places the new FAB above the old one
                    right: 16,
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: 6,
                    },
                }}
            >
                <Tooltip title="Sync Webtoons">
                    <SyncIcon />
                </Tooltip>
            </Fab>

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => showAddWebtoonForm()}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: 6,
                    },
                }}
            >
                <Tooltip title="Add New Webtoon">
                    <AddIcon />
                </Tooltip>
            </Fab>
            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
            />
        </Box>
    );
};

export default WebtoonPage;
