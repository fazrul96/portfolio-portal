import React, {createContext, useContext} from 'react';
import useSocketService from "../hooks/useSocketService";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    // Define events specific to Webtoon module
    const events = ['task_started', 'task_completed', 'task_failed', 'progress', 'file_ready', 'message'];

    // Define event handlers specific to Webtoon module
    const handlers = {
        task_started: (data) => { console.log('Task started:', data); },
        task_completed: (data) => { console.log('Task completed:', data); },
        task_failed: (data) => { console.log('Task failed:', data); },
        progress: (data) => { console.log('Progress:', data); },
        file_ready: (data) => { console.log('File ready:', data); },
        message: (data) => {
            // console.log('Received message:', data);
        },
    };

    const { connected, filePath, progress } = useSocketService('http://localhost:5001/sync', events, handlers);

    return (
        <WebSocketContext.Provider value={{ connected, filePath, progress }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
