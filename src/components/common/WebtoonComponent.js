import React from 'react';
import {useWebSocket} from "../../context/WebSocketContext";
import LinearBuffer from "./progress/LinearBuffer";

// todo for testing purpose no need to commit
const WebtoonComponent = () => {
    // const { getAccessTokenSilently } = useAuth0();
    // const apiService = useMemo(() => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently), [getAccessTokenSilently]);

    const { connected, message, progress, sendMessage, filePath } = useWebSocket();

    return (
        <div >
            <h1 >{connected ? 'Connected to WebSocket' : 'Disconnected'}</h1 >
            <h1 >{progress}</h1 >
            <LinearBuffer downloadProgress = {progress} />
            <h1 >{filePath ? filePath : "Not ready"}</h1 >
            {/*<div >*/}
            {/*    {progress > 0 && <p >Progress: {progress}%</p >}*/}
            {/*    {message && <p >Message: {message}</p >}*/}
            {/*</div >*/}

            {/* Button to manually send a message */}
            {/*<button onClick = {() => sendMessage('Hello from React!')} >Send Message</button >*/}
            {/*{isLoading && <p >Uploading Webtoon...</p >}*/}
            {/*{error && <p >Error: {error}</p >}*/}
        </div >
    );
};

export default WebtoonComponent;
