export interface IAuthRequest {
    email: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
        id: string;
        fullName: string;
        email: string;
        role: string;
        avatar?: string;
    }
}