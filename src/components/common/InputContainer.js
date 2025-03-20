import React from 'react';

const InputContainer = ({ inputText, setInputText, handleSubmit, loading }) => {
    return (
        <div style={styles.inputContainer}>
            <textarea
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows="3"
                style={styles.textarea}
            />
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={loading ? { ...styles.sendButton, ...styles.disabledButton } : styles.sendButton}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

const styles = {
    inputContainer: {
        display: 'flex',
        padding: '10px 20px',
        borderTop: '1px solid #ddd',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textarea: {
        width: '80%',
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        marginRight: '10px',
        resize: 'none',
        transition: 'border-color 0.3s',
    },
    sendButton: {
        padding: '10px 20px',
        backgroundColor: '#5c6bc0',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
};

export default InputContainer;
