import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

api.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("accessToken");

        if(accessToken)
        {
            config.headers.Authorization = 
            `Bearer ${accessToken}`
        }

        return config;

    },
    (error) =>{
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {
                const response =
                    await api.post("/auth/refresh");

                const newAccessToken =
                    response.data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {

                localStorage.removeItem("accessToken");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
