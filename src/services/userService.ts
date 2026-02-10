import { ICreateUserRequest, IUser } from "@/types/user";
import api from "./api"

export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const res = await api.get("/users");
        console.log("API Users Response:", res.data);

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

export const createUser = async (userData: ICreateUserRequest) => {
    try {
        const res = await api.post("/users", userData);
        return res.data;
    } catch (error) {
        console.error("Create user error:", error);
        return [];
    }
}