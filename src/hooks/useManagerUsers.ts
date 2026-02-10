import { createUser as createUserService, getAllUsers } from "@/services/userService";
import { ICreateUserRequest, IUser } from "@/types/user";
import { useCallback, useEffect, useState } from "react";

export const useManagerUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const fetchedUsers = await getAllUsers();
        // console.log("Hook fetched users:", fetchedUsers);
        setUsers(fetchedUsers);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const createUser = async (userData: ICreateUserRequest) => {
        setLoading(true);
        try {
            const result = await createUserService(userData);
            await fetchUsers();
            return result;
        } finally {
            setLoading(false);
        }
    }

    return { users, loading, fetchUsers, createUser };
}