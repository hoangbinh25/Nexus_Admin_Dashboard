import { getAllProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useManagerProduct = () => {
    const { data: products = [], isLoading: loading, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    return {
        products,
        loading,
        error: error ? error.message : null,
        fetchProducts: refetch
    };
}