import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumbs, Typography} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadcrumbsNav = ({ breadcrumbs = [] }) => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }} separator={<NavigateNextIcon fontSize="small" />}>
            {breadcrumbs.map((breadcrumb, index) => {
                if (index === breadcrumbs.length - 1) {
                    return (
                        <Typography key={index} color={breadcrumb.color}>
                            {breadcrumb.label}
                        </Typography>
                    );
                }

                return (
                    <Link key={index} color={breadcrumb.color} to={breadcrumb.to}>
                        {breadcrumb.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadcrumbsNav;