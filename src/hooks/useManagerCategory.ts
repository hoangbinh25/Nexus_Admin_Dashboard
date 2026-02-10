import { getAllCategories } from "@/services/categoryService";
import { ICategory } from "@/types/category";
import { useEffect, useState } from "react";

export const useManagerCategory = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                if (data) {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, [])

    return { categories, isLoading };
}