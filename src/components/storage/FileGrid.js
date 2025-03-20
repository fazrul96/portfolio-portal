import React from 'react';
import { Grid2, Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import FileActions from './FileActions';
import { getFileIcon, isFolder } from './utils';

const FileGrid = ({ files, onDownload, onDelete, onFolderClick }) => (
    <Grid2 container spacing={2}>
        {files.length ? (
            files.map((file, index) => (
                <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
                    <Card
                        sx={{
                            boxShadow: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box display="flex" justifyContent="center" p={1}>
                            <IconButton
                                onClick={() => isFolder(file) && onFolderClick(file)}
                                disabled={!isFolder(file)} // Disable if it's not a folder
                            >
                                {getFileIcon(file)}
                            </IconButton>
                        </Box>
                        <CardContent sx={{ textAlign: 'center', padding: 1 }}>
                            <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                                {file.alias} {/* Use `file.name` for display */}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 1,
                                }}
                            >
                                {!isFolder(file) && (
                                    <FileActions
                                        fileName={file.alias} // Pass the file name to actions
                                        onDownload={() => onDownload(file)} // Pass the entire file object
                                        onDelete={() => onDelete(file)} // Pass the entire file object
                                    />
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
            ))
        ) : (
            <Typography>No files in the bucket.</Typography>
        )}
    </Grid2>
);

export default FileGrid;
