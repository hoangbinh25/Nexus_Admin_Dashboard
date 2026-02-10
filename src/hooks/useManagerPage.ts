import { getAllPage } from "@/services/pageService";
import { IPage } from "@/types/page"
import { useCallback, useEffect, useState } from "react"

export const useManagerPage = () => {
    const [pages, setPages] = useState<IPage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPages = useCallback(async () => {
        setLoading(true);
        const fetchedPages = await getAllPage();
        console.log("Fetched Pages:", fetchedPages);
        setPages(fetchedPages);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    return { pages, loading, error, fetchPages };
}