import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import React from "react";

const MessagesList = ({ messages }) => {
    if (!messages || messages.length === 0) {
        return <Typography>No messages available.</Typography>;
    }

    const formatDate = (dateString) => {
        const options = {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {messages.map((message) => (
                <div key={message.id}>
                    <ListItem
                        button
                        sx={{
                            backgroundColor: message.is_read ? 'transparent' : '#e8f0fe',
                            '&:hover': {
                                backgroundColor: message.is_read ? 'transparent' : '#c9daf8',
                            },
                            paddingLeft: 2,
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={message.from_email}
                                src={message.from_email}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message.subject}
                            secondary={
                                <>
                                    <Typography variant = "body2" color = "text.secondary" >
                                        From: {message.from_email || 'Unknown'}
                                    </Typography >
                                    <Typography variant = "body2" color = "text.secondary" >
                                        Sent: {formatDate(message.sent_at)}
                                    </Typography >
                                </>
                            }
                            sx={{
                                color: message.is_read ? 'text.primary' : 'text.secondary',
                                fontWeight: message.is_read ? 'normal' : 'bold'
                            }}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );
};

export default MessagesList;