import React, {useEffect, useState} from 'react';
import {Box, Grid2, Pagination, Paper, Stack, TextField} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useAuth0} from '@auth0/auth0-react';
import useEmailApi from '../hooks/email/useEmailApi';
import MessagesList from "../components/common/list/MessagesList";

const InboxPage = () => {
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();
    const { messagesData, fetchMessages } = useEmailApi(getAccessTokenSilently);

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 15;

    const getPaginatedMessages = () => {
        if (!messagesData) return [];

        const filteredMessages = messagesData.filter(
            (message) =>
                message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (message.from_email && message.from_email.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMessages.slice(startIndex, endIndex);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData);
        }
    }, [messagesData]);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                    <Paper sx={{ padding: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Search Messages"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            sx={{ marginBottom: 2 }}
                        />
                        <MessagesList messages={getPaginatedMessages()} />
                    </Paper>
                    <Stack spacing={2} sx={{ marginTop: 2 }} alignItems="center">
                        <Pagination
                            count={Math.ceil(messages.length / itemsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default InboxPage;