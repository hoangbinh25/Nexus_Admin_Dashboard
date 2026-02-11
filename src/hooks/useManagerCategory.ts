import { EPage } from "@/enums/enums";
import { createCategoryService, getAllCategories } from "@/services/categoryService";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useManagerCategory = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(EPage.DEFAULT);
    const [limit, setLimit] = useState(EPage.LIMIT);
    const [sortBy, setSortBy] = useState(EPage.SORT_BY);
    const [sortOrder, setSortOrder] = useState(EPage.SORT_ORDER);

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories', page, limit, sortBy, sortOrder],
        queryFn: () => getAllCategories(page.toString(), limit.toString(), sortBy.toString(), sortOrder.toString()),
    });

    const createCategoryMutation = useMutation({
        mutationFn: createCategoryService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })

    return { categories, isLoading, createCategoryMutation };
}