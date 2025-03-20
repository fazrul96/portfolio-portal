import React from 'react';
import {Box, Button, IconButton, TextField, Typography} from '@mui/material';
import {ArrowBack, ArrowForward} from '@mui/icons-material';

const ChapterControls = ({ currentChapterNumber, onPrevious, onNext, jumpChapter, setJumpChapter, onJump }) => (
    <>
        <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
            <IconButton onClick={onPrevious} disabled={currentChapterNumber <= 1}>
                <ArrowBack fontSize="large" />
            </IconButton>
            <Typography variant="h6">Chapter {currentChapterNumber}</Typography>
            <IconButton onClick={onNext}>
                <ArrowForward fontSize="large" />
            </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, marginBottom: 10 }}>
            <TextField
                label="Jump to Chapter"
                variant="outlined"
                size="small"
                value={jumpChapter}
                onChange={(e) => setJumpChapter(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={onJump}>
                Go
            </Button>
        </Box>
    </>
);

export default ChapterControls;
