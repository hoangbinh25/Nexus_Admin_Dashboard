import { ICategory } from "@/types/category";
import api from "./api";

export const getAllCategories = async (page: string, limit: string, sortBy: string, sortOrder: string): Promise<ICategory[]> => {
    try {
        const res = await api.get("/categories", {
            params: {
                page,
                limit,
                sortBy,
                sortOrder,
            },
        });
        console.log("API Categories Response:", res.data);

        if (Array.isArray(res.data)) {
            return res.data;
        }

        if (res?.data && Array.isArray(res.data)) {
            return res.data;
        }

        if (res?.data?.items && Array.isArray(res.data.items)) {
            return res.data.items;
        }
        return [];
    } catch (error) {
        console.error("Fetch categories error:", error);
        return [];
    }
}

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
    try {
        const res = await api.get(`/categories/${id}`);
        console.log("API Category Response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Fetch category error:", error);
        return null;
    }
}