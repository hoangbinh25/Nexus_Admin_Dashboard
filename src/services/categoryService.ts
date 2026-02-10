import { ICategory } from "@/types/category";
import api from "./api";

export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const res = await api.get("/categories")
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