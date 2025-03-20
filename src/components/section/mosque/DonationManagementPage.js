import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardHeader, Divider, Grid2, Typography,} from '@mui/material';
import {useAuth0} from '@auth0/auth0-react';
import {useTranslation} from 'react-i18next';

import SnackbarComponent from '../../../components/common/SnackbarComponent';
import useUserManagementApi from "../../../hooks/management/useUserManagementApi";
import useSnackbar from "../../../hooks/management/useSnackbar";
import GeneralModal from "./GeneralModal";
import GeneralTable from "./GeneralTable";
import DonationInsights from './analysis/DonationInsights';
import DonationTrendChart from './analysis/DonationTrendChart';
import {validateNric, validateNricPattern} from '@greda/common-utils/src/dataProcessingUtils';
import {sortData} from "@greda/common-utils/src/sortDataUtils";
import {generatePDF} from "@greda/common-utils/src/generatePDF";
import FloatingActionButton from "../../common/button/FloatingActionButton";
import EnhancedTable from "../../common/table/EnhancedTable";
import TabsComponent from "./TabsComponent";
import {DonationAnalysis, TopDonorsAnalysis} from "./analysis/BarChartAnalysis";
import BreadcrumbsNav from "../../common/BreadcrumbsNav";
import {ROUTE_MODULE, ROUTE_MOSQUE, ROUTE_SERIES, ROUTE_WEBTOON, ROUTE_WORKSPACE} from "../../../constants/AppRoutes";

const DonationAnalysisTab = (data) => {
    return (
        <div>
            <DonationAnalysis data={data} />
        </div>
    );
};

const DonationManagementPage = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const { usersData, fetchUsers, addUser, deleteUser, editUser } = useUserManagementApi(getAccessTokenSilently);
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, setSnackbarOpen } = useSnackbar();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [nricError, setNricError] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedTab, setSelectedTab] = useState('1');
    const [users, setUsers] = useState([]);
    const [mode, setMode] = useState('add');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [isLoading, setIsLoading] = useState(false);

    const moduleType = "donation";
    const createField = (name, type = "text", options = null, isRequired = true, inputProps = {}, isDate = false) => {
        const labelKey = name === "donation"
            ? `dialog.${moduleType}.form.donationAmount`
            : `dialog.${moduleType}.form.${name}`;
        return {
            name,
            type,
            label: t(labelKey),
            isRequired,
            inputProps,
            isDate,
            options,
        };
    };
    const fields = [
        createField("name"),
        createField("nric"),
        createField("donation", "number", null, true, { min: 0 }),
        createField("date", "date", null, true, {}, true),
        createField("address"),
    ];
    const optionalFields = [
        { name: "age", type: "text", label: t(`tableHeaders.${moduleType}.age`), isRequired: false },
    ];
    const [newUser, setNewUser] = useState({ name: '', nric: '', address: '', donation: 0, date: '' });

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
        }
    }, [usersData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nric') {
            if (!validateNric(value)) {
                setNricError(t('error.nricFormat'));
            } else {
                setNricError('');
            }
        }

        setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
        setSelectedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredUsers = sortData(
        users.filter(item =>
            (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.nric && item.nric.includes(searchQuery))
        ),
        sortConfig.key,
        sortConfig.direction
    );

    const handleSort = (column) => {
        setSortConfig(prev => ({
            key: column,
            direction: prev.key === column && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleGeneratePDF = (data) => {
        setIsLoading(true);
        const columns = ['Name', 'NRIC', 'Donation Amount (RM)', 'Date', 'Address'];
        const columnNames = ['name', 'nric', 'donation', 'date', 'address'];

        generatePDF({
            data: sortData(data, 'date', 'desc'),
            title: 'Donation Management Report',
            fileName: 'Donation_report.pdf',
            columns,
            columnNames
        })
        setIsLoading(false);
    };

    const clearForm = () => {
        setNewUser({
            name: "",
            nric: "",
            date: "",
            address: "",
            donation: ""
        });
        setNricError("");
    };

    const handleOpenModal = (user) => {
        if (!user) {
            setMode('add');
            setSelectedUser(null);
            setNewUser({
                name: '',
                nric: '',
                address: '',
                donation: 0,
                date: ''
            });
        } else {
            setMode('edit');
            setSelectedUser(user);
            setNewUser({
                name: user?.name || '',
                nric: user?.nric || '',
                address: user?.address || '',
                donation: user?.donation || 0,
                date: user?.date || ''
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
        clearForm();
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newUser.name.trim()) {
            errors.name = t('error.nameRequired');
            isValid = false;
        }

        if (!newUser.nric.trim() || !validateNricPattern(newUser.nric)) {
            errors.nric = t('error.nricFormat');
            isValid = false;
        }

        if (!newUser.donation || newUser.donation <= 0) {
            errors.donation = t('error.donationRequired');
            isValid = false;
        }

        if (!newUser.date.trim()) {
            errors.date = t('error.dateRequired');
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSaveUser = (id, updatedUser) => {
        if (!validateForm()) {
            return;
        }

        if (id) {
            editUser(id, updatedUser)
                .then(() => {
                    setUsers(users.map(user => user.id === id ? updatedUser : user));
                    showSnackbar('User updated successfully', 'success');
                    clearForm();
                    handleCloseModal();
                })
                .catch(() => showSnackbar('Error updating user', 'error'));
        } else {
            addUser(newUser)
                .then(() => {
                    setUsers(prev => [...prev, { ...newUser, donation: parseFloat(newUser.donation), date: newUser.date }]);
                    showSnackbar('User added successfully', 'success');
                    clearForm();
                    handleCloseModal();
                })
                .catch(() => showSnackbar('Error adding user', 'error'));
        }
    };

    const handleDeleteUser = (userId) => {
        deleteUser(userId)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
                showSnackbar('User deleted successfully', 'success');
                clearForm();
                handleCloseModal();
            })
            .catch(() => showSnackbar('Error deleting user', 'error'));
    };

    const breadcrumbs = [
        { label: t('breadcrumb.mosque'), color: 'inherit', to: ROUTE_MODULE + ROUTE_MOSQUE },
        { label: t('breadcrumb.donationManagement'), color: 'text.primary', to: t('breadcrumb.donationManagement') }
    ];

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <BreadcrumbsNav breadcrumbs={breadcrumbs} />

            <TabsComponent
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
                moduleType="donation"
                t={t}
            />

            {/*<EnhancedTable*/}
            {/*    data={filteredUsers} columns={fields}*/}
            {/*/>*/}

            {selectedTab === '1' && (
                <GeneralTable
                    data={filteredUsers}
                    columns={fields}
                    optionalColumns={optionalFields}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSort={handleSort}
                    onAction={handleDeleteUser}
                    onOpenModal={handleOpenModal}
                    t={t}
                    actionButtonText={t('buttons.delete')}
                    isLoading={isLoading}
                    handleGeneratePDF={handleGeneratePDF}
                    users={users}
                />
            )}

            {selectedTab === '2' && (
                <Grid2 container spacing={2} justifyContent="center">
                    {/*<Grid2 size={{ xs: 12, sm: 12, md: 12 }}>*/}
                    {/*    <Card>*/}
                    {/*        <CardHeader title="Donations Over Time" />*/}
                    {/*        <CardContent>*/}
                    {/*            <Typography variant="body1" paragraph>{t(`analysis.${moduleType}.description`)}</Typography>*/}
                    {/*            <Divider sx={{ marginBottom: 2 }} />*/}
                    {/*            <DonationTrendChart data={usersData} />*/}
                    {/*        </CardContent>*/}
                    {/*    </Card>*/}
                    {/*</Grid2>*/}
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title="Donation Insights" />
                            <CardContent>
                                <Typography variant="body1" paragraph>{t(`analysis.${moduleType}.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <DonationInsights data={usersData} />
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title={t(`analysis.${moduleType}.title`)} />
                            <CardContent>
                                <Typography variant="body1" paragraph>{t(`analysis.${moduleType}.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <DonationAnalysisTab data={usersData} />
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <Card>
                            <CardHeader title={t(`analysis.topDonors.title`)} />
                            <CardContent>
                                <Typography variant="body1" paragraph>{t(`analysis.topDonors.description`)}</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                <TopDonorsAnalysis data={users} />
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            )}

            <GeneralModal
                open={openModal}
                onClose={handleCloseModal}
                selectedItem={selectedUser}
                onInputChange={handleInputChange}
                onSave={handleSaveUser}
                fieldConfig={fields}
                errors={errors}
                t={t}
                module={moduleType}
                mode={mode}
            />

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

            <FloatingActionButton
                onClick={() => handleOpenModal(null)}
                label={t(`header.${moduleType}`)}
            />
        </Box>
    );
};

export default DonationManagementPage;