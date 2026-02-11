import { IPage } from "@/types/page";
import api from "./api";

export const getAllPage = async (page: string, limit: string, sortBy: string, sortOrder: string): Promise<IPage[]> => {
    try {
        const res = await api.get(`/pages`, {
            params: {
                page,
                limit,
                sortBy,
                sortOrder,
            }
        });
        console.log("Pages API Response:", res);

        if (Array.isArray(res)) {
            return res;
        }

        if (res?.data && Array.isArray(res.data)) {
            return res.data;
        }

        if (res?.data?.data && Array.isArray(res.data.data)) {
            return res.data.data;
        }

        if (res.data?.items && Array.isArray(res.data.items)) {
            return res.data.items;
        }

        return [];
    } catch (error) {
        console.error("Error fetching pages:", error);
        return [];
    }
}