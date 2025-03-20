import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AlertComponent = ({ severity, title, message }) => (
    <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
    </Alert>
);

export default AlertComponent;
