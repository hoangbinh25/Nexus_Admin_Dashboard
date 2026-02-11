import { EPage } from "@/enums/enums";
import {
    createUserService,
    getAllUsers,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "@/services/userService";
import { IUserRequest } from "@/types/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useManagerUsers = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState<number>(EPage.DEFAULT);
    const [limit, setLimit] = useState(EPage.LIMIT);
    const [sortBy, setSortBy] = useState(EPage.SORT_BY);
    const [sortOrder, setSortOrder] = useState(EPage.SORT_ORDER);

    const { data: users = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['users', page, limit, sortBy, sortOrder],
        queryFn: () => getAllUsers(page.toString(), limit.toString(), sortBy.toString(), sortOrder.toString()),
    });

    const createUserMutation = useMutation({
        mutationFn: ({ userData }: { userData: IUserRequest }) => createUserService(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: ({ userId, userData }: { userId: string, userData: IUserRequest }) =>
            updateUserService(userId, userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: deleteUserService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const getUserById = async (userId: string) => {
        try {
            return await getUserByIdService(userId);
        } catch (error) {
            console.error("Get user by ID error:", error);
            return null;
        }
    };

    return {
        users,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        fetchUsers: refetch,
        getUserById,
        createUser: createUserMutation.mutateAsync,
        updateUser: (userId: string, userData: IUserRequest) =>
            updateUserMutation.mutateAsync({ userId, userData }),
        deleteUser: deleteUserMutation.mutateAsync
    };
}
