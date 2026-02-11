import { getAllDocuments } from "@/services/documentService";
import { useQuery } from "@tanstack/react-query";

export const useManagerDocument = () => {
    const { data: documents = [], isLoading: loading, error, refetch } = useQuery({
        queryKey: ['documents'],
        queryFn: getAllDocuments,
    });

    return {
        documents,
        loading,
        error: error ? error.message : null,
        fetchDocuments: refetch
    };
}