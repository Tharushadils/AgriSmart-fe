// src/service/auth.ts
import api from "./api";

// Function to call your backend and get a new access token
export const refreshTokenCall = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {
    refreshToken
  });
  return res.data;
};

// You can add your other auth calls here too
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  telephoneNumber: string,
  role: string
) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
    telephoneNumber,
    role,
  });
  return res.data;
};

// Add this to src/service/auth.ts
export const getMyDetails = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};