export interface ICategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    productCount: number;
}

export interface ICreateCategoryRequest {
    name: string;
    description: string;
}