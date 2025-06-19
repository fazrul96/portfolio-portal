import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Breadcrumbs,
    CircularProgress,
    FormControl,
    Grid2,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import FileGrid from './FileGrid';
import FileList from './FileList';
import Filepond from './../filepond/Filepond';
import ApiService from './../../services/ApiService';
import { FILE_TYPE_FILTERS, SORT_OPTIONS, VIEW_TYPES } from '../../constants/AppConstants';
import { API_BASE_URL, API_PRIVATE_URL, MINIO, S3 } from '../../constants/ApiConstants';

const MinIo = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewType, setViewType] = useState(VIEW_TYPES.LIST);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME);
    const [fileTypeFilter, setFileTypeFilter] = useState(FILE_TYPE_FILTERS.ALL);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPath, setCurrentPath] = useState('webtoons-content/');
    const { getAccessTokenSilently } = useAuth0();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );

    const fetchFiles = useCallback(
        async (prefix = 'webtoons-content/') => {
            setIsLoading(true);
            try {
                const response = await apiService.fetchResourceWithParams(S3.LIST_FILES, { prefix });
                // Backend returns { folders: [], files: [] }
                setFolders(response.folders || []);
                setFiles(response.files || []);
                setCurrentPath(prefix);
            } catch (error) {
                console.error('Failed to fetch files:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch files',
                    severity: 'error',
                });
            } finally {
                setIsLoading(false);
            }
        },
        [apiService]
    );

    useEffect(() => {
        fetchFiles(currentPath);
    }, [fetchFiles, currentPath]);

    const handleDownload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('fileName', file.originalName);
            await apiService.fetchResourceWithFormData(MINIO.DOWNLOAD_FILE, formData);
            setSnackbar({ open: true, message: `${file.alias} downloaded successfully!`, severity: 'success' });
        } catch (error) {
            console.error('Failed to download file:', error);
            setSnackbar({ open: true, message: `Failed to download ${file.alias}`, severity: 'error' });
        }
    };

    const handleDelete = async (file) => {
        try {
            await apiService.deleteResourceFile(MINIO.DELETE_FILE, { fileName: file.originalName });
            setFiles(files.filter((item) => item.originalName !== file.originalName));
            setSnackbar({ open: true, message: `${file.alias} deleted successfully!`, severity: 'success' });
        } catch (error) {
            console.error('Failed to delete file:', error);
            setSnackbar({ open: true, message: `Failed to delete ${file.alias}`, severity: 'error' });
        }
    };

    const handleFileUpload = async (file) => {
        if (!file) {
            setSnackbar({ open: true, message: 'No file selected', severity: 'error' });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file.file);
            formData.append('path', currentPath);
            await apiService.createResource(MINIO.UPLOAD_FILES, formData);
            setSnackbar({ open: true, message: `Upload initiated for ${file.name}`, severity: 'info' });
            fetchFiles(currentPath); // Refresh the file list
        } catch (error) {
            console.error('Failed to upload file:', error);
            setSnackbar({ open: true, message: 'Upload failed', severity: 'error' });
        }
    };

    const handleFolderClick = (folder) => {
        setCurrentPath(folder); // folder contains full prefix with trailing slash
    };

    const handleBreadcrumbClick = (index) => {
        const pathParts = currentPath.split('/').filter(Boolean);
        const newPath = pathParts.slice(0, index + 1).join('/') + '/';
        setCurrentPath(newPath);
    };

    const filteredFiles = useMemo(() => {
        return files.filter((file) => {
            const matchesSearch = !searchTerm || file.alias.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType =
                fileTypeFilter === FILE_TYPE_FILTERS.ALL || (fileTypeFilter === FILE_TYPE_FILTERS.FILE && file.type === 'file');
            return matchesSearch && matchesType;
        });
    }, [files, searchTerm, fileTypeFilter]);

    const sortedFiles = useMemo(() => {
        const compareFn = (a, b) => {
            const extractNumber = (str) => {
                const match = str.match(/(\d+)/);
                return match ? parseInt(match[0], 10) : 0;
            };
            const textComparison = a.alias.localeCompare(b.alias, undefined, { numeric: true, sensitivity: 'base' });
            if (textComparison !== 0) return textComparison;
            const numA = extractNumber(a.alias);
            const numB = extractNumber(b.alias);
            return numA - numB;
        };
        return sortBy === SORT_OPTIONS.NAME ? [...filteredFiles].sort(compareFn) : filteredFiles;
    }, [filteredFiles, sortBy]);

    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    {currentPath
                        .split('/')
                        .filter(Boolean)
                        .map((folder, index) => (
                            <Link
                                key={index}
                                color="inherit"
                                onClick={() => handleBreadcrumbClick(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                {folder}
                            </Link>
                        ))}
                </Breadcrumbs>
            </Grid2>

            <Grid2 xs={12}>
                <TextField
                    label="Search Files"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '100%' }}
                    variant="outlined"
                />
            </Grid2>

            <Grid2 xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>View</InputLabel>
                    <Select value={viewType} onChange={(e) => setViewType(e.target.value)} label="View">
                        <MenuItem value={VIEW_TYPES.GRID}>Grid</MenuItem>
                        <MenuItem value={VIEW_TYPES.LIST}>List</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                        <MenuItem value={SORT_OPTIONS.NAME}>Name</MenuItem>
                    </Select>
                </FormControl>
            </Grid2>

            <Grid2 xs={12}>
                <Filepond onFileUpload={handleFileUpload} />
            </Grid2>

            <Grid2 xs={12}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {/* Folders */}
                        {folders.length > 0 && (
                            <Box mb={2}>
                                <Typography variant="h6">Folders</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {folders.map((folder) => {
                                        // Show folder name relative to current prefix
                                        const folderName = folder.replace(currentPath, '').replace(/\/$/, '');
                                        return (
                                            <Button
                                                key={folder}
                                                variant="outlined"
                                                onClick={() => handleFolderClick(folder)}
                                                sx={{ textTransform: 'none' }}
                                            >
                                                📁 {folderName}
                                            </Button>
                                        );
                                    })}
                                </Box>
                            </Box>
                        )}

                        {/* Files */}
                        {viewType === VIEW_TYPES.GRID ? (
                            <FileGrid files={sortedFiles} onDownload={handleDownload} onDelete={handleDelete} />
                        ) : (
                            <FileList files={sortedFiles} onDownload={handleDownload} onDelete={handleDelete} />
                        )}
                    </>
                )}
            </Grid2>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid2>
    );
};

export default MinIo;
