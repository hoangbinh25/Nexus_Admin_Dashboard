import { IUser } from "./user";

export interface IDocument {
    id: string;
    title: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileUrl: string;
    owner: IUser;
    createdAt: string;
    updatedAt: string;
}