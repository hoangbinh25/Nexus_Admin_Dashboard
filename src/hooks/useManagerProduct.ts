import { getAllProducts } from "@/services/productService";
import { IProduct } from "@/types/product"
import { useCallback, useEffect, useState } from "react"

export const useManagerProduct = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const fetchedProducts = await getAllProducts();
        console.log("Fetched Products:", fetchedProducts);
        setProducts(fetchedProducts);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, fetchProducts };
}