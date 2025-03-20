import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearBuffer({ downloadProgress }) {
    const [progress, setProgress] = useState(downloadProgress);
    const [buffer, setBuffer] = useState(10);

    const progressRef = useRef(() => {});

    useEffect(() => {
        setProgress(downloadProgress);
    }, [downloadProgress]);

    useEffect(() => {
        progressRef.current = () => {
            if (progress < 100) {
                if (buffer < 100 && progress % 5 === 0) {
                    const newBuffer = buffer + Math.random() * 5 + 1;
                    setBuffer(newBuffer > 100 ? 100 : newBuffer);
                }
            }
        };
    }, [progress, buffer]);

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
        </Box>
    );
}
