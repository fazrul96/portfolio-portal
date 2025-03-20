import { useState } from 'react';
import makeApiRequest from "@greda/common-utils/src/apiUtils";

/**
 * Custom React hook to manage API requests with state management for loading, error, and response data.
 *
 * @param {Object} apiService - The API service instance to interact with the API.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} url - The API endpoint URL.
 * @param {Object} data - The request payload (only for POST/PUT).
 * @param {string|null} cacheKey - Optional cache key to store and reuse data.
 *
 * @returns {Object} - The request state, including loading, error, and response data.
 */
const useApiRequest = (apiService, method, url, data = {}, cacheKey = null) => {
    const [responseData, setResponseData] = useState(null);

    /**
     * Initiates the API request and updates state.
     */
    const request = async () => {

        try {
            const response = await makeApiRequest(apiService, method, url, data);
            setResponseData(response);
            return response;
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    return { request, data: responseData };
};

export default useApiRequest;