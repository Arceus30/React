const axios = require("axios");

let accessToken = "expired-access-token";
const refreshToken = "valid-refresh-token";

// creates an instance of axios
const api = axios.create({
    // common configuration
    baseURL: process.env.API_BASE_URL,
    timeout: 5000,
    // instance headers
    headers: {
        "Content-Type": "application/json",
    },
});

// instance headers defined separately
api.defaults.headers.common.Authorization = `Bearer`;

// request interceptors
api.interceptors.request.use(
    (config) => {
        console.log("Request:", config.method.toUpperCase(), config.url);
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// response interceptors
api.interceptors.response.use(
    // The first function handles successful responses.
    (response) => {
        console.log("Response:", response.status, response.config.url);
        // It allows the original caller to utilize the response.
        return response;
    },
    // The second handles errors.
    async (error) => {
        console.log("Response error:", error.response?.status);

        // intercepting a response (server responded with expired access token error)
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            // to prevent infinite loop
            originalRequest._retry = true;

            // Exclusive axios request because apiClient has the interceptor that reacts to 401.
            // If the refresh request itself returns 401, you don't want the same refresh interceptor trying to refresh the refresh request.
            const response = await axios.post(
                `${process.env.API_BASE_URL}/api/refresh`,
                {
                    refreshToken,
                },
            );
            accessToken = response.data.accessToken;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        }

        // It allows the original caller to still handle the error.
        return Promise.reject(error);
    },
);

// saving the interceptor id
const interceptorId = apiClient.interceptors.request.use((config) => {
    console.log("Logging request");
    return config;
});

// You can later remove it:
// After eject(), that interceptor no longer runs.
// This is useful when an interceptor should exist only temporarily.
apiClient.interceptors.request.eject(interceptorId);

module.exports = api;
