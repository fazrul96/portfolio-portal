import React from 'react';

const ChatBox = ({ messages }) => {
    return (
        <div style={styles.chatBox}>
            {messages.map((message, index) => (
                <div key={index} style={message.sender === 'user' ? styles.userMessage : styles.aiMessage}>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    chatBox: {
        padding: '20px',
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#5c6bc0',
        color: 'white',
        padding: '12px 18px',
        borderRadius: '18px',
        maxWidth: '80%',
        wordBreak: 'break-word',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e8f5e9',
        color: '#333',
        padding: '12px 18px',
        borderRadius: '18px',
        maxWidth: '80%',
        wordBreak: 'break-word',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
};

export default ChatBox;
