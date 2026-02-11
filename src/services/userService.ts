import { IUser, IUserRequest } from "@/types/user";
import api from "./api"

export const getAllUsers = async (page: string, limit: string, sortBy: string, sortOrder: string): Promise<IUser[]> => {
    try {
        const res = await api.get(`/users`, {
            params: {
                page,
                limit,
                sortBy,
                sortOrder,
            }
        });
        // console.log("API Users Response:", res.data);

        if (Array.isArray(res.data)) {
            return res.data;
        }

        if (res.data?.data && Array.isArray(res.data.data)) {
            return res.data.data;
        }
        if (res.data?.items && Array.isArray(res.data.items)) {
            return res.data.items;
        }
        return [];
    } catch (error) {
        console.error("Fetch users error:", error);
        return [];
    }
}

export const getUserByIdService = async (userId: string): Promise<IUser | null> => {
    try {
        const res = await api.get<IUser>(`/users/${userId}`);
        // console.log("User by ID: ", res.data)
        return res.data;
    } catch (error) {
        console.error("Fetch user by ID error:", error);
        return null;
    }
}

export const createUserService = async (userData: IUserRequest) => {
    try {
        const res = await api.post<IUserRequest>("/users", userData);
        return res.data;
    } catch (error) {
        console.error("Create user error:", error);
        return [];
    }
}

export const updateUserService = async (userId: string, userData: IUserRequest) => {
    try {
        const res = await api.put<IUserRequest>(`/users/${userId}`, userData);
        return res.data;
    } catch (error) {
        console.error("Update user error:", error);
        return [];
    }
}

export const deleteUserService = async (userId: string) => {
    try {
        const res = await api.delete<IUserRequest>(`/user/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Delete user error:", error);
        return [];
    }
}