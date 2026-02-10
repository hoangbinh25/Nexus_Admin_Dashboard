import { IProduct } from "@/types/product";
import api from "./api"

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const res = await api.get("/products");
        console.log("API Products Response:", res);

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
        console.error("Error fetching products:", error);
        return [];
    }
}