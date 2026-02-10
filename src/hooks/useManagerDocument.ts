import { getAllDocuments } from "@/services/documentService";
import { IDocument } from "@/types/document";
import { useCallback, useEffect, useState } from "react";

export const useManagerDocument = () => {
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDocuments = useCallback(async () => {
        setLoading(true);
        const fetchedDocuments = await getAllDocuments();
        console.log("Fetched Documents:", fetchedDocuments);
        setDocuments(fetchedDocuments);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    return { documents, loading, error, fetchDocuments };
}