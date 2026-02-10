import {
    createUserService,
    getAllUsers,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "@/services/userService";
import { ICreateUserRequest, IUser } from "@/types/user";
import { useCallback, useEffect, useState } from "react";

export const useManagerUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const fetchedUsers = await getAllUsers(page.toString(), limit.toString(), "createdAt", "DESC");
        // console.log("Hook fetched users:", fetchedUsers);
        setUsers(fetchedUsers);
        setLoading(false);
    }, [page, limit]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, page, limit]);

    const getUserById = useCallback(async (userId: string) => {
        setLoading(true);
        try {
            const result = await getUserByIdService(userId);
            return result;
        } catch (error) {
            console.error("Get user by ID error:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const createUser = useCallback(async (userData: ICreateUserRequest) => {
        setLoading(true);
        try {
            const result = await createUserService(userData);
            await fetchUsers();
            return result;
        } catch (error) {
            console.error("Create user error:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [fetchUsers]);

    const updateUser = useCallback(async (userId: string, userData: ICreateUserRequest) => {
        setLoading(true);
        try {
            const result = await updateUserService(userId, userData);
            await fetchUsers();
            return result;
        } finally {
            setLoading(false);
        }
    }, [fetchUsers]);

    const deleteUser = useCallback(async (userId: string) => {
        setLoading(true);
        try {
            const result = await deleteUserService(userId);
            await fetchUsers();
            return result;
        } finally {
            setLoading(false);
        }
    }, [fetchUsers]);

    return { users, loading, fetchUsers, getUserById, createUser, updateUser, deleteUser };
}