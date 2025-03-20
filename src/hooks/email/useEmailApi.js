import {useCallback, useMemo, useState} from 'react';
import ApiService from './../../services/ApiService';
import {ACCOUNT_MESSAGES, API_BASE_URL, API_PRIVATE_URL} from '../../constants/ApiConstants';

const useEmailApi = (getAccessTokenSilently) => {
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );
    const [messagesData, setMessagesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.fetchResource(ACCOUNT_MESSAGES);
            setMessagesData(response);
        } catch (error) {
            setError('Failed to load users data');
            console.error('Error fetching users data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    return {
        messagesData,
        loading,
        error,
        fetchMessages
    };
};

export default useEmailApi;