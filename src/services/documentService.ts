import { IDocument } from "@/types/document";
import api from "./api";

export const getAllDocuments = async (): Promise<IDocument[]> => {
    try {
        const res = await api.get("/documents");
        console.log("Documents API Response:", res.data);

        if (Array.isArray(res.data)) {
            return res.data;
        }

        if (res?.data && Array.isArray(res.data)) {
            return res.data;
        }

        if (res?.data.items && Array.isArray(res.data.items)) {
            return res.data.items;
        }

        if (res?.data?.data && Array.isArray(res.data.data)) {
            return res.data.data;
        }

        return [];
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}