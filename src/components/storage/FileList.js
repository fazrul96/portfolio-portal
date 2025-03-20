import React, { useState } from 'react';
import { Grid2, ListItem, ListItemText, ListItemIcon, Typography, Box, Pagination } from '@mui/material';
import FileActions from './FileActions';
import { getFileIcon, isFolder } from './utils';

const FileList = ({ files, onDownload, onDelete, onFolderClick }) => {
  const [page, setPage] = useState(1); // MUI Pagination starts at page 1
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1); // Reset to first page when rows per page change
  };

  const paginatedFiles = files.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <Grid2 container spacing={2}>
        {paginatedFiles.length ? (
          paginatedFiles.map((file, index) => (
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} key={index}>
              <ListItem
                button={isFolder(file)}
                onClick={() => isFolder(file) && onFolderClick(file)}
                secondaryAction={
                  !isFolder(file) && (
                    <FileActions
                      fileName={file.alias}
                      onDownload={() => onDownload(file)}
                      onDelete={() => onDelete(file)}
                    />
                  )
                }
              >
                <ListItemIcon>{getFileIcon(file)}</ListItemIcon>
                <ListItemText primary={file.alias} />
              </ListItem>
            </Grid2>
          ))
        ) : (
          <Typography>No files in the bucket.</Typography>
        )}
      </Grid2>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(files.length / rowsPerPage)} // Total pages
          page={page}
          onChange={handleChangePage}
          color="primary"
          siblingCount={1}
        />
      </Box>
    </>
  );
};

export default FileList;