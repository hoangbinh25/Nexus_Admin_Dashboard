import { getAllPage } from "@/services/pageService";
import { useQuery } from "@tanstack/react-query";

export const useManagerPage = () => {
    const { data: pages = [], isLoading: loading, error, refetch } = useQuery({
        queryKey: ['pages'],
        queryFn: getAllPage,
    });

    return {
        pages,
        loading,
        error: error ? error.message : null,
        fetchPages: refetch
    };
}