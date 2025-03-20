import {useEffect, useMemo, useState} from "react";
import {
    API_BASE_URL,
    API_PRIVATE_URL,
    DOWNLOAD_WEBTOON,
    LATEST_CHAPTER_WEBTOON,
    UPLOAD_WEBTOON,
    WEBTOON_SYNC,
    WEBTOONS
} from "../constants/ApiConstants";
import ApiService from "../services/ApiService";
import useApiRequest from "./useApiRequest";
import {HTTP_METHODS} from "@greda/common-utils/src/apiUtils";
import {useWebSocket} from "../context/WebSocketContext";

const useWebtoonService = (getAccessTokenSilently, title) => {
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );
    const { progress, filePath } = useWebSocket();

    const webtoonUrl = `${WEBTOONS}/${title}`;
    const webtoonChaptersUrl = `${webtoonUrl}/chapters`;
    const webtoonNewChapterUrl = LATEST_CHAPTER_WEBTOON;
    const webtoonSyncChapterUrl = DOWNLOAD_WEBTOON;
    const webtoonSyncAllChaptersUrl = WEBTOON_SYNC;
    const webtoonUploadChapterUrl = UPLOAD_WEBTOON;

    // todo revisit if not sure remove
    const { request: fetchWebtoonData, data: webtoonData }
        = useApiRequest(apiService, HTTP_METHODS.GET, webtoonUrl);
    const { request: fetchWebtoonChaptersData, data: webtoonChaptersData }
        = useApiRequest(apiService, HTTP_METHODS.GET, webtoonChaptersUrl);
    const { request: fetchNewWebtoonChapterData, data: newWebtoonChapterData }
        = useApiRequest(apiService, HTTP_METHODS.PATCH, webtoonNewChapterUrl);
    const { request: syncWebtoonChapterData, data: syncChapterData }
        = useApiRequest(apiService, HTTP_METHODS.POST, webtoonSyncChapterUrl);
    const { request: syncWebtoonChaptersData, data: syncChaptersData }
        = useApiRequest(apiService, HTTP_METHODS.POST, webtoonSyncAllChaptersUrl);
    const { request: uploadWebtoonChapterData, data: uploadChapterData }
        = useApiRequest(apiService, HTTP_METHODS.POST, webtoonUploadChapterUrl);

    const [webtoon, setWebtoon] = useState(null);
    const [webtoonChapters, setWebtoonChapters] = useState(null);
    const [webtoonNewChapter, setWebtoonNewChapter] = useState(null);

    const [isLoadingWebtoon, setIsLoadingWebtoon] = useState(false);
    const [isLoadingChapters, setIsLoadingChapters] = useState(false);
    const [isLoadingNewChapter, setIsLoadingNewChapter] = useState(false);
    const [isLoadingSyncChapter, setIsLoadingSyncChapter] = useState(false);
    const [isLoadingSyncChapters, setIsLoadingSyncChapters] = useState(false);

    const [webtoonError, setWebtoonError] = useState(null);
    const [chaptersError, setChaptersError] = useState(null);
    const [newChapterError, setNewChapterError] = useState(null);
    const [syncChapterError, setSyncChapterError] = useState(null);
    const [syncChaptersError, setSyncChaptersError] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (title) {
            setIsLoadingWebtoon(true);
            setIsLoadingChapters(true);

            Promise.all([fetchWebtoonData(), fetchWebtoonChaptersData()])
                .then(([webtoonData, webtoonChaptersData]) => {
                    setWebtoon(webtoonData);
                    setWebtoonChapters(webtoonChaptersData);
                })
                .catch(error => {
                    setWebtoonError("Failed to load webtoon data");
                    setChaptersError("Failed to load chapters data");
                })
                .finally(() => {
                    setIsLoadingWebtoon(false);
                    setIsLoadingChapters(false);
                });
        }
    }, []);

    useEffect(() => {
        const uploadWebtoonChapter = async () => {
            if (progress === 100 && filePath) {
                const formattedFilePath = filePath.replace(/\\\\/g, '\\');
                setSnackbarMessage("Uploading Chapter... Please wait.");
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
                try {
                    await apiService.createResource(
                        UPLOAD_WEBTOON,
                        { title, filePath: formattedFilePath },
                        true
                    );
                    setSnackbarMessage("Chapter successfully uploaded!");
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                } catch (err) {
                    console.error("Error uploading chapter:", err.response?.data || err.message);
                    setSyncChapterError("Failed to upload the chapter.");
                    setSnackbarMessage("Failed to upload Chapter. Please try again later.");
                    setSnackbarSeverity('error');
                } finally {
                    setSnackbarOpen(true);
                }
            }
        };

        uploadWebtoonChapter();
    }, [progress, filePath]);

    const handleFetchNewChapter = async () => {
        setIsLoadingNewChapter(true);
        setNewChapterError(null);
        setSnackbarMessage('Fetching new chapter... Please wait.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
        try {
            const response = await apiService.patchResource(
                LATEST_CHAPTER_WEBTOON,
                { title },
                true
            );
            setWebtoonNewChapter(response);
            setSnackbarMessage('New chapter successfully fetched!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            // todo find a way to refresh latest chapter
            // setWebtoonChapters(prevChapters => [...prevChapters, response]);
            return true;
        } catch (err) {
            console.error("Error fetching new chapter:", err.response?.data || err.message);
            setNewChapterError("Failed to fetch the new chapter.");
            setSnackbarMessage('Failed to fetch new chapter. Please try again later.');
            setSnackbarSeverity('error');
            return false;
        } finally {
            setIsLoadingNewChapter(false);
            setSnackbarOpen(true);
        }
    };

    const handleSyncWebtoonChapter = async (title, chapter) => {
        setIsLoadingSyncChapter(true);
        setSnackbarMessage(`Syncing Chapter... Please wait.`);
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
        try {
            await apiService.createResource(
                webtoonSyncChapterUrl,
                { title, chapter },
                true
            );

            setSnackbarMessage('Syncing chapter in progress, please wait...');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return true;
        } catch (err) {
            console.error("Error syncing chapter:", err.response?.data || err.message);
            setSyncChapterError("Failed to sync the chapter.");
            setSnackbarMessage(`Failed to sync Chapter. Please try again later.`);
            setSnackbarSeverity('error');
            return false;
        } finally {
            setIsLoadingSyncChapter(false);
            setSnackbarOpen(true);
        }
    }

    const handleSyncWebtoonChapters = async () => {
        setIsLoadingSyncChapters(true);
        setSnackbarMessage(`Syncing all chapters... Please wait.`);
        setSnackbarSeverity('info');
        setSnackbarOpen(true);

        try {
            await apiService.createResource(
                webtoonSyncAllChaptersUrl,
                { title },
                true
            );

            setSnackbarMessage('Syncing all chapter in progress, please wait...');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return true;
        } catch (err) {
            console.error("Error syncing chapters:", err.response?.data || err.message);
            setSyncChaptersError("Failed to sync the chapters.");
            setSnackbarMessage('Failed to sync chapters. Please try again later.');
            setSnackbarSeverity('error');
            return false;
        } finally {
            setIsLoadingSyncChapters(false)
            setSnackbarOpen(true);
        }
    }

    return {
        webtoon,
        webtoonChapters,
        webtoonNewChapter,
        isLoadingWebtoon,
        isLoadingChapters,
        isLoadingNewChapter,
        isLoadingSyncChapter,
        isLoadingSyncChapters,
        webtoonError,
        chaptersError,
        newChapterError,
        syncChapterError,
        syncChaptersError,
        handleFetchNewChapter,
        handleSyncWebtoonChapter,
        handleSyncWebtoonChapters,
        setSnackbarOpen,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity
    };
};

export default useWebtoonService;