import axios, { AxiosError } from "axios";
import { refreshTokenCall } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://agri-smart-be.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints that do NOT need a token
const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"];

//  Runs before every API call goes out
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  // Check if the current URL is in the public endpoints list
  const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url));

  // If there's a token and it's not a public route, attach it
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  Runs when the backend sends a response back
api.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return it
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const isPublic = PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url));

    // If the backend returns 401 (Unauthorized) due to an expired token
    if (
      error.response?.status === 401 &&
      !originalRequest._isRefresh && 
      !isPublic
    ) {
      originalRequest._isRefresh = true; // Mark to prevent infinite loops

      try {
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Request a new access token
        const refreshResponse = await refreshTokenCall(refreshToken);
        const newAccessToken = refreshResponse.data.accessToken;

        // Save the new access token
        localStorage.setItem("ACCESS_TOKEN", newAccessToken);

        // Update the failed request's header with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request 
        return axios(originalRequest);
      } catch (err) {
        // If refreshing fails ( refresh token expired), log the user out
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        window.location.href = "/login";
        console.error("Session expired, please login again.", err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);



export default api;
