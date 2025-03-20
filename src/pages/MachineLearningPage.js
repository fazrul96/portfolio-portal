import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from "../components/common/ChatBox";
import InputContainer from "../components/common/InputContainer";
import SnackbarComponent from "../components/common/SnackbarComponent";

const MachineLearningPage = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleSubmit = async () => {
        if (!inputText.trim()) {
            showSnackbar('Please enter some text', 'error');
            return;
        }

        setLoading(true);
        addUserMessage(inputText);

        try {
            const result = await axios.post('http://localhost:5001/api/deepseek', { input_text: inputText });
            const cleanResponse = cleanResponseText(result.data.response);
            addAiMessage(cleanResponse);
        } catch (err) {
            showSnackbar('Error interacting with AI', 'error');
        } finally {
            setLoading(false);
            setInputText('');
        }
    };

    const cleanResponseText = (text) => {
        return text
            .replace(/<think>[\s\S]*?<\/think>/g, '')
            .replace(/\\u[\dA-Fa-f]{4}/g, (match) => String.fromCharCode(parseInt(match.replace('\\u', ''), 16)))
            .replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)))
            .replace(/[^\w\s.,!?']/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    };

    const addUserMessage = (text) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text },
        ]);
    };

    const addAiMessage = (text) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'ai', text: text || "Sorry, I couldn't process that." },
        ]);
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatContainer}>
                <ChatBox messages={messages} />
                <InputContainer inputText={inputText} setInputText={setInputText} handleSubmit={handleSubmit} loading={loading} />
            </div>

            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        fontFamily: "'Roboto', sans-serif",
    },
    chatContainer: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
    },
};

export default MachineLearningPage;
