import axios from 'axios';
import {
    AUTH0_AUDIENCE,
    AUTH0_PROMPT,
    AUTH0_SCOPE_READ_ITEMS,
    CACHE_EXPIRATION_TIME,
    LOCAL_STORAGE_KEY
} from '../constants/ApiConstants';
import {DASH} from "../constants/AppConstants";

class ApiService {
    constructor(baseURL, getAccessTokenSilently) {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
            timeout: 1000000 // 1000 sec
        });
        this.getAccessTokenSilently = getAccessTokenSilently;
        this.token = null; // Cache for token
        this.tokenExpiry = null; // Cache for token expiration
    }

    // Check if the token has expired
    isTokenExpired() {
        return !this.token || Date.now() > this.tokenExpiry;
    }

    // Set headers for authorization and content type
	async setHeaders(isSecure = false) {
	    const headers = { 'Content-Type': 'application/json' };

	    if (isSecure) {
	        try {
	            if (this.isTokenExpired()) {
                    this.token = await this.getAccessTokenSilently({
                        audience: AUTH0_AUDIENCE,
                        scope: AUTH0_SCOPE_READ_ITEMS,
                        prompt: AUTH0_PROMPT,
                    });
	                this.tokenExpiry = Date.now() + 3600 * 1000; // Token expires in 1 hour
	            }

	            headers.Authorization = `Bearer ${this.token}`;
	        } catch (error) {
	            console.error('Error fetching token:', error);
	            throw error;
	        }
	    }

	    return headers;
	}

    // Fetch data from the API
    async fetchData(endpoint) {
        const headers = await this.setHeaders(true);
        try {
            const response = await this.api.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error.response || error.message);
            throw error;
        }
    }

    async fetchResource(resourceType) {
        return this.fetchData(`/${resourceType}`);
    }

	async fetchResourceWithParams(endpoint, params = {}, useCache = true) {
        // const cacheKey = `${LOCAL_STORAGE_KEY}${DASH}${JSON.stringify(params)}`;
        // const cachedData = this.getFromCache(cacheKey);

        // if (useCache && cachedData) {
        //     return cachedData;
        // }
	    const headers = await this.setHeaders(true);
	    try {
	        const response = await this.api.get(endpoint, {
	            headers,
	            params,
	        });
            // if (useCache) {
            //     this.saveToCache(cacheKey, response.data);
            // }
	        return response.data;
	    } catch (error) {
	        console.error(`Error fetching data from ${endpoint}:`, error.response || error.message);
	        throw error;
	    }
	}

	async fetchResourceWithFormData(endpoint, formData, useCache = true) {
        // const cacheKey = `${LOCAL_STORAGE_KEY}${DASH}${JSON.stringify(formData)}`;
        // const cachedData = this.getFromCache(cacheKey);

        // if (useCache && cachedData) {
        //     return cachedData;
        // }

        const headers = await this.setHeaders(true);
        delete headers['Content-Type'];

        try {
            const response = await this.api.post(endpoint, formData, { headers });

            // if (useCache) {
            //     this.saveToCache(cacheKey, response.data);
            // }
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint} with FormData:`, error.response || error.message);
            throw error;
        }
    }

    // Create a resource (e.g., POST /webtoons)
    async createResource(resourceType, data, isFormData = false, options = {}) {
        const headers = await this.setHeaders(true);

        let requestData;
        if (isFormData) {
            requestData = new FormData();
            for (const key in data) {
                requestData.append(key, data[key]);
            }
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            requestData = data;
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await this.api.post(`/${resourceType}`, requestData, {
                headers,
                ...options,
            });
            return response.data;
        } catch (error) {
            console.error(`Error creating resource at /${resourceType}:`, error.response || error.message);
            throw error;
        }
    }

    async patchResource(resourceType, data, isFormData = false, options = {}) {
        const headers = await this.setHeaders(true);

        let requestData;
        if (isFormData) {
            requestData = new FormData();
            for (const key in data) {
                requestData.append(key, data[key]);
            }
            delete headers['Content-Type'];
        } else {
            requestData = data;
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await this.api.patch(`/${resourceType}`, requestData, {
                headers,
                ...options,
                onDownloadProgress: options?.onDownloadProgress,
            });
            return response.data;
        } catch (error) {
            console.error(`Error patching resource at /${resourceType}:`, error.response || error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            throw error;
        }
    }

    // Update a resource (e.g., PUT /webtoons/:id)
    async updateResource(resourceType, id, data) {
        const headers = await this.setHeaders(true);
        try {
            const response = await this.api.put(`/${resourceType}/${id}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(`Error updating resource at /${resourceType}/${id}:`, error.response || error.message);
            throw error;
        }
    }

    // Delete a resource (e.g., DELETE /webtoons/:id)
    async deleteResource(resourceType, id) {
        const headers = await this.setHeaders(true);
        try {
            await this.api.delete(`/${resourceType}/${id}`, { headers });
        } catch (error) {
            console.error(`Error deleting resource at /${resourceType}/${id}:`, error.response || error.message);
            throw error;
        }
    }

    async deleteResourceMosque(resourceType) {
        const headers = await this.setHeaders(true);
        try {
            await this.api.delete(`/${resourceType}`, { headers });
        } catch (error) {
            console.error(`Error deleting resource at /${resourceType}:`, error.response || error.message);
            throw error;
        }
    }

	// Delete a resource file (e.g., DELETE /webtoons/:fileName)
    async deleteResourceFile(endpoint, params = {}) {
        const headers = await this.setHeaders(true);
        try {
        const response = await this.api.delete(endpoint, {
            headers,
            params,
        });

        } catch (error) {
			console.error(`Error deleting resource at ${endpoint}:`, error.response?.data || error.message);
            throw error;
        }
    }

    getFromCache(key) {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const parsed = JSON.parse(cached);
        // Check if cache is expired (e.g., 1 hour expiration)
        if (new Date().getTime() - parsed.timestamp > CACHE_EXPIRATION_TIME) {
            localStorage.removeItem(key); // Expired cache
            return null;
        }

        return parsed.data;
    }

    saveToCache(key, data) {
        const cacheData = {
            data,
            timestamp: new Date().getTime(),
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    }
}

export default ApiService;