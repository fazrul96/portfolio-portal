import React, {useMemo, useState} from "react";
import {
    Box,
    Card,
    CircularProgress,
    Grid2,
    Paper,
    Stack,
    Table,
    TableBody,
    TableContainer,
    Typography
} from "@mui/material";
import SearchBar from "../../common/SearchBar";
import TableHeader from "../../common/TableHeader";
import TableRowComponent from "../../common/TableRow";
import EnhancedPagination from "../../common/EnhancedPagination";
import DownloadPdfButton from "../../common/button/DownloadPdfButton";

const GeneralTable = ({
                          data,
                          columns,
                          optionalColumns = [],
                          searchQuery,
                          onSearchChange,
                          onSort,
                          onAction,
                          onOpenModal,
                          t,
                          actionButtonText,
                          loading = false,
                          isLoading={isLoading},
                          handleGeneratePDF={handleGeneratePDF},
                          users={users}
                      }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const paginatedData = useMemo(() => {
        return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [data, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const renderTableRows = () => {
        return paginatedData.map((item) => (
            <TableRowComponent
                key={item.id}
                item={item}
                columns={columns}
                optionalColumns={optionalColumns}
                onOpenModal={onOpenModal}
                onAction={onAction}
                actionButtonText={actionButtonText}
                showDeleteButton={true}
                t={t}
            />
        ));
    };

    const renderTableContent = () => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <CircularProgress />
                </Box>
            );
        }

        if (data.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <Typography variant="h6" color="textSecondary">
                        {t("table.noData")} {/* Add a localization key for no data */}
                    </Typography>
                </Box>
            );
        }

        return (
            <TableContainer>
                <Table>
                    <TableHeader
                        columns={columns}
                        optionalColumns={optionalColumns}
                        onSort={onSort}
                        showDeleteButton={true}
                        t={t}
                    />
                    <TableBody>
                        {renderTableRows()}
                    </TableBody>
                </Table>
                <Stack spacing={2} mt={2}>
                    <EnhancedPagination
                        data={data}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        t={t}
                    />
                </Stack>
            </TableContainer>
        );
    };

    return (
        <Grid2 container spacing={2} justifyContent="center">
            <Grid2 size={{ xs: 12, sm: 10, md: 10 }} >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} t={t} />
                </Box>
            </Grid2>
            <Grid2 size="grow" >
                <Box display="flex" justifyContent="right" alignItems="center">
                    <DownloadPdfButton
                        isLoading={isLoading}
                        handleGeneratePDF={handleGeneratePDF}
                        users={users}
                        t={t}
                    />
                </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                <Card>
                    <TableContainer component={Paper}>
                        {renderTableContent()}
                    </TableContainer>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default GeneralTable;
