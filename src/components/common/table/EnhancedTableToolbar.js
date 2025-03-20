import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {alpha} from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const EnhancedTableToolbar = ({ numSelected, onDelete, onFilter, title }) => (
    <Toolbar
        sx={[
            { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
            numSelected > 0 && {
                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            },
        ]}
    >
        {numSelected > 0 ? (
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                {numSelected} selected
            </Typography>
        ) : (
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                {title}
            </Typography>
        )}

        {/* Delete Button */}
        {numSelected > 0 ? (
            <Tooltip title="Delete">
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
                <IconButton onClick={onFilter}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default EnhancedTableToolbar;
