import {useCallback, useMemo, useState} from 'react';
import ApiService from './../../services/ApiService';
import {API_BASE_URL, API_PRIVATE_URL, MOSQUE_USERS} from '../../constants/ApiConstants';
import useApiRequest from "../useApiRequest";

/**
 * Custom hook to manage user data (fetch, add, edit, delete).
 *
 * @param {function} getAccessTokenSilently - Function to get the access token.
 *
 * @returns {Object} - The user data and functions for interacting with the API.
 */
const useUserManagementApi = (getAccessTokenSilently) => {
    const apiService = useMemo(
        () => new ApiService(API_BASE_URL + API_PRIVATE_URL, getAccessTokenSilently),
        [getAccessTokenSilently]
    );
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { request: fetchUsersData} =
        useApiRequest(apiService, 'GET', MOSQUE_USERS, {});

    const { request: deleteUserRequest } = useApiRequest(apiService, 'DELETE', MOSQUE_USERS);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchUsersData();
            setUsersData(response);
        } catch (error) {
            setError(error.message || 'Failed to load users data');
            console.error('Error fetching users data:', error);
        } finally {
            setLoading(false);
        }
    }, [apiService]);

    const addUser = async (newUser) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.createResource(MOSQUE_USERS, newUser);
            setUsersData((prevData) => [...prevData, newUser]);
        } catch (error) {
            setError(error.message || 'Error adding user');
            console.error('Error adding user:', error);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, newUser) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.patchResource(`${MOSQUE_USERS}/${id}`, newUser);
            setUsersData((prevData) =>
                prevData.map((user) => (user.id === id ? { ...user, ...newUser } : user))
            );
        } catch (error) {
            setError(error.message || 'Error editing user');
            console.error('Error editing user:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.deleteResourceMosque(`${MOSQUE_USERS}/${id}`);
            setUsersData((prevData) => prevData.filter((user) => user.id !== id));
        } catch (error) {
            setError(error.message || 'Error deleting user');
            console.error('Error deleting user:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        usersData,
        loading,
        error,
        fetchUsers,
        addUser,
        deleteUser,
        editUser
    };
};

export default useUserManagementApi;