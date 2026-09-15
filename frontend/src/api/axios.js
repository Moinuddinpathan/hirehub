import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Only handle 401 errors
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {

            // NEVER try to refresh the refresh-token request itself
            if (originalRequest.url?.includes("/auth/refresh-token")) {
                console.log("Refresh token expired or invalid");

                localStorage.removeItem("token");
                window.location.href = "/login";

                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                console.log("Calling Refresh API...");

                const res = await api.post("/auth/refresh-token");

                console.log("Refresh Success");

                const newAccessToken = res.data.accessToken;

                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                console.log("Retrying Original Request");

                return api(originalRequest);

            } catch (err) {

                console.log("Refresh Failed", err);

                localStorage.removeItem("token");

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;