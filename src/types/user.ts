export interface IUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
    avatarUrl: string;
    createdAt: string;
}

export interface ICreateUserRequest {
    fullName?: string;
    email?: string;
    password?: string;
    role?: string;
    status?: string;
}