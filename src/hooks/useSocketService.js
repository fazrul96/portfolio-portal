import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const useSocketService = (socketUrl, events = [], handlers) => {
    const [connected, setConnected] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const socket = io(socketUrl);

        socket.on('connect', () => {
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        });

        socket.on('file_ready', (data) => {
            setFilePath(data.zip_path);
            console.log('file_ready:', data.zip_path)
        });

        socket.on('progress', (data) => {
            setProgress(data.progress);
            console.log('progress:', data.progress)
        });

        // Ensure `events` is an array and loop through the events and handlers, setting up listeners
        if (Array.isArray(events)) {
            events.forEach(event => {
                socket.on(event, (data) => {
                    if (handlers[event]) {
                        handlers[event](data); // Call corresponding handler
                    }
                });
            });
        } else {
            console.error('Expected "events" to be an array but got:', typeof events);
        }

        // Cleanup listeners when the component unmounts
        return () => {
            socket.off('connect');
            socket.off('disconnect')
            socket.off('file_ready');
            socket.off('progress');
            if (Array.isArray(events)) {
                events.forEach(event => socket.off(event));
            }
        };
    }, [socketUrl, events, handlers]);

    return { connected, filePath, progress  };
};

export default useSocketService;