import React from 'react';
import {Box, Card, CardContent, CardMedia, Chip, Typography} from '@mui/material';
import {DEFAULT_IMAGE} from '../../../constants/AppConstants';

const WebtoonCard = ({ webtoon, onClick, onDelete, onEdit }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 4,
                },
            }}
        >
            <Box sx={{ position: 'relative', width: '100%' }}>
                <CardMedia
                    component="img"
                    image={webtoon?.coverImage || DEFAULT_IMAGE}
                    alt={webtoon?.title || 'Webtoon Cover'}
                    sx={{
                        width: '100%',
                        height: {
                            xs: '250px',
                            sm: '250px',
                            md: '350px',
                            lg: '450px',
                        },
                        objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        '&:hover': {
                            opacity: 1, // Show overlay on hover
                        },
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {webtoon?.alias || 'Untitled'}
                    </Typography>
                </Box>
            </Box>

            <CardContent
                sx={{ flexGrow: 1, cursor: 'pointer', padding: 2 }}
                onClick={onClick}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {webtoon?.alias || 'Untitled'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Chapter {webtoon?.chapterCount || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Chip
                        label={webtoon?.status || 'N/A'}
                        color={
                            webtoon?.status === 'Completed' ? 'success' :
                                webtoon?.status === 'Ongoing' ? 'warning' :
                                    'error'
                        }
                        size="small"
                    />
                </Typography>
                {/*<Typography variant="body2" color="text.secondary">*/}
                {/*    ★★★★★ {webtoon?.rating || 'N/A'}*/}
                {/*</Typography>*/}
            </CardContent>
            {/*<CardActions sx={{ justifyContent: 'space-between', padding: 1 }}>*/}
            {/*    <Tooltip title="Read">*/}
            {/*        <IconButton color="primary" onClick={onClick}>*/}
            {/*            <VisibilityOutlinedIcon />*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*    <Tooltip title="Edit">*/}
            {/*        <IconButton color="secondary" onClick={onEdit}>*/}
            {/*            <EditOutlinedIcon />*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*    <Tooltip title="Delete">*/}
            {/*        <IconButton color="error" onClick={onDelete}>*/}
            {/*            <DeleteForeverOutlinedIcon />*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*</CardActions>*/}
        </Card>
    );
};

export default WebtoonCard;