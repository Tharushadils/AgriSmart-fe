import api from "./api";
import type { IUserItem } from "../pages/User";

// Get all users from backend
export const getAllUsers = async (): Promise<IUserItem[]> => {
  const res = await api.get("/users"); // Backend  /api/users route 
  return res.data;
};

// Create or update user
export const saveUser = async (user: IUserItem) => {
  if (user._id && !user._id.startsWith("usr_")) {
    const res = await api.put(`/users/${user._id}`, user);
    return res.data;
  } else {
    const res = await api.post("/users", user);
    return res.data;
  }
};

// Delete user
export const deleteUserApi = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// Toggle Approve / Active status
export const updateUserStatus = async (id: string, updates: Partial<IUserItem>) => {
  const res = await api.patch(`/users/${id}/status`, updates);
  return res.data;
};