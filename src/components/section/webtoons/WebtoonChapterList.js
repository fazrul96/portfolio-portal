import React, {useState} from "react";
import {
    Avatar,
    Badge,
    Button,
    Grid2,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";
import VerifiedIcon from '@mui/icons-material/Verified';
import {DEFAULT_IMAGE} from "../../../constants/AppConstants";
import LinearBuffer from "../../common/progress/LinearBuffer";

const WebtoonChapterList = ({
                        chapters,
                        availableChapters = [],
                        handleSync,
                        navigate,
                        title,
                        webtoon,
                        progress
                    }) => {
    const [showAll, setShowAll] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const isAvailable = (chapter) => {
        if (Array.isArray(availableChapters)) {
            const matchedChapter = availableChapters.find(
                (available) => available.chapter === chapter && (available.status === "COMPLETED" || available.status === "DEFAULT")
            );
            if (matchedChapter) {
                return {
                    isAvailable: true,
                    date: matchedChapter.updatedAt,
                };
            }
        }
        return {
            isAvailable: false,
            date: null,
        };
    };
    const visibleChapters = showAll ? chapters : chapters.slice(0, 12);
    return (
        <Grid2 container spacing={2}>
            {visibleChapters.map((chapter, index) => {
                const { isAvailable: isChapterAvailable, date } = isAvailable(chapter);
                const isSelected = selectedChapter === chapter;
                return (
                    <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 2 }} key={chapter}>
                        <ListItem
                            key={index}
                            button
                            onClick={() => setSelectedChapter(chapter)}
                            secondaryAction={
                                <>
                                    {/*{!isChapterAvailable && (*/}
                                        <IconButton edge="end">
                                            <Tooltip title="Syncing">
                                                <Badge
                                                    color="primary"
                                                    onClick={() => handleSync(chapter)}
                                                    disabled={isSelected && progress > 0 && progress < 100}
                                                    sx={{
                                                        borderColor: 'info.main',
                                                        color: isSelected && progress > 0 && progress < 100 ? 'orange' : 'info.main',
                                                    }}
                                                >
                                                    <SyncIcon
                                                        sx={{
                                                            animation:
                                                                isSelected && progress > 0 && progress < 100
                                                                    ? 'spin 1s linear infinite'
                                                                    : 'none',
                                                            '@keyframes spin': {
                                                                from: { transform: 'rotate(0deg)' },
                                                                to: { transform: 'rotate(360deg)' },
                                                            },
                                                        }}
                                                    />
                                                    {/*}*/}
                                                </Badge>
                                            </Tooltip>
                                        </IconButton>
                                    {/*)}*/}
                                </>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        border: `2px solid ${isChapterAvailable ? 'green' : 'gray'}`,
                                        backgroundColor: isChapterAvailable ? 'green' : 'gray',
                                    }}
                                    src={isChapterAvailable ? webtoon.coverImage : DEFAULT_IMAGE}
                                />
                            </ListItemAvatar>
                            <Tooltip title={isChapterAvailable ? 'Available' : 'Not Available'}>
                                <ListItemText
                                    primary={
                                        <>
                                            <Typography
                                                variant="body1"
                                                color={isChapterAvailable ? 'green' : 'text.secondary'}
                                                onClick={() => navigate(`/series/${title}/chapter-${chapter}`)}
                                                sx={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: 'bold',
                                                    transition: 'color 0.3s',
                                                    '&:hover': {
                                                        color: 'primary.main', // Slight color change on hover
                                                    },
                                                }}
                                            >
                                                Chapter {chapter}
                                                {/*todo add isVerified for webtoon dto*/}
                                                {isChapterAvailable && (
                                                    <Tooltip title="Verified">
                                                        <VerifiedIcon
                                                            sx={{ fontSize: 'medium', color: 'purple', ml: 1 }} />
                                                    </Tooltip>
                                                )}
                                            </Typography>
                                        </>
                                    }
                                    secondary={
                                        <>
                                            {isChapterAvailable && date && (
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem'}}>
                                                    {new Intl.DateTimeFormat('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }).format(new Date(date))}
                                                </Typography>
                                            )}
                                        </>
                                    }
                                />
                            </Tooltip>
                        </ListItem>
                        {isSelected && progress > 0 && progress < 100 && (
                            <LinearBuffer downloadProgress={progress} />
                        )}
                    </Grid2>
                );
            })}
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Show Less' : `Show All (${chapters.length - 10} more)`}
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default WebtoonChapterList