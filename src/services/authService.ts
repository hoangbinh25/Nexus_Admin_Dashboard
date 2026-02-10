import { IAuthRequest, IAuthResponse } from "@/types/auth";
import api from "./api";

export const loginAuth = async (data: IAuthRequest): Promise<IAuthResponse> => {
    const response = await api.post("auth/login", data);
    // console.log(response);
    return response.data;
}

export const logoutAuth = async () => {
    const response = await api.post("auth/logout");
    return response.data;
}