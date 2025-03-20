import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Checkbox,
    FormControlLabel,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from '@mui/material';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import useTable from "../../../hooks/table/useTable";
import {camelToProperCase} from "@greda/common-utils/src/stringUtils";
import {formatDateA} from "@greda/common-utils/src/dateUtils";

const getColumnStyle = (columnId) => {
    // Apply ellipsis for 'description' column, and other columns based on your needs
    if (columnId === 'description') {
        return {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px', // You can adjust this as needed
        };
    }
    return {}; // No special style for other columns
};

const EnhancedTable = ({ columns, data, rowsPerPageOptions = [15, 25, 50, 100] }) => {
    const {
        order,
        orderBy,
        selected,
        page,
        dense,
        rowsPerPage,
        rows,
        emptyRows,
        visibleRows,
        handleRequestSort,
        handleSelectAllClick,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        handleChangeDense
    } = useTable(data, 'alias', 'asc', rowsPerPageOptions);

    // Handle delete logic
    const handleDelete = () => {
        console.log('Deleted selected items:', selected);
        // Filter out selected rows from the data
        const newRows = rows.filter((row) => !selected.includes(row.id));
        // Update the table data with the remaining rows
        // Here you may want to update the state or data source
        console.log('Updated rows:', newRows);
    };

    // Handle filter logic (e.g., only show "Active" status)
    const handleFilter = () => {
        const filteredRows = rows.filter((row) => row.status === 'Active');
        console.log('Filtered rows:', filteredRows);
        // Update the table data with the filtered rows (again, update the state or data source)
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {/* Enhanced Table Toolbar: handles actions like delete and filter */}
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDelete={handleDelete}   // Pass delete handler
                    onFilter={handleFilter}   // Pass filter handler
                    title="Webtoon List"
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                            columns={columns}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.numeric ? 'right' : 'left'}
                                                style={getColumnStyle(column.id)} // Apply custom style based on column id
                                            >
                                                {/* Apply proper case or date formatting based on the column */}
                                                {column.id === 'status' || column.id === 'source'
                                                    ? camelToProperCase(row[column.id])
                                                    : column.id === 'updatedAt'
                                                        ? formatDateA(row[column.id])
                                                        : row[column.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={columns.length + 1} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
};

EnhancedTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPageOptions: PropTypes.array
};

export default EnhancedTable;